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

  var postNewUserAcct = function(newUser){
    return $q(function(resolve,reject){
      $http.post(
        firebaseURL + "users.json",
        JSON.stringify({
          avatar: newUser.avatar,
          userName: newUser.userName,
          GPcounted: 0,
          GPspent: 0,
          kills: 0,
          hp: 10,
          uid: newUser.uid
        })
        ).success(
        function(objectFromFirebase){
            resolve(objectFromFirebase);
        }
      );
    })
  }

//run code snippet from firebase to get github token and/or UID
var authWithGitHub = function(){
  return new Promise((resolve, reject) => {
    var ref = new Firebase(firebaseURL);
      ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        console.log("UID", authData.uid );
        // console.log("github info", authData. );
        resolve(authData);
      }
    });
  })
}

var findUserAcct = function(){

  return false;
}



  return {authWithGitHub:authWithGitHub, postNewUserAcct:postNewUserAcct, findUserAcct:findUserAcct};
});