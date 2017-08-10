'use strict';

capApp.controller("editUserWorkoutController", function($scope, $window, $routeParams, UserWorkoutsFactory, WorkoutFactory, UserFactory) {
	// console.log("hello");

$scope.saveUserInput = (WorkoutItem) => {
UserWorkoutsFactory.saveEditedUserWorkout($routeParams.workoutItem, WorkoutItem)
    .then((data) => {
        console.log("Yay you edited a workout!");
        $window.location.href = "#!/capapp/MyWorkouts";
    });
};


});