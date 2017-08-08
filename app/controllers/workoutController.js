'use strict';

capApp.controller("WorkoutController", function($scope, $window, WorkoutFactory, UserFactory, UserWorkoutsFactory) {

  let currentUser = null;

  UserFactory.isAuthenticated(currentUser)
  .then((user) => {
    currentUser = UserFactory.getUser();
    
  });
 $scope.workouts = [];

    function fetchWorkouts() {
        let workoutArr = [];
        let currentUser = UserFactory.getUser();
        WorkoutFactory.getWorkouts(currentUser)
            .then((workoutList) => {
                let workoutData = workoutList.data;
                Object.keys(workoutData).forEach((key) => {
                    workoutData[key].id = key;
                    workoutArr.push(workoutData[key]);
                });
                $scope.workouts = workoutArr;
            })
            .catch((err) => {
                console.log("error", err);
            });
    }
    fetchWorkouts();




}); 