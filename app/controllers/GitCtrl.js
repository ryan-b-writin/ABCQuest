app.controller("GitCtrl", function($scope, $http, itemStorage){

  $scope.getNumOfCommits = function(){
    var repos = [];
    var commits = [];
    itemStorage.accessGithub($scope.userName).then(function successCallback(response){
      var itemCollection = response;
    })
  }

  $scope.loginToGitHub = function(){
    console.log("login to github");
    itemStorage.authenticateWithGithub();
  }
});