'use strict';

capApp.factory("UserFactory", function($q, $http, FirebaseUrl, FBcreds) {

  var config = {
    apiKey: FBcreds.key,
    authDomain: FBcreds.authDomain
  };

  firebase.initializeApp(config);

 let currentUser = null;

  let isAuthenticated = function() {
    return new Promise( (resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        console.log("user", user);
        if (user) {
          currentUser = user.uid;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  let getUser = () => {
    return currentUser;
  };

  let createUser = (userObj) => {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .catch( (err) => {
      console.log("Error can not Compute!", err.message);
    });
  };

  let loginUser = (userObj) => {
    return $q( (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
      .then( (user) => {
        currentUser = user.uid;
        resolve(user);
      })
      .catch( (err) => {
        console.log("error loggin in", err.message);
      });
    });
  };

  let logoutUser = () => {
    return firebase.auth().signOut()
    .catch( (err) => {
      console.log("error, Danger You Shall Not Pass!", err.message);
    });
  };

  console.log("firebase", firebase );

  return {isAuthenticated, getUser, createUser, loginUser, logoutUser};
});


