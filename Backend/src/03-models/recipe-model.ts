import { Document, model, Schema } from "mongoose";
import { UploadedFile } from 'express-fileupload';
import { UserModel } from "./user-model";

export interface IRecipeModel extends Document {
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    totalTime: string;
    servings: number;
    difficulty: string;
    image: UploadedFile;
    imageName: string;
    userId: Schema.Types.ObjectId;
}

const RecipeSchema = new Schema <IRecipeModel> ({
    title: {
        type: String,
        required: [true, "Missing Title"],
        minlength: [3, "Title is too short"],
        maxlength: [30, "Title is too long"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Missing Description"],
        minlength: [8, "Description is too short"],
        maxlength: [1500, "Description is too long"],
        trim: true
    },
    ingredients: {
        type: String,
        required: [true, "Missing Ingredients"],
        minlength: [3, "Ingredients list is too short"],
        maxlength: [2000, "Ingredients list is too long"],
        trim: true
    },
    instructions: {
        type: String,
        required: [true, "Missing Instructions"],
        minlength: [8, "Instructions are too short"],
        maxlength: [1500, "Instructions are too long"],
        trim: true
    },
    totalTime: {
        type: String,
        required: [true, "Missing Total Time"],
        minlength: [3, "Total Time is too short"],
        maxlength: [20, "Title is too long"],
        trim: true
    },
    servings: {
        type: Number,
        required: [true, "Missing Servings"],
        min: [0, "Servings number can't be negative"],
        max: [1000, "Servings can't exceed 1000"]
    },
    difficulty: {
        type: String,
        required: [true, "Missing Difficulty"],
        minlength: [3, "Title is too short"],
        maxlength: [10, "Title is too long"],
        trim: true
    },
    image: {
        type: Object, 
    },
    imageName:{
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false 
});

RecipeSchema.virtual("user", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

export const RecipeModel = model<IRecipeModel>("RecipeModel", RecipeSchema, "recipes");
