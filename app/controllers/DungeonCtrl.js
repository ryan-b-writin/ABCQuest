app.controller("DungeonCtrl", function($scope, userStorage){
  $scope.playerCharacter = {
    attackDamage: 2,
    health: 10,
    avatar: null,
    monster_kills: 0,
    avatar: "assets/sword.png",
    userName: "Mysterious Adventurer",
    GPcounted: 0,
    GPspent: 0
  }

  $scope.monster = {
    attackDamage: 1,
    health: 4,
    portrait: "assets/monster.jpeg",
    name: "generic placeholder"
  }

  //login button text
  $scope.loginButton = "Log in with Github"

  //dialogue bar text
  $scope.message = "WELCOME TO ABCQuest"

  //on click of attack button- battle sequence
  $scope.attackSequence = function(){
    $scope.monster.health -= $scope.playerCharacter.attackDamage;
    if($scope.monster.health < 1) {
      $scope.message= `you slew the ${$scope.monster.name}`
      $scope.playerCharacter.monster_kills += 1;
      //update user account with new monster kill total
      $scope.monster.health = 4;
    } else {
      $scope.message =`You deal ${$scope.playerCharacter.attackDamage} damage!`
      $scope.playerCharacter.health -= $scope.monster.attackDamage;
      //update user account with new HP total
      if ($scope.playerCharacter.health < 1){
        $scope.message="YOU HAVE FALLEN IN BATTLE"
      } else {
        $scope.message=`You hit the ${$scope.monster.name} for ${$scope.playerCharacter.attackDamage}. The monster hits you for ${$scope.monster.attackDamage}!`
      }
    }
  }

  //on click of flee button. 50% chance to succeed, resets monster on success.
  $scope.flee = function(){
    let coinFlip = Math.round(Math.random());
    if (coinFlip === 0){
      $scope.message="you fled the battle!"
      $scope.monster.health = 4;
    } else {
      $scope.playerCharacter.health -= $scope.monster.attackDamage;
      $scope.message=`You couldn't get away! The monster hits you for ${$scope.monster.attackDamage}!`
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
      $scope.message= `the potion heals you for ${amtHealed}.`
      console.log("GP spent:", $scope.playerCharacter.GPspent);
    }
  }

  //login button function. pulls down github data, populates menu
  //pulls down firebase user account if one is present,
  //pushes up new acount info if one is not.
   $scope.getGP = function(){
    //if player is unauthenticated...
    if (!$scope.playerCharacter.gitHubToken){
      userStorage.authWithGitHub()
        .then(function(resolve){
          //populate menu with github auth results- avatar, name, uid for tracking account
          $scope.loginButton = "Update GP total"
          $scope.playerCharacter.uid = resolve.uid,
          $scope.playerCharacter.avatar = resolve.github.profileImageURL,
          $scope.playerCharacter.userName = resolve.github.username
          //search for existing account. if none is found...
          if (!userStorage.findUserAcct()){
            //push up the current userAccount object with starting stats & github name. avatar etc
            userStorage.postNewUserAcct($scope.playerCharacter);
          //if an existing account is found..
          } else {
            // userStorage.retrieveUserInfo()
          }
          // finally, update the number of commits counted in userAccount object & firebase
          // var numOfCommits = userStorage.countCommits()
        })
    }
  }


});