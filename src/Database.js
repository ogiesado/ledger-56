import React, {
  useEffect,
  useState,
  createContext,
  useMemo,
  useRef
} from "react";
import LoginRequired from "./components/LoginRequired";
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

const DataBase = createContext();

export default DataBase;

export function DataBaseProvider({ children }) {
  const authProvider = useRef(null);
  const store = useRef(null);
  const [state, setState] = useState({
    user: null,
    isAuthenticating: false,
    authError: null
  });

  const database = useMemo(() => {
    return {
      user: state.user,
      isAuthenticating: state.isAuthenticating,
      authError: state.authError,
      store: store.current,
      authenticate() {
        setState(currentState => ({
          ...currentState,
          isAuthenticating: true,
          authError: null
        }));

        firebase
          .auth()
          .signInWithPopup(authProvider.current)
          .then(function(result) {
            setState(currentState => ({
              ...currentState,
              isAuthenticating: false,
              user: result,
              authError: null
            }));
          })
          .catch(function(error) {
            setState(currentState => ({
              ...currentState,
              isAuthenticating: false,
              user: null,
              authError: error.message
            }));
          });
      },
      signOut() {
        return firebase
          .auth()
          .signOut()
          .then(function() {
            setState(currentState => ({
              ...currentState,
              isAuthenticating: false,
              user: null,
              authError: null
            }));
          })
          .catch(function(error) {
            console.log("sign out failed");
          });
      },
      tranasaction(callback) {
        return store.current.runTransaction(callback);
      },
      add(collection, document) {
        return store.current.collection(collection).add(document);
      }
    };
  }, [state]);

  useEffect(function initialize() {
    async function init() {
      await firebase.initializeApp(firebaseConfig);
      await firebase.analytics();
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      authProvider.current = new firebase.auth.GoogleAuthProvider();
    }

    init();
  }, []);

  useEffect(function listenForAuthUser() {
    return firebase.auth().onAuthStateChanged(function(user) {
      if (state.user === user) return; // catches null null
      if (state.user !== null && user !== null && state.user.uid === user.uid)
        return;

      setState(currentState => ({
        ...currentState,
        user
      }));

      store.current = user ? firebase.firestore() : null;
    });
  });

  return (
    <DataBase.Provider value={database}>
      <>
        {state.user && children}
        {!state.user && <LoginRequired action={database.authenticate} />}
      </>
    </DataBase.Provider>
  );
}
