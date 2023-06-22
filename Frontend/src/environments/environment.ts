// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  recipesUrl:"http://localhost:3001/api/recipes/",
  recipeImageUrl:"http://localhost:3001/api/recipes/images/",
  loginUrl:"http://localhost:3001/api/auth/login/",
  registerUrl:"http://localhost:3001/api/auth/register/",
  isTakenUrl: "http://localhost:3001/api/auth/is-taken/",
  recipesByUserUrl:"http://localhost:3001/api/recipes-by-user/",
  ratingsUrl:"http://localhost:3001/api/ratings/",  
  averageRatingUrl:"http://localhost:3001/api/average-rating/",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
