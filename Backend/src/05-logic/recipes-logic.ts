import ErrorModel from "../03-models/error-model";
import { IRecipeModel, RecipeModel } from "../03-models/recipe-model";
import { v4 as uuid } from "uuid";
import path from "path";
import safeDelete from "../01-utils/safe-delete";

async function getAllRecipes(): Promise<IRecipeModel[]> {
    return RecipeModel.find().populate("user").exec();
}

async function getRecipesByUser(userId: string): Promise<IRecipeModel[]> {
    return RecipeModel.find({ userId }).populate("user").exec();
}

async function addRecipe(recipe: IRecipeModel): Promise<IRecipeModel> {
    const errors = recipe.validateSync();

    if (recipe.image) {
        const extension = recipe.image.name.substring(recipe.image.name.lastIndexOf("."));
        recipe.imageName = uuid() + extension;
        await recipe.image.mv(path.join(__dirname, ".." , "assets", "recipes-images", recipe.imageName));
        delete recipe.image;
    }
    
    if (errors) throw new ErrorModel(400, errors.message);
    return recipe.save();
}


async function updateRecipe(recipe: IRecipeModel): Promise<IRecipeModel> {
    const errors = recipe.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);

    if (recipe.image) {
        const extension = recipe.image.name.substring(recipe.image.name.lastIndexOf("."));
        recipe.imageName = uuid() + extension;
        await recipe.image.mv(path.join(__dirname, ".." , "assets", "recipes-images", recipe.imageName));
        delete recipe.image;
    }

    const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipe._id, recipe, { returnOriginal: false }).exec(); 
    if (!updateRecipe) throw new ErrorModel(404, `_id ${recipe._id} not found`);

    return updatedRecipe;
}

async function getOneRecipe(_id: string): Promise<IRecipeModel> {
    const recipe = await RecipeModel.findById(_id).exec();
    if (!recipe) throw new ErrorModel(404, `_id ${_id} not found`);
    return recipe;
}

async function deleteRecipe(_id: string): Promise<void> {
    const recipe = await getOneRecipe(_id);
    safeDelete(path.join(__dirname, ".." , "assets", "recipes-images", recipe.imageName));
    recipe.deleteOne();
    if (!recipe) throw new ErrorModel(404, `_id ${_id} not found`);
}

export default {
    getAllRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesByUser,
    getOneRecipe
};
