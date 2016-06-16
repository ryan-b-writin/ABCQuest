app.controller("GitCtrl", function($scope, $http, itemStorage){

  $scope.getNumOfCommits = function(){
    var repos = [];
    var commits = [];
    itemStorage.accessGithub($scope.userName).then(function successCallback(response){
      var itemCollection = response;
      // console.log("response", itemCollection);
      // Object.keys(itemCollection).forEach(function(key){
      //   itemCollection[key].id=key;
      //   itemStorage.collectCommits($scope.userName, itemCollection[key].name)
      //     .then(function successCallback(data){
      //       // console.log("response", data)
      //     })
      // })
    })
  }

  $scope.loginToGitHub = function(){
    itemStorage.authenticateWithGitHub();
  }
});