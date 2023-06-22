import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RatingModel } from 'src/app/models/rating.model';
import { NotifyService } from 'src/app/services/notify.service';
import { RatingsService } from 'src/app/services/ratings.service';

@Component({
  selector: 'app-ratings-list',
  templateUrl: './ratings-list.component.html',
  styleUrls: ['./ratings-list.component.css']
})
export class RatingsListComponent implements OnInit {


  public ratings: RatingModel[];

  @Input()
  public recipeId: string;
  
  constructor(
    private ratingsService: RatingsService,
    private router: Router,
    private notifyService: NotifyService,
    ) { }

  async ngOnInit() {
    try {
      this.ratings = await this.ratingsService.getRatingsByRecipe(this.recipeId)
    }
    catch(err:any) {

    }
  }

  public async deleteRating(ratingId: string) {
    try {
      if (window.confirm('Are you sure you want to continue?')) {
        await this.ratingsService.deleteOneRating(ratingId);
        this.notifyService.success("Your Review has been deleted");
        this.ratings = this.ratings.filter(rating => rating._id !== ratingId);
      } else {
        this.router.navigateByUrl('/recipe/' + this.recipeId);

      }
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

}
