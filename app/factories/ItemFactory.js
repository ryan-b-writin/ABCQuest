'use strict';
app.factory("itemStorage", function($q, $http){

  var accessGithub = function(userName){
    return $q(function(resolve, reject){
      $http.get("https://api.github.com/users/"+userName+"/repos")
        .success(function(itemObject){
          resolve(itemObject)
        })
        .error(function(error){
          reject(error);
        });
      });
    }

 return{accessGithub:accessGithub}
});