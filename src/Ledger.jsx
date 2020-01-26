import React, { useContext } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Database from "./Database";
import Header from "./components/Header";

export default function Ledger() {
  const { store } = useContext(Database);
  //
  return (
    <div className="container mx-auto mt-2 flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-2">
        <Switch>
          <Route exact path={["/", "/dashboard"]}>
            <p>DASHBOARD</p>
          </Route>
          <Route eaxect path="/transactions">
            <p>TRANSACTION</p>
          </Route>
          <Route exact path="/portfolio">
            <p>PORTFOLIO</p>
          </Route>
        </Switch>
      </main>
      <footer>
        <p>&copy; 2020 - A 56 Productions</p>
      </footer>
    </div>
  );
}
