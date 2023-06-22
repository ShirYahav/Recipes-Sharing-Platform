import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeModel } from 'src/app/models/recipe.model';
import { RatingsService } from 'src/app/services/ratings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-recipe-card',
  templateUrl: './user-recipe-card.component.html',
  styleUrls: ['./user-recipe-card.component.css']
})
export class UserRecipeCardComponent implements OnInit {

  public recipeImage = environment.recipeImageUrl;

  public averageRating: number;
  public stars: number[];
  public hasHalfStar: boolean;

  @Input()
  public recipe: RecipeModel;

  @Output()
  public deleteRecipe = new EventEmitter<string>();
  
  onDelete() {
    this.deleteRecipe.emit(this.recipe._id);
  }
  constructor(private ratingsService: RatingsService,) { }

  async ngOnInit() {
    this.averageRating =  await this.ratingsService.getAverageRating(this.recipe._id)
    this.stars = Array.from({ length: Math.floor(this.averageRating) });
    this.hasHalfStar = this.averageRating % 1 !== 0;

  }

}
