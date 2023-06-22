import express, { NextFunction, Request, Response } from "express";
import cyber from "../01-utils/cyber";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import { RatingModel } from "../03-models/rating-model";
import logic from "../05-logic/ratings-logic";

const router = express.Router();

router.get("/ratings/:recipeId",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const recipeId = request.params.recipeId;
        const ratings = await logic.getRatingsByRecipe(recipeId);
        response.json(ratings);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/ratings/:recipeId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = cyber.getUserFromToken(request.header("authorization"))._id;
        const rating = new RatingModel(request.body);
        rating.userId = userId;
        rating.recipeId = request.params.recipeId;
        const addedRecipe = await logic.addRating(rating);
        response.status(201).json(addedRecipe);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/ratings/:_id", verifyLoggedIn,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteRating(_id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/average-rating/:recipeId",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const recipeId = request.params.recipeId;
        const averageRating = await logic.calculateAverageRating(recipeId);
        response.json(averageRating);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;