"use strict";

let capApp = angular.module("CapApp", ["ngRoute"])
.constant("FirebaseUrl", "https://swole-on-the-go.firebaseio.com/");

let isAuth =(UserFactory) => {
  return new Promise( (resolve, reject) => {
    UserFactory.isAuthenticated()
    .then( (userBoolean) => {
      if(userBoolean)
      resolve();
     else 
      reject();
    });
  });
};

capApp.config( ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'UserController'
  })
  .when('/capapp/view', {
    templateUrl: 'partials/home.html',
    controller: 'WorkoutController',
    resolve: {isAuth}
  })
  .when('/capapp/MyWorkouts', {
    templateUrl: 'partials/workouts.html',
    controller: 'WorkoutFormController',
    resolve: {isAuth}
  })
  .when('/cappapp/edit', {
    templateUrl: 'partials/workout-form.html',
    controller: 'WorkoutFormController',
    resolve: {isAuth}
  })
  .otherwise('/');
});

