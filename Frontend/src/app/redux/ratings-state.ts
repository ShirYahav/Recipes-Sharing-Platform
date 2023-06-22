import { RatingModel } from "../models/rating.model";

export class RatingsState { 
    public ratings: RatingModel[] = [];
} 

export enum RatingsActionType {
    GetRatingsByRecipe = "GetRatingsByRecipe",
    AddRating = "AddRating",
    DeleteRating = "DeleteRating"
}

export interface RatingsAction {
    type:RatingsActionType;
    payload:any;
}

export function getRatingsByRecipeAction(ratings: RatingModel[]): RatingsAction {
    return { type:RatingsActionType.GetRatingsByRecipe, payload:ratings };
}

export function addRatingAction(rating: RatingModel): RatingsAction {
    return { type:RatingsActionType.AddRating, payload:rating };
}

export function deleteRatingAction(_id: string): RatingsAction {
    return { type:RatingsActionType.DeleteRating, payload:_id };
}

export function ratingsReducer(currentState: RatingsState = new RatingsState(), action: RatingsAction): RatingsState {
    const newState = {...currentState};

    switch(action.type) {

        case RatingsActionType.GetRatingsByRecipe:
            newState.ratings = action.payload
            break;

        case RatingsActionType.AddRating:
            newState.ratings.push(action.payload);
            break;
        
        case RatingsActionType.DeleteRating:
            const indexToDelete = newState.ratings.findIndex(r => r._id === action.payload);
            if(indexToDelete >=0) {
                newState.ratings.splice(indexToDelete, 1);
            }
            break; 
        }

    return newState;
}