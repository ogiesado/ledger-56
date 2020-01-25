import React from "react";
import ReactDOM from "react-dom";

import Ledger from "./Ledger";
import { DataBaseProvider } from "./Database";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <DataBaseProvider>
    <Ledger />
  </DataBaseProvider>,
  rootElement
);
