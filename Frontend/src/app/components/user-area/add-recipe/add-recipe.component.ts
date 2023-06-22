import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeModel } from 'src/app/models/recipe.model';
import { NotifyService } from 'src/app/services/notify.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  public recipe = new RecipeModel();

  @ViewChild("imageBox")
  public imageBoxRef: ElementRef<HTMLInputElement>;
  
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private notifyService: NotifyService,
    ) { }

  ngOnInit(): void {
  }

  async add(addRecipeForm: NgForm) {
    try {
      this.recipe.image = this.imageBoxRef.nativeElement.files[0];
      await this.recipesService.addRecipe(this.recipe);
      this.notifyService.success("Recipe has been successfully added");
      addRecipeForm.reset();
      this.router.navigateByUrl("/user-page");

    }
    catch(err:any) {
      this.notifyService.error(err);
    }
  }

}
