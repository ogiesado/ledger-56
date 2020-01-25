import React, { useContext } from "react";

import Database from "./Database";

export default function Ledger() {
  const { store } = useContext(Database);
  //
  return <p>Welcome to ledger56</p>;
}
