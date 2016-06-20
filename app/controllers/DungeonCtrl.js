app.controller("DungeonCtrl", function($scope, userStorage){
  $scope.playerCharacter = {
    attackDamage: 2,
    health: 10,
    avatar: null,
    monster_kills: 0
  }

  $scope.monster = {
    attackDamage: 1,
    health: 4,
    portrait: null,
    name: "generic placeholder"
  }

  $scope.attackSequence = function(){
    $scope.monster.health -= $scope.playerCharacter.attackDamage;
    if($scope.monster.health < 1) {
      console.log(`you slew the ${$scope.monster.name}`);
      $scope.playerCharacter.monster_kills += 1;
      console.log("current monster kills:", $scope.playerCharacter.monster_kills);
      $scope.monster.health = 4;
    } else {
      console.log(`You deal ${$scope.playerCharacter.attackDamage} damage!`);
      $scope.playerCharacter.health -= $scope.monster.attackDamage;
      if ($scope.playerCharacter.health < 1){
        console.log("YOU HAVE FALLEN IN BATTLE");
      } else {
        console.log(`the monster hits you for ${$scope.monster.attackDamage}!` );
      }
    }
  }

  $scope.flee = function(){
    let coinFlip = Math.round(Math.random());
    if (coinFlip === 0){
      console.log("you fled the battle!");
      $scope.monster.health = 4;
    } else {
      $scope.playerCharacter.health -= $scope.monster.attackDamage;
      console.log(`the monster hits you for ${$scope.monster.attackDamage}!`);
    }
  }

  $scope.healthPotion = function(){
    var amtHealed = 10 - $scope.playerCharacter.health;
    $scope.playerCharacter.health = 10;
    console.log(`the potion heals you for ${amtHealed}.`);
  }


  //generate player character: 
    // -attack damage
  //populate left menu with placeholders or user account info
    // placeholder portrait, starter HP, 0 monster kills- 
    // to be overwritten with user account info if present
    // -github avatar for character portrait
    // -hp total
    // -number of monsters killed

  //battle function: called by attack button
    //IF: no monster present
      // generate monster
      // print //print YOU ENCOUNTER A 'MONSTERNAME' to dialogue bar
      // break
    //IF: monster present: 
      //player attacks monster, deal attack damage to monster HP, 
      //IF: monster dies:
        // print: You slew the 'MONSTERNAME' to dialogue bar
        // make monster portrait disappear
        // generate new monster , keep poartrait hidden
      //IF: monster lives:
        // print PLAYER ATTACKS FOR XXX damage to dialogue bar
        // monster attacks, deal monster damage to player HP
        // update player HP total on left menu bar & user account
          //IF: player dies: 
            // print: YOU HAVE FALLEN to dialogue bar
          //IF: player lives:
            // print MONSTER ATTACKS YOU FOR YYY DAMAGE to dialogue bar
    
  //flee button:
      //print YOU FLED THE BATTLE to dialogue bar
      //remove monster

  //HEALTH POTION BUTTON: 
    //update player HP to max on menu & user account
    //add 1 to lifetime GP spent
      //recalculate current GP in GP bar

});