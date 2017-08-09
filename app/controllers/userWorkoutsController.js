'use strict';

capApp.controller("UserWorkoutsController", function($scope, $window, UserFactory, $routeParams, UserWorkoutsFactory) {
 
    // $scope.workouts = [];

    function fetchUserWorkouts() {
        let workoutArr = [];
        let currentUser = UserFactory.getUser();
        UserWorkoutsFactory.getUserWorkouts(currentUser)
            .then((workoutList) => {
                console.log("workoutlist", workoutList);
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
    fetchUserWorkouts();


    $scope.deleteUserCard = (cardId) => {
    console.log("delete called", cardId);
    UserWorkoutsFactory.deleteUserWorkout(cardId)
    .then( (data) => {
      console.log("removed item", data);
      fetchUserWorkouts();
    });
  };

});

