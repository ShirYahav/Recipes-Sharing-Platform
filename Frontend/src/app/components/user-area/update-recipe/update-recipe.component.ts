import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from 'src/app/models/recipe.model';
import { NotifyService } from 'src/app/services/notify.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css']
})
export class UpdateRecipeComponent implements OnInit {

  public recipe: RecipeModel;
  public recipeForm: FormGroup;

  public titleInput: FormControl;
  public descriptionInput: FormControl;
  public ingredientsInput: FormControl;
  public instructionsInput: FormControl;
  public totalTimeInput: FormControl;
  public servingsInput: FormControl;
  public difficultyInput: FormControl;
  public imageInput: FormControl;

  @ViewChild("imageBox")
  public imageBoxRef: ElementRef<HTMLInputElement>;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private notifyService: NotifyService,

  ) { }

  async ngOnInit() {
    try {
      const _id = this.activatedRoute.snapshot.params["_id"];
      this.recipe = await this.recipesService.getOneRecipe(_id);

      this.titleInput = new FormControl(this.recipe.title, [Validators.required, Validators.minLength(3)]);
      this.descriptionInput = new FormControl(this.recipe.description, [Validators.required, Validators.minLength(8)]);
      this.ingredientsInput = new FormControl(this.recipe.ingredients, [Validators.required, Validators.minLength(8)]);
      this.instructionsInput = new FormControl(this.recipe.instructions, [Validators.required, Validators.minLength(8)]);
      this.totalTimeInput = new FormControl(this.recipe.totalTime, [Validators.required, Validators.minLength(3)]);
      this.servingsInput = new FormControl(this.recipe.servings, [Validators.required, Validators.min(1)]);
      this.difficultyInput = new FormControl(this.recipe.difficulty, [Validators.required, Validators.minLength(3)]);
      this.imageInput = new FormControl();

      this.recipeForm = new FormGroup({
        titleBox: this.titleInput,
        descriptionBox: this.descriptionInput,
        ingredientsBox: this.ingredientsInput,
        instructionsBox: this.instructionsInput,
        totalTimeBox: this.totalTimeInput,
        servingsBox: this.servingsInput,
        difficultyBox: this.difficultyInput,
        imageBox: this.imageInput
      });

    }
    catch(err) {
      this.notifyService.error(err);
    }
  }

  public async update() {
    try {
      this.recipe.title = this.titleInput.value;
      this.recipe.description = this.descriptionInput.value;
      this.recipe.ingredients = this.ingredientsInput.value;
      this.recipe.instructions = this.instructionsInput.value;
      this.recipe.totalTime = this.totalTimeInput.value;
      this.recipe.servings = this.servingsInput.value;
      this.recipe.difficulty = this.difficultyInput.value;
      this.recipe.image = this.imageBoxRef.nativeElement.files[0];

      await this.recipesService.updateRecipe(this.recipe);
      this.notifyService.success("Recipe has been updated");
      this.router.navigateByUrl("/user-page");

    }
    catch(err:any) {
      this.notifyService.error(err);
    }
  }

}
