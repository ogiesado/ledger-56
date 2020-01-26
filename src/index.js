import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Ledger from "./Ledger";
import { DataBaseProvider } from "./Database";

import "tailwindcss/dist/tailwind.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./index.css";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <DataBaseProvider>
    <Router>
      <Ledger />
    </Router>
  </DataBaseProvider>,
  rootElement
);
