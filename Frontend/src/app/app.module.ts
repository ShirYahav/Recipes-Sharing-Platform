import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { RecipesListComponent } from './components/recipes-area/recipes-list/recipes-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeCardComponent } from './components/recipes-area/recipe-card/recipe-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FullRecipeComponent } from './components/recipes-area/full-recipe/full-recipe.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { UserPageComponent } from './components/user-area/user-page/user-page.component';
import { UserRecipeCardComponent } from './components/user-area/user-recipe-card/user-recipe-card.component';
import { AddRecipeComponent } from './components/user-area/add-recipe/add-recipe.component';
import {MatInputModule} from '@angular/material/input';
import { UpdateRecipeComponent } from './components/user-area/update-recipe/update-recipe.component';
import { RatingsListComponent } from './components/ratings-area/ratings-list/ratings-list.component';
import { RatingLineComponent } from './components/ratings-area/rating-line/rating-line.component';
import { AddRatingComponent } from './components/ratings-area/add-rating/add-rating.component';
import { SearchFilterPipe } from './pipes/searchFilter.pipe';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    RecipesListComponent,
    RecipeCardComponent,
    FullRecipeComponent,
    RegisterComponent,
    LoginComponent,
    AuthMenuComponent,
    UserPageComponent,
    UserRecipeCardComponent,
    AddRecipeComponent,
    UpdateRecipeComponent,
    RatingsListComponent,
    RatingLineComponent,
    AddRatingComponent,
    SearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,

  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
