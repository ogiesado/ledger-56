import React, { useContext } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Database from "./Database";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
      <Footer />
    </div>
  );
}
