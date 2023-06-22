import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from 'src/app/models/recipe.model';
import { NotifyService } from 'src/app/services/notify.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-full-recipe',
  templateUrl: './full-recipe.component.html',
  styleUrls: ['./full-recipe.component.css']
})
export class FullRecipeComponent implements OnInit {

  public _id: string;
  public recipe: RecipeModel;
  public recipeImage = environment.recipeImageUrl;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private notifyService: NotifyService,
    ) { }

  async ngOnInit() {
    try{
      this._id = this.route.snapshot.paramMap.get('_id');
      this.recipe = await this.recipesService.getOneRecipe(this._id);
    }
    catch(err:any){
      this.notifyService.error(err);
    }
  }

  addLineBreaks(text: string): string {
    if (text === null) {
      return '';
    }
    return text.replace(/\./g, '.<br>');
  }
}

