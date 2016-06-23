'use strict';
app.factory("userStorage", function($q, $http, firebaseURL){
var userAccount = {};
var totalCommits = [];
var userID = null;

//get list of all users
  var getUserList = function(){
    var userAcctId = "";
    var users = [];
    return $q(function(resolve, reject){
      $http.get(`${firebaseURL}users.json`)
        .success(function(usersObject){
          var userCollection = usersObject;
          Object.keys(userCollection).forEach(function(key){
            userCollection[key].id=key;
            users.push(userCollection[key]);
          })
          resolve(users);
        })
        .error(function(error){
          reject(error);
        });
      })
  }

  //find specific user in list by uid
  var findUserAcct = function(userList, githubUID){
    console.log("searching for UID:", githubUID);
    let userID = null;
    for (let singleUser in userList){
      if (userList[singleUser].uid === githubUID){
        userID = userList[singleUser].id
        console.log("userID found", userID );
      }
    } if (userID === null){
      return "not found";
    } else {
      return userID;
      console.log("user found!");
    }
  }

  //post new user account to Firebase
  var postNewUserAcct = function(newUser){
    userID = newUser.uid;
    console.log("posting acct with user id", userID);
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
          uid: newUser.uid,
          monster: newUser.monster
        })
        ).success(
        function(objectFromFirebase){
            resolve(objectFromFirebase);
        }
      );
    })
  }

 var retrieveUserInfo = function(objectID){
    return $q(function(resolve, reject){
      $http.get(firebaseURL + "users/"+objectID+".json")
        .success(function(itemObject){
          resolve(itemObject);
        })
        .error(function(error){
          reject(error);
        });
      });
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
        userAccount.userName = authData.github.username;
        userAccount.uid = authData.uid;
        resolve(authData);
      }
    });
  })
}

var updateGithub = function(){
  console.log("updateGithub");
}

var getRepos = function(){
let allRepos = [];
  return $q(function(resolve,reject){
  $http.get(`https://api.github.com/users/${userAccount.userName}/repos`)
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
  $http.get(`https://api.github.com/repos/${userAccount.userName}/${repoName}/commits`)
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


  return {updateGithub:updateGithub, retrieveUserInfo:retrieveUserInfo, getUserList:getUserList, countCommits:countCommits, getTotalCommits:getTotalCommits, authWithGitHub:authWithGitHub, postNewUserAcct:postNewUserAcct, findUserAcct:findUserAcct};
});