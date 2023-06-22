import { Document, model, Schema } from "mongoose";
import { RecipeModel } from "./recipe-model";
import { UserModel } from "./user-model";

export interface IRatingModel extends Document {
    rating: number;
    comment: string;
    recipeId: string;
    userId: Schema.Types.ObjectId;
}

const RatingSchema = new Schema<IRatingModel>({
    rating: {
        type: Number,
        required: [true, "Missing Rating"],
        min: [1, "Rating between 1 to 5"],
        max: [5, "Rating between 1 to 5"],
    },
    comment: {
        type: String,
        required: [true, "Missing Comment"],
        minlength: [4, "Comment is too short"],
        maxlength: [70, "Comment is too short"],
        trim: true
    },
    recipeId: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false 
});

RatingSchema.virtual("user", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

export const RatingModel = model<IRatingModel>("RatingModel", RatingSchema, "ratings");
