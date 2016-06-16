'use strict';
app.factory("itemStorage", function($q, $http, firebaseURL, AuthFactory){

var authenticateWithGithub = function(){
  // var ref = new Firebase(firebaseURL);
  //   ref.authWithOAuthPopup("github", function(error, authData) {
  //   if (error) {
  //     console.log("Login Failed!", error);
  //   } else {
  //     console.log("Authenticated successfully with payload:", authData);
  //   }
  // });
}

  return {authenticateWithGithub:authenticateWithGithub};
});