'use strict';

capApp.factory("UserWorkoutsFactory", function($q, $http, FirebaseUrl, FBcreds) {

    let getUserWorkouts = (userId) => {
        console.log("userId", userId);
        return $q((resolve, reject) => {
            $http.get(`${FirebaseUrl}UserWorkouts.json?orderBy="uid"&equalTo="${userId}"`)
                .then((userWorkoutsData) => {
                    resolve(userWorkoutsData);
                })
                .catch((err) => {
                    console.log("oops", err);
                    reject(err);
                });
        });
    };

    let saveUserWorkout = (newWorkout) => {
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

    let saveEditedUserWorkout = (userWorkouts) => {
        return $q((resolve, reject) => {
            let userWorkoutId = userWorkouts.id;
            if (userWorkoutId) {
                $http.put(`${FirebaseUrl}UserWorkouts/${userWorkouts}.json`,
                        angular.toJson(userWorkouts))
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } else {
                console.log("Error can not complete");
            }
        });
    };

    let deleteUserWorkout = (workoutId) => {
        return $q((resolve, reject) => {
            if (workoutId) {
                $http.delete(`${FirebaseUrl}UserWorkouts/${workoutId}.json`)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } else {
                console.log("id can't be found");
            }
        });
    };
     return { getUserWorkouts, saveUserWorkout, saveEditedUserWorkout, deleteUserWorkout };
});