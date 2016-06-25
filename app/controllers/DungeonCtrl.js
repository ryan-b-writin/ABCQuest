app.controller("DungeonCtrl", function($scope, userStorage){

  var countTotalGP = function(){
    let totalGP = 0;
    for (let repoObject in $scope.playerCharacter.repos){
      totalGP += $scope.playerCharacter.repos[repoObject].total;
    }
    console.log("total GP", totalGP );
    return totalGP;
  }

  $scope.playerCharacter = {
    attackDamage: 2,
    health: 10,
    avatar: null,
    kills: 0,
    avatar: "assets/sword.png",
    userName: "Mysterious Adventurer",
    GPcounted: 0,
    GPspent: 0,
    repos: [{name: "abcquest", total: 3}],
    monster: {
      attackDamage: 1,
      health: 4,
      portrait: "assets/monster.jpeg",
      name: "generic placeholder"
    }
  }

  $scope.getGP = function(){
    var repoName = prompt("Name your repository and mine it for gold!")
    //make an api call using the user's name and the given repo name, return number of commits
    userStorage.countCommits(repoName).then(function(data){
      // check if this repo is already being tracked by this user
      for (let repoObject in $scope.playerCharacter.repos){
        if ($scope.playerCharacter.repos[repoObject].name === repoName) {
          //if a repo object already exists with the same name, update the commit count associated with it
          $scope.playerCharacter.repos[repoObject].total = data;
          console.log("updated repo object", $scope.playerCharacter.repos[repoObject]);
        } else {
          //if no repo object exists with the provided name, make a new one and add it to the user's account
          let newRepoObject = {
            name: repoName,
            total: data
          }
          $scope.playerCharacter.repos.push(newRepoObject);
        }
      }
        // check all of the user's repo objects & total them up
        $scope.playerCharacter.GPcounted += countTotalGP();
        //update Firebase with the new total & tracked repo objects
        userStorage.updateuserAcct($scope.userID, $scope.playerCharacter)
    })
  }


  //login button text
  $scope.loginButton = "Log in with Github";

  //dialogue bar text
  $scope.message = "WELCOME TO ABCQuest";

  //on click of attack button- battle sequence
  $scope.attackSequence = function(){
    $scope.playerCharacter.monster.health -= $scope.playerCharacter.attackDamage;
    if($scope.playerCharacter.monster.health < 1) {
      $scope.message= `You slew the ${$scope.playerCharacter.monster.name}!!`
      $scope.playerCharacter.kills += 1;
      //update user account with new monster kill total
      $scope.playerCharacter.monster.health = 4;
    } else {
      $scope.message =`You deal ${$scope.playerCharacter.attackDamage} damage!`
      $scope.playerCharacter.health -= $scope.playerCharacter.monster.attackDamage;
      //update user account with new HP total
      if ($scope.playerCharacter.health < 1){
        $scope.message="You have fallen in battle."
      } else {
        $scope.message=`You hit the ${$scope.playerCharacter.monster.name} for ${$scope.playerCharacter.attackDamage}. The monster hits you for ${$scope.playerCharacter.monster.attackDamage}!`
      }
    }
    userStorage.updateuserAcct($scope.userID, $scope.playerCharacter)
  }

  //on click of flee button. 50% chance to succeed, resets monster on success.
  $scope.flee = function(){
    let coinFlip = Math.round(Math.random());
    if (coinFlip === 0){
      $scope.message="You fled the battle!"
      $scope.playerCharacter.monster.health = 4;
    } else {
      $scope.playerCharacter.health -= $scope.playerCharacter.monster.attackDamage;
      $scope.message=`You couldn't get away! The monster hits you for ${$scope.playerCharacter.monster.attackDamage}!`
    }
  }

  //health potion function. restores health, costs 1GP
  $scope.healthPotion = function(){
    if (($scope.playerCharacter.GPcounted - $scope.playerCharacter.GPspent) < 1 ){
      $scope.message = "You can't afford a health potion :("
    } else {
      $scope.playerCharacter.GPspent += 1;
      var amtHealed = 10 - $scope.playerCharacter.health;
      $scope.playerCharacter.health = 10;
      //update GP spent & HP total w/firebase
      $scope.message= `The potion heals you for ${amtHealed}.`
      userStorage.updateuserAcct($scope.userID, $scope.playerCharacter)
    }
  }

  //login button function. pulls down github data, populates menu
  //pulls down firebase user account if one is present,
  //pushes up new acount info if one is not.
  $scope.loginToGithub = function(){
    $scope.loginButton = "Mine for gold!"
    //if player is unauthenticated...
    if (!$scope.playerCharacter.uid){
      userStorage.authWithGitHub()
        .then(function(resolve){
          //populate menu with github auth results- avatar, name, uid for tracking account
          $scope.playerCharacter.uid = resolve.uid,
          $scope.playerCharacter.avatar = resolve.github.profileImageURL,
          $scope.playerCharacter.userName = resolve.github.username;
          //search for existing account. if none is found...
          var githubUID = $scope.playerCharacter.uid;
          userStorage.getUserList().then(function(data){
            $scope.userID = userStorage.findUserAcct(data, githubUID)
            if ($scope.userID === "not found"){
            //push up the current userAccount object with starting stats & github name. avatar etc
            userStorage.postNewUserAcct($scope.playerCharacter).then(function(response){
              $scope.userID = response.name;
            })
            //if an existing account is found..
            } else {
              userStorage.retrieveUserInfo($scope.userID).then(function(data){
              $scope.playerCharacter.health = data.hp;
              $scope.playerCharacter.kills = data.kills;
              $scope.playerCharacter.GPcounted = data.GPcounted;
              $scope.playerCharacter.GPspent = data.GPspent;
              $scope.playerCharacter.monster = data.monster;
            })
            }
          })
        
          // finally, update the number of commits counted in userAccount object & firebase
          // var numOfCommits = userStorage.countCommits()
        })
    } else {
      $scope.getGP();
    }
  }


});