app.controller("GitCtrl", function($scope, $http, itemStorage){

  $scope.getNumOfCommits = function(){
    var repos = [];
    itemStorage.accessGithub($scope.userName).then(function successCallback(response){
      console.log(response);
    })
  }

});