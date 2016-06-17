'use strict';
app.factory("userStorage", function($q, $http, firebaseURL, AuthFactory){
var userAccount = {};

//create user account object
  //user account has:
    // firebase UID
    // Github avatar
    // Github username
    // lifetime GP counted
    // lifetime GP spent
    // monster kills
    // current HP
    // github authentication token (temporary & so does not get passed to firebase)

//run code snippet from firebase to get github token
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

//access firebase to fill in userAccount object

//update userAccount on firebase


  return {authenticateWithGithub:authenticateWithGithub};
});