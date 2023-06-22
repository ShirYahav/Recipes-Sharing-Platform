import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RatingModel } from '../models/rating.model';
import { RatingsAction, addRatingAction, getRatingsByRecipeAction, deleteRatingAction } from '../redux/ratings-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient) { }

  public async getRatingsByRecipe(recipeId: string): Promise<RatingModel[]> {
    let ratings = await firstValueFrom(this.http.get<RatingModel[]>(environment.ratingsUrl + recipeId));
    const action: RatingsAction = getRatingsByRecipeAction(ratings);
    store.dispatch(action);

    return ratings;
  } 

  public async addRating(rating: RatingModel, recipeId: string): Promise<RatingModel> {
    
    let token = store.getState().authState.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formData = new FormData();
    formData.append("rating", rating.rating.toString());
    formData.append("comment", rating.comment);
    formData.append("recipeId", rating.recipeId);
    formData.append("userId", rating.userId);

    const addedRating = await firstValueFrom(this.http.post<RatingModel>(environment.ratingsUrl + recipeId , formData, { headers }));

    store.dispatch(addRatingAction(addedRating));

    return addedRating;
  }

  public async deleteOneRating(_id: string): Promise<void> {

    let token = store.getState().authState.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    await firstValueFrom(this.http.delete<RatingModel[]>(environment.ratingsUrl + _id, { headers }));
    store.dispatch(deleteRatingAction(_id));
  }

  public async getAverageRating(recipeId: string): Promise<number> {
    let averageRating = await firstValueFrom(this.http.get<number>(environment.averageRatingUrl + recipeId));
    return averageRating;
  } 

}

