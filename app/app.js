var app = angular.module("QuestApp", ["ngRoute"])
  .constant("firebaseURL","https://abcquest.firebaseio.com/")
 

  let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
    if(AuthFactory.isAuthenticated()){
      console.log("user is authenticated, resolve route promise")
      resolve();
    } else {
      console.log("user is not authenticated, reject route promise");
      reject();
    }
})