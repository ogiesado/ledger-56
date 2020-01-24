import React, { useEffect, useState } from "react";
import { getDb } from "./firebase";
import "./styles.css";

const db = getDb();

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // db.collection("users")
    //   .add({
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    //   })
    //   .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch(function(error) {
    //     console.error("Error adding document: ", error);
    //   });

    db.collection("users")
      .get()
      .then(querySnapshot => {
        const users = [];
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`);
          users.push(doc.data());
        });

        setUsers(users);
      });
  }, []);
  return (
    <div className="App">
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <h2>Someone hit your girl's phone up, I will tell you if it was me</h2>
      <h2>Someone hit your girl's phone up, I will tell you if it was me</h2>
    </div>
  );
}
