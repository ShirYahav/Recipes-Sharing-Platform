import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from 'src/app/models/recipe.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  public token: string;
  public recipes: RecipeModel[];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private notifyService: NotifyService,
    ) { }

  async ngOnInit() {
    try {
      this.token = store.getState().authState.token;
      this.recipes = await this.recipesService.getRecipesByUserId(this.token);
    }
    catch(err: any) {
      this.notifyService.error(err);
    }
  }

  public async deleteRecipe(recipeId: string) {
    try {
      if (window.confirm('Are you sure you want to continue?')) {
        await this.recipesService.deleteOneRecipe(recipeId);
        this.notifyService.success("Recipe has been deleted");
        this.recipes = this.recipes.filter(recipe => recipe._id !== recipeId);
      } else {
        this.router.navigateByUrl("/user-page");
      }
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

}

