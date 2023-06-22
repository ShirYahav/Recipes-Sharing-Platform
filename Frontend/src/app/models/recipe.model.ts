import { UserModel } from "./user.model";

export class RecipeModel {
    public _id: string;
    public title: string;
    public description: string;
    public ingredients: string;
    public instructions: string;
    public totalTime: string;
    public servings: number;
    public difficulty: string;
    public image: File;
    public imageName: string;
    public userId: string;
    public user: UserModel;
}