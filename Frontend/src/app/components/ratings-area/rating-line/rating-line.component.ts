import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RatingModel } from 'src/app/models/rating.model';
import store from 'src/app/redux/store';
import { RatingsService } from 'src/app/services/ratings.service';

@Component({
  selector: 'app-rating-line',
  templateUrl: './rating-line.component.html',
  styleUrls: ['./rating-line.component.css']
})
export class RatingLineComponent implements OnInit {

  public loggedInUserId: string;

  @Input()
  public rating: RatingModel;

  @Output()
  public deleteRating = new EventEmitter<string>();
  
  onDelete() {
    this.deleteRating.emit(this.rating._id);
    console.log('clicked')
  }

  constructor() { }

  ngOnInit(): void {
    this.loggedInUserId = store.getState().authState.user._id;
  }

  public getStarsArray(rating: number): number[] {
    return Array(rating).fill(0).map((_, index) => index + 1);
  }

}
