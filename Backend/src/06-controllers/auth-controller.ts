import express, { NextFunction, Request, Response } from "express";
import { CredentialsModel } from "../03-models/credentials-model";
import { UserModel } from "../03-models/user-model";
import logic from "../05-logic/auth-logic";

const router = express.Router();

router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await logic.register(user);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await logic.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/auth/is-taken", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const isEmail = await logic.isEmailTaken(user)
        if(isEmail){
            response.json(true);
        }
        response.json(false);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;