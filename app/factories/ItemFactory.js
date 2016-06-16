'use strict';
app.factory("itemStorage", function($q, $http){

  var getAuthData = function() {
    return $http.get('data/githubAuthData.json');
  }

var authenticateWithGitHub = function(){
  var ref = new Firebase("https://abcquest.firebaseio.com");
  ref.authWithOAuthPopup("github", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
}

  var accessGithub = function(userName){
    return $q(function(resolve, reject){
      getAuthData().then(function(data) {
        let APIKey = data.data.items;
        console.log("apikey", APIKey);
        $http.get("https://api.github.com/users/"+userName+"/repos")
          .success(function(itemObject){
            resolve(itemObject)
          })
          .error(function(error){
            reject(error);
          });
        });
      });
    }

  var collectCommits = function(userName, repoName){
    return $q(function(resolve,reject){
      $http.get("https://api.github.com/repos/"+userName+"/"+repoName+"/commits")
        .success(function(itemObject){
          resolve(itemObject)
        })
        .error(function(error){
          reject(error);
        });
    });
  }
 return{accessGithub:accessGithub, collectCommits:collectCommits, authenticateWithGitHub:authenticateWithGitHub}
});