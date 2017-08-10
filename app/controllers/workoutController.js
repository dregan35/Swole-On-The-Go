'use strict';

capApp.controller("WorkoutController", function($scope, $window, WorkoutFactory, UserFactory, UserWorkoutsFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated(currentUser)
        .then((user) => {
            currentUser = UserFactory.getUser();

        });
    $scope.workouts = [];
    $scope.selectChanged = false;

    function fetchWorkouts() {
        let workoutArr = [];
        let currentUser = UserFactory.getUser();
        WorkoutFactory.getAllWorkouts()
            .then((workoutList) => {
                let workoutData = workoutList.data;
                Object.keys(workoutData).forEach((key) => {
                    workoutData[key].id = key;
                    workoutArr.push(workoutData[key]);
                });
                $scope.workouts = workoutArr;
            })
            .catch((err) => {
                console.log("Could Not Retrieve Workouts", err);
            });
    }
    fetchWorkouts();

    $scope.chosenOption = function() {
        $scope.selectChanged = true;
    };

    $scope.saveWorkout = (workoutItem) => {
        workoutItem.uid = UserFactory.getUser();
        WorkoutFactory.postNewWorkout(workoutItem)
            .then((data) => {
                // alert("Thank You for Adding This Workout");
                console.log("New Workout Data", data);
                $window.location.href = '#!/capapp/view';

            });
    };
});