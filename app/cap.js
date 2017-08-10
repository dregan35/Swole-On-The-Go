"use strict";

let capApp = angular.module("CapApp", ["ngRoute"])
    .constant("FirebaseUrl", "https://swole-on-the-go.firebaseio.com/");

let isAuth = (UserFactory) => {
    return new Promise((resolve, reject) => {
        UserFactory.isAuthenticated()
            .then((userBoolean) => {
                if (userBoolean)
                    resolve();
                else
                    reject();
            });
    });
};

capApp.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/login.html',
            controller: 'UserController'
        })
        .when('/capapp/view', {
            templateUrl: 'partials/home.html',
            controller: 'WorkoutController',
            resolve: { isAuth }
        })
        .when('/capapp/MyWorkouts', {
            templateUrl: 'partials/workouts.html',
            controller: 'UserWorkoutsController',
            resolve: { isAuth }
        })
        .when('/capapp/edit/:workoutItem', {
            templateUrl: 'partials/userWorkoutForm.html',
            controller: 'editUserWorkoutController',
            resolve: { isAuth }
        })
        .otherwise('/');
});