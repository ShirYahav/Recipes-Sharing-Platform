import { UserModel } from "./user.model";

export class RatingModel {
    public _id: string;
    public rating: number;
    public comment: string;
    public recipeId: string;
    public userId: string;
    public user: UserModel;
}