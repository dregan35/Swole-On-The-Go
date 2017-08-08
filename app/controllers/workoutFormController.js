'use strict';

capApp.controller("WorkoutFormController", function($scope, $window, WorkoutFactory, UserFactory, UserWorkoutsFactory) {
 
 
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

});

