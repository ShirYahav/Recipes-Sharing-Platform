import { RecipeModel } from "../models/recipe.model";

export class RecipesState {
    public recipes: RecipeModel[] = [];
}

export enum RecipesActionType {
    GetAllRecipes = "GetAllRecipes",
    AddRecipe = "AddRecipe",
    UpdateRecipe = "UpdateRecipe",
    DeleteRecipe = "DeleteRecipe"
}

export interface RecipesAction {
    type:RecipesActionType;
    payload:any;
}

export function getAllRecipesAction(recipes: RecipeModel[]): RecipesAction {
    return { type:RecipesActionType.GetAllRecipes, payload:recipes };
}

export function addRecipeAction(recipe: RecipeModel): RecipesAction {
    return { type: RecipesActionType.AddRecipe, payload: recipe };
}

export function updateRecipeAction(recipe: RecipeModel): RecipesAction {
    return { type: RecipesActionType.UpdateRecipe, payload: recipe };
}

export function deleteRecipeAction(_id: string): RecipesAction {
    return { type: RecipesActionType.DeleteRecipe, payload: _id };
}

export function recipesReducer(currentState: RecipesState = new RecipesState(), action: RecipesAction): RecipesState {
    const newState = {...currentState};

    switch(action.type) {

        case RecipesActionType.GetAllRecipes:
            newState.recipes = action.payload
            break;

        case RecipesActionType.AddRecipe:
            newState.recipes.push(action.payload);
            break;

        case RecipesActionType.UpdateRecipe:
            const indexToUpdate = newState.recipes.findIndex(r => r._id === action.payload._id);
            if(indexToUpdate >= 0) {
                newState.recipes[indexToUpdate] = action.payload;
            }
            break;
        
        case RecipesActionType.DeleteRecipe:
            const indexToDelete = newState.recipes.findIndex(r => r._id === action.payload);
            if(indexToDelete >=0) {
                newState.recipes.splice(indexToDelete, 1);
            }
            break;
            
        }

    return newState;
}