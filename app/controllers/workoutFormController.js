'use strict';

capApp.controller("WorkoutFormController", function($scope, $window, WorkoutFactory, UserFactory, UserWorkoutsFactory) {
 
 
    $scope.WorkoutItem = {
    	BodyPart: "",
        Rest: "",
        id: "",
        repsG: "",
        repsL: "",
        sets: "",
        url: "",
    };


    $scope.saveUserWorkout = () => {
    	console.log("workoutItem", $scope.WorkoutItem);
    	$scope.WorkoutItem.uid = UserFactory.getUser();
           UserWorkoutsFactory.saveUserWorkout($scope.WorkoutItem)
            .then((data) => {
                console.log("workout data", data);
                $window.location.href = '#!/capapp/view';
            });
    };

});

