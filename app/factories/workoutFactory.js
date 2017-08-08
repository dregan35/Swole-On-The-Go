'use strict';

capApp.factory("WorkoutFactory", function($q, $http, FirebaseUrl, FBcreds) {


  let getAllWorkouts = (userId) => {
    console.log("userId", userId);
    return $q((resolve, reject) => {
      $http.get(`${FirebaseUrl}Workouts.json`)
      .then((workData) => {
        resolve(workData);
      })
      .catch((err) => {
        console.log("oops", err);
        reject(err);
      });
    });
  };

  let postNewWorkout = (newWorkout) => {
    return $q((resolve, reject) => {
      $http.post(`${FirebaseUrl}UserWorkouts.json`,
      angular.toJson(newWorkout))
      .then((newWorkoutData) => {
        resolve(newWorkoutData);
      })
      .catch((err) => {
        reject(err);
      });
    });
  };

 

    return { getAllWorkouts, postNewWorkout };
});