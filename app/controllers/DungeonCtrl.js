app.controller("DungeonCtrl", function($scope){

  //generate player character: 
    // -hp total
    // -attack damage
    // -number of monster kills
  //populate left menu with placeholders or user account info
    // placeholder portrait, starter HP, 0 monster kills- 
      // to be overwritten with user account info if present
    // -github avatar for character portrait
    // -hp total
    // -number of monsters killed

  //generate current monster:
    //picture in center of screen
    //hp total
    //attack damage
    //print: YOU ENCOUNTER A 'MONSTERNAME' to dialogue bar

  //timer function: called by attack button
    //player immediately attacks initial monster, deal attack damage to monster HP, 
      //IF: monster dies:
        // stop timer,
        // print: You slew the 'MONSTERNAME' to dialogue bar
        // make monster portrait disappear
        // generate new monster , keep poartrait hidden
        // change button text to 'PROCEED'
      //IF: monster lives:
        // print PLAYER ATTACKS FOR XXX damage to dialogue bar
    //two seconds: monster attacks, deal monster damage to player HP
      //update player HP total on left menu bar & user account
      //IF: player dies: 
        //stop timer
        //print: YOU HAVE FALLEN to dialogue bar
      //IF: player lives:
        //print MONSTER ATTACKS YOU FOR YYY DAMAGE to dialogue bar
    //three seconds: change button text to FLEE, enable button, restart timer (player attacks)

  //ACTION button! Initially says attack
    //IF: button text is ATTACK, on click:
      //start timer function
      //disable button
    //IF: button text is FLEE, on click:
      //stop timer
      //print YOU FLED THE BATTLE to dialogue bar
      //remove monster portrait from DOM
      //generate new monster, but keep portrait hidden
      //button text becomes PROCEED
    //IF: button text is PROCEED:
      //show monster portrait
      //print YOU ENCOUNTER A 'MONSTERNAME' to dialogue bar
      //disable button
      //start timer function

  //HEALTH POTION BUTTON: 
    //IF: player HP is zero, enable button & change action button text to PROCEED
    //update player HP to max on menu & user account
    //add 1 to lifetime GP spent
      //recalculate current GP in GP bar
    //disable button for two seconds

});