'use strict';

pinApp.controller("userController", function($scope, $window, userFactory) {

  $scope.account = {
    email: "",
    password: ""
  };

  $scope.register = () => {
    console.log("you clicked register");
    userFactory.createUser($scope.account)
    .then( (userData) => {
      console.log("User", userData);
      $scope.login();
    });
  };

  $scope.login = () => {
    userFactory.loginUser($scope.account)
    .then( (userData) => {
      console.log("userData", userData);
      $window.location.href = '#!/pin/view';
    });
  };
});