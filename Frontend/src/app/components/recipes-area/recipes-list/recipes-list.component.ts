import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeModel } from 'src/app/models/recipe.model';
import { NotifyService } from 'src/app/services/notify.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  public term: string = '';
  
  public recipes: RecipeModel[];

  constructor(
    private recipesService: RecipesService,
    private notifyService: NotifyService,
    ) { }

  async ngOnInit() {
    try {
      this.recipes = await this.recipesService.getAllRecipes();
    }
    catch(err: any) {
      this.notifyService.error(err);
    }
  }

}
