var app = angular.module("QuestApp", ["ngRoute"]) 
  .constant("firebaseURL","https://abcquest.firebaseio.com/");

  let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
    if(AuthFactory.isAuthenticated()){
      console.log("user is authenticated, resolve route promise")
      resolve();
    } else {
      console.log("user is not authenticated, reject route promise");
      reject();
    }
  })

app.config(function($routeProvider){
  $routeProvider.
  when('/', {
    templateUrl:'partials/dungeon.html',
    controller:'DungeonCtrl'
    // resolve: {isAuth}
  // }).
  // when('/dungeon', {
  //   templateUrl:'partials/dungeon.html',
  //   controller:'DungeonCtrl',
  //   resolve: {isAuth}
  // }).
  // when('/login', {
  //   templateUrl: 'partials/login.html',
  //   controller: 'LoginCtrl'
  // }).
  // when('/logout', {
  //   templateUrl: 'partials/login.html',
  //   controller: 'LoginCtrl'
  }).
  otherwise('/');
});

app.run(($location) => {
  let questRef = new Firebase("https://abcquest.firebaseio.com/");

  questRef.onAuth(authData => {
    if(!authData){
      $location.path("/login");
    }
  })
})