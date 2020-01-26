import React from "react";
import { NonIdealState, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default function LoginRequired({ action }) {
  return (
    <div className="mt-10">
      <NonIdealState
        icon={IconNames.BAN_CIRCLE}
        intent={Intent.SUCCESS}
        title="Authentication required"
        description="You need to login to use Ledger 56"
        action={
          <Button onClick={action} text="Login" intent={Intent.SUCCESS} />
        }
      />
    </div>
  );
}
