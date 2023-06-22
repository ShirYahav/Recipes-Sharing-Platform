import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cyber from "../01-utils/cyber";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import { RecipeModel } from "../03-models/recipe-model";
import logic from "../05-logic/recipes-logic";

const router = express.Router();

router.get("/recipes",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const recipes = await logic.getAllRecipes();
        response.json(recipes);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/recipes-by-user/", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = cyber.getUserFromToken(request.header("authorization"))._id;
        const recipes = await logic.getRecipesByUser(userId);
        response.json(recipes);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/recipes/:_id", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const recipe = await logic.getOneRecipe(_id);
        response.json(recipe);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/recipes", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const userId = cyber.getUserFromToken(request.header("authorization"))._id;
        const recipe = new RecipeModel(request.body);
        recipe.userId = userId
        const addedRecipe = await logic.addRecipe(recipe);
        response.status(201).json(addedRecipe);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/recipes/:_id",verifyLoggedIn,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        request.body.image = request.files?.image;
        const recipe = new RecipeModel(request.body);
        const updatedRecipe = await logic.updateRecipe(recipe);
        response.json(updatedRecipe);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/recipes/:_id", verifyLoggedIn,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteRecipe(_id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/recipes/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "assets", "recipes-images", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;