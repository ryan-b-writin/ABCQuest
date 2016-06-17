app.controller("GitCtrl", function($scope, $http, userStorage){

//user account has:
  // firebase UID
  // Github avatar
  // Github username
  // lifetime GP counted
  // lifetime GP spent
  // github authentication token
  // monster kills

//on click of GET GP BUTTON
  //check if user has github token
    //if unauthenticated- run firebase github authentication
      //then count commits and update lifetime GP on userAccount Object, update firebase
    //if authenticated- 
      //count commits & update lifetime GP counted on user account object, update firebase
  //subtract lifetime GP spent from lifetime GP counted & print that number to git bar

// function to count commits:
  // takes github username from user account, then:
  // -collects the names of all public repos for that username
  // -use repo names to access each repo's commits
  // -push every commit object from each repo to an array
  // -return commit array.length, a number
  $scope.getNumOfCommits = function(){
    var repos = [];
    var commits = [];
    itemStorage.accessGithub($scope.userName).then(function successCallback(response){
      var itemCollection = response;
    })
  }

  //run github authentication snippet
  $scope.loginToGitHub = function(){
    console.log("login to github");
    itemStorage.authenticateWithGithub();
  }

});