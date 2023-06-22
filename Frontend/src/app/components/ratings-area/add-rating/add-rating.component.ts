import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingModel } from 'src/app/models/rating.model';
import { NotifyService } from 'src/app/services/notify.service';
import { RatingsService } from 'src/app/services/ratings.service';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit {

  public rating = new RatingModel();
  public recipeId:string;

  public selectedValue: number;
  public selectedStar: number;
  public stars: { value: number, filled: boolean }[] = [
    { value: 1, filled: false },
    { value: 2, filled: false },
    { value: 3, filled: false },
    { value: 4, filled: false },
    { value: 5, filled: false }
  ];

  constructor(
    private ratingsService: RatingsService,
    private router: Router,
    private route: ActivatedRoute,
    private notifyService: NotifyService,

  ) { }

  ngOnInit() :void {
    this.recipeId = this.route.snapshot.paramMap.get('recipeId');
  }

  public rateStar(selectedValue: number) {
    this.selectedStar = selectedValue;
      this.stars.forEach(star => {
      star.filled = star.value <= selectedValue;
    });
  
    this.selectedValue = selectedValue;
  }

  async add(addRatingForm: NgForm) {
    try {
      this.rating.rating = this.selectedValue;

      if ([1, 2, 3, 4, 5].includes(this.rating.rating)) {
        await this.ratingsService.addRating(this.rating, this.recipeId);
        this.notifyService.success("Your Review has been successfully added");
        addRatingForm.reset();
        this.router.navigateByUrl('/recipe/' + this.recipeId);
      }
      else {
        this.notifyService.error("Rating is missing");
      }

    }
    catch(err:any) {
      this.notifyService.error(err);
    }
  }

}
