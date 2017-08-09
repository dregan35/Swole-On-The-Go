'use strict';

capApp.controller("UserWorkoutsController", function($scope, $window, UserFactory, UserWorkoutsFactory) {
 
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


    $scope.saveUserWorkout = () => {
    	console.log("workoutItem", $scope.WorkoutItem);
    	UserWorkoutsFactory.saveUserWorkout($scope.WorkoutItem)
            .then((data) => {
                console.log("workout data", data);
                $window.location.href = '#!/capapp/MyWorkouts';
            });
    };

    $scope.deleteUserCard = (cardId) => {
    console.log("delete called", cardId);
    UserWorkoutsFactory.deleteUserWorkout(cardId)
    .then( (data) => {
      console.log("removed item", data);
      fetchUserWorkouts();
    });
  };

});

