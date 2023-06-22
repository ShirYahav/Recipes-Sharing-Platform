import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from 'src/app/models/recipe.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { RatingsService } from 'src/app/services/ratings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit{

  public recipeImage = environment.recipeImageUrl;
  public token: string;
  public averageRating: number;
  public stars: number[];
  public hasHalfStar: boolean;

  @Input()
  public recipe: RecipeModel;

  constructor(
    private router: Router,
    private ratingsService: RatingsService,
    private notifyService: NotifyService,
  ) { }


  async ngOnInit() {
    this.averageRating =  await this.ratingsService.getAverageRating(this.recipe._id)
    this.stars = Array.from({ length: Math.floor(this.averageRating) });
    this.hasHalfStar = this.averageRating % 1 !== 0;

  }


  public async onClickRecipe() {
    this.token = store.getState().authState.token;

    if(this.token === null){
      this.notifyService.success("To see the full recipe login or register")
      this.router.navigateByUrl("/login");
    } 
     else {
      this.router.navigateByUrl(`/recipe/${this.recipe._id}`);
    }
    
  }

}
  
