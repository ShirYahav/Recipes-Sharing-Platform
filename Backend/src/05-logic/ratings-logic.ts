//get rating by recipe
//add new rating 
// delete rating 

import path from "path";
import safeDelete from "../01-utils/safe-delete";
import ErrorModel from "../03-models/error-model";
import { IRatingModel, RatingModel } from "../03-models/rating-model";

async function getRatingsByRecipe(recipeId: string): Promise<IRatingModel[]> {
    return RatingModel.find( {recipeId} ).populate("user").exec();
}

async function addRating(rating: IRatingModel): Promise<IRatingModel> {
    const errors = rating.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    return rating.save();
}

async function getOneRating(_id: string): Promise<IRatingModel> {
    const rating = await RatingModel.findById(_id).exec();
    if (!rating) throw new ErrorModel(404, `_id ${_id} not found`);
    return rating;
}

async function deleteRating(_id: string): Promise<void> {
    const rating = await getOneRating(_id);
    rating.deleteOne();
    if (!rating) throw new ErrorModel(404, `_id ${_id} not found`);
}

async function calculateAverageRating(recipeId: string): Promise<number> {
    try {
        const ratings = await RatingModel.find( {recipeId} ).populate("user").exec();
        let ratingSum = 0;

        ratings.forEach((rating) => {
           ratingSum += rating.rating;
        })

        const totalRatings = ratings.length;
        const averageRating = totalRatings > 0 ? ratingSum / totalRatings : 0;
    
        return averageRating;
      } 
      catch (error) {
        console.log('Failed to calculate average rating');
      }
}

export default {
    addRating,
    getRatingsByRecipe,
    deleteRating,
    calculateAverageRating
};