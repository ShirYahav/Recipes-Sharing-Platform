import dotenv from "dotenv";
dotenv.config(); 

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
//import expressRateLimit from "express-rate-limit";
import fileUpload from "express-fileupload";
import config from "./01-utils/config";
import errorsHandler from "./02-middleware/errors-handler";
import preventGarbage from "./02-middleware/prevent-garbage";
//import sanitize from "./02-middleware/sanitize";
import ErrorModel from "./03-models/error-model";
import dal from "./04-dal/dal";

dal.connect();

import authController from "./06-controllers/auth-controller";
import recipesController from "./06-controllers/recipes-controller";
import ratingsController from "./06-controllers/ratings-controller";

const server = express();

if (config.isDevelopment) server.use(cors());
server.use(express.json());
server.use(preventGarbage);
server.use(fileUpload());
//server.use(sanitize);

server.use("/api", authController);
server.use("/api", recipesController);
server.use("/api", ratingsController);


server.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler);

server.listen(process.env.PORT, () => console.log("Listening..."));
