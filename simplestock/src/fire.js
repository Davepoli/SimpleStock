import firebase from 'firebase'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCmQh82lrd0pq3v0i1WdzZwe_INMaEZ2uE",
    authDomain: "investingy.firebaseapp.com",
    databaseURL: "https://investingy.firebaseio.com",
    projectId: "investingy",
    storageBucket: "investingy.appspot.com",
    messagingSenderId: "528472466213"
  }

  var firebaseInit = firebase.initializeApp(config);
  export default firebaseInit;
