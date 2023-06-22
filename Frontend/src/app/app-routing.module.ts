import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { AddRatingComponent } from './components/ratings-area/add-rating/add-rating.component';
import { FullRecipeComponent } from './components/recipes-area/full-recipe/full-recipe.component';
import { AddRecipeComponent } from './components/user-area/add-recipe/add-recipe.component';
import { UpdateRecipeComponent } from './components/user-area/update-recipe/update-recipe.component';
import { UserPageComponent } from './components/user-area/user-page/user-page.component';

const routes: Routes = [
  
  { path: "home", component: HomeComponent },
  { path: "recipe/:_id", component: FullRecipeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "user-page", component: UserPageComponent },
  { path: "add-recipe", component: AddRecipeComponent },
  { path: "update-recipe/:_id", component: UpdateRecipeComponent },
  { path: "add-rating/:recipeId", component: AddRatingComponent },

  { path: "", redirectTo: "/home", pathMatch: "full" }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
