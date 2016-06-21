'use strict';
app.factory("userStorage", function($q, $http, firebaseURL){
var userAccount = {};
var totalCommits = [];

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
        userAccount.userName= authData.github.username;
        resolve(authData);
      }
    });
  })
}

var findUserAcct = function(){

  return false;
}

var getRepos = function(){
let allRepos = [];
  return $q(function(resolve,reject){
  $http.get(`https://api.github.com/users/${userAccount.userName}/repos?xxxx`)
    .success(function(response){
      for (let repoName in response){
        allRepos.push(response[repoName].name);
      }
      resolve(allRepos)
    })
  })
}

var getCommits = function(repoName){
  let allCommits = [];
  return $q(function(resolve,reject){
  $http.get(`https://api.github.com/repos/${userAccount.userName}/${repoName}/commits?xxxx`)
    .success(function(response){
      for (let commits in response){
        allCommits.push(response[commits]);
      }
      resolve(allCommits);
    })
  })
}


var countCommits = function(){
  getRepos().then(function(repoNames){
    for (let repoName in repoNames){
      getCommits(repoNames[repoName]).then(function(response){
        for (let commits in response) {
          totalCommits.push(response[commits])
        }
      })
    }
    console.log("total comits", totalCommits);
    return totalCommits.length
  })
}

var getTotalCommits = function(){
  return totalCommits.length;
}


  return {countCommits:countCommits, getTotalCommits:getTotalCommits, authWithGitHub:authWithGitHub, postNewUserAcct:postNewUserAcct, findUserAcct:findUserAcct};
});