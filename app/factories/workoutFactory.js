'use strict';

capApp.factory("WorkoutFactory", function($q, $http, FirebaseUrl, FBcreds) {


    let getAllWorkouts = () => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseUrl}Workouts.json`)
                .then((workData) => {
                    resolve(workData);
                })
                .catch((err) => {
                    console.log("err in WF", err);
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