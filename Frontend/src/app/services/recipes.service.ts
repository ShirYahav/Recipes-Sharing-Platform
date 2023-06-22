import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipeModel } from '../models/recipe.model';
import { addRecipeAction, deleteRecipeAction, getAllRecipesAction, RecipesAction, updateRecipeAction } from '../redux/recipes-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  public async getAllRecipes(): Promise<RecipeModel[]> {
    let recipes = store.getState().recipesState.recipes;
    if (recipes.length === 0) {
      recipes = await firstValueFrom(this.http.get<RecipeModel[]>(environment.recipesUrl));
      const action: RecipesAction = getAllRecipesAction(recipes);
      store.dispatch(action);
    }
    return recipes;
  }

  public async getOneRecipe(_id: string): Promise<RecipeModel> {
    let recipes = await this.getAllRecipes();
    const recipe = recipes.find(i => i._id === _id);
    return recipe;
  }

  public async getRecipesByUserId(token : string): Promise<RecipeModel[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const recipes = await firstValueFrom(this.http.get<RecipeModel[]>(environment.recipesByUserUrl, {headers}));
    return recipes;
  }

  public async addRecipe(recipe: RecipeModel): Promise<RecipeModel> {
    
    let token = store.getState().authState.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("description", recipe.description);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    formData.append("totalTime", recipe.totalTime);
    formData.append("servings", recipe.servings.toString());
    formData.append("difficulty", recipe.difficulty);
    formData.append("image", recipe.image);
    formData.append("userId", recipe.userId);

    const addedRecipe = await firstValueFrom(this.http.post<RecipeModel>(environment.recipesUrl, formData, { headers }));

    store.dispatch(addRecipeAction(addedRecipe));

    return addedRecipe;
  }

  public async updateRecipe(recipe: RecipeModel): Promise<RecipeModel> {

    let token = store.getState().authState.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formData = new FormData();
    formData.append("_id", recipe._id.toString());
    formData.append("title", recipe.title);
    formData.append("description", recipe.description);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    formData.append("totalTime", recipe.totalTime);
    formData.append("servings", recipe.servings.toString());
    formData.append("difficulty", recipe.difficulty);
    formData.append("image", recipe.image);
    formData.append("userId", recipe.userId);

    const updatedRecipe = await firstValueFrom(this.http.put<RecipeModel>(environment.recipesUrl + recipe._id, formData, { headers }));

    store.dispatch(updateRecipeAction(updatedRecipe));

    return updatedRecipe;
  }

  public async deleteOneRecipe(_id: string): Promise<void> {

    let token = store.getState().authState.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    await firstValueFrom(this.http.delete<RecipeModel[]>(environment.recipesUrl + _id, { headers }));
    store.dispatch(deleteRecipeAction(_id));
  }

}
