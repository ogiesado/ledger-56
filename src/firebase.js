import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8Ts6xzY4BcsM8rJofk7HaHzqFxFi3elo",
  authDomain: "ledger-56.firebaseapp.com",
  databaseURL: "https://ledger-56.firebaseio.com",
  projectId: "ledger-56",
  storageBucket: "ledger-56.appspot.com",
  messagingSenderId: "1004923295911",
  appId: "1:1004923295911:web:fb17faf1de802aaad46382",
  measurementId: "G-RL40C2EGK2"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const provider = new firebase.auth.GoogleAuthProvider();

firebase
  .auth()
  .signInWithPopup(provider)
  .then(function(result) {
    console.log("auth succss");
    // Initialize Firebase
  })
  .catch(function(error) {
    console.log("auth error", JSON.stringify(error));
  });

export function getDb() {
  return firebase.firestore();
}
