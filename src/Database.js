import React, {
  useEffect,
  useState,
  createContext,
  useMemo,
  useRef
} from "react";
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

            store.current = firebase.firestore();
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
        return store
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

  useEffect(() => {
    async function init() {
      await firebase.initializeApp(firebaseConfig);
      await firebase.analytics();
      authProvider.current = new firebase.auth.GoogleAuthProvider();
      const user = firebase.auth().currentUser;
      if (user) {
        setState(currentState => ({
          ...currentState,
          user
        }));
      } else {
        database.authenticate();
      }
      console.log(user);
    }

    init();
  }, []);

  return <DataBase.Provider value={database}>{children}</DataBase.Provider>;
}
