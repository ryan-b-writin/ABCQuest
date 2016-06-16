"use strict";

app.controller("LoginCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory){
  let ref = new Firebase(firebaseURL);

  $scope.hasUser = false;

  $scope.account = {
    email: "",
    password: ""
  };
  
  if($location.path() === "/logout") {
    ref.unauth();
    $rootScope.isActive = false;
  }

$scope.register = () => {
    console.log("register");
    ref.createUser({
        email: $scope.account.email,
        password: $scope.account.password
    }, (error, userData) => {
        if(error){
            console.log(`Error creating user: ${error}`);
        } else{
            console.log(`Created user account with uid: ${userData.uid}`);
            $scope.login();
        }
    });
};

  $scope.login = () => {
    console.log("login");
    AuthFactory.authenticate($scope.account)
      .then(() => {
        $rootScope.isActive = true;
        $scope.hasUser= true;
        $location.path("/");
        $scope.$apply();

      })
  }

  console.log("hello login");

});