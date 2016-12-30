## This project needs to be refactored to work with a Firebase update. The authentication and user account features no longer work after the Firebase changes.

# ABCQuest
Always Be Questing

This is my frontend capstone project, built with HTML, CSS, AngularJS and Firebase.  

ABCQuest is a simple game where users battle orcs for points. As the player takes damage, they can heal themselves with potions purchased by making github commits.  

The goal of the game is to defeat as many orcs as possible, log out for awhile, then log back in and take on more orcs after making more Github commits.  

ABCQuest uses your Github account to log you into your ABCQuest user account. 

It was originally intended to check all of your commits since the last login. However, Due to a problem with nested promises, it instead checks one repository at a time. Your user account tracks each of your repositories and the number of commits made to it at last check. When you check again, it compares the current number of commits to the last check.
