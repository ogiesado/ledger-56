import React from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Navbar,
  Alignment,
  Button,
  Icon,
  Intent,
  Classes,
  Popover,
  Menu,
  Position
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default function Header({ signOut, displayName }) {
  const history = useHistory();

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT} className="w-full">
        <Navbar.Heading>
          <Link
            className="text-blue-700 no-underline hover:no-underline"
            to="/"
          >
            Ledger 56
          </Link>
        </Navbar.Heading>
        <div className="flex flex-row items-center justify-end ml-auto">
          <Button
            className={`${Classes.MINIMAL} xs:hidden`}
            icon={IconNames.DASHBOARD}
            text="Dashboard"
            onClick={() => history.push("/dashboard")}
          />
          <Button
            className={`${Classes.MINIMAL} xs:hidden`}
            icon={IconNames.SWAP_HORIZONTAL}
            text="Transactions"
            onClick={() => history.push("/transactions")}
          />
          <Button
            className={`${Classes.MINIMAL} xs:hidden`}
            icon={IconNames.BRIEFCASE}
            text="Portfolio"
            onClick={() => history.push("/portfolio")}
          />
          <Navbar.Divider className="xs:hidden" />
          <Popover
            content={
              <Menu>
                <Menu.Item
                  icon={IconNames.PERSON}
                  onClick={() => history.push("/profile")}
                  text={displayName}
                />
                <Menu.Item
                  icon={IconNames.REFRESH}
                  onClick={() => history.push("/profile")}
                  text="Refresh"
                />
                <Menu.Divider />
                <Menu.Item
                  icon={IconNames.ARROW_RIGHT}
                  onClick={() => history.push("/dashboard")}
                  text="Add Funds"
                />
                <Menu.Item
                  icon={IconNames.ARROW_LEFT}
                  onClick={() => history.push("/dashboard")}
                  text="Withdraw Funds"
                />
                <Menu.Item
                  icon={IconNames.ARROW_BOTTOM_LEFT}
                  onClick={() => history.push("/dashboard")}
                  text="Pay Taxes"
                />
                <Menu.Divider />
                <Menu.Item
                  icon={IconNames.ADD_TO_FOLDER}
                  onClick={() => history.push("/dashboard")}
                  text="Buy"
                />
                <Menu.Item
                  icon={IconNames.FOLDER_SHARED}
                  onClick={() => history.push("/dashboard")}
                  text="Sell"
                />
                <Menu.Divider />
                <Menu.Item
                  icon={IconNames.DASHBOARD}
                  onClick={() => history.push("/dashboard")}
                  text="Dashboard"
                />
                <Menu.Item
                  icon={IconNames.SWAP_HORIZONTAL}
                  onClick={() => history.push("/transactions")}
                  text="Transactions"
                />
                <Menu.Item
                  icon={IconNames.BRIEFCASE}
                  onClick={() => history.push("/portfolio")}
                  text="Portfolio"
                />
                <Menu.Divider />
                <Menu.Item
                  icon={IconNames.LOG_OUT}
                  onClick={signOut}
                  text="Logout"
                />
              </Menu>
            }
            position={Position.BOTTOM_RIGHT}
          >
            <Button
              className={Classes.MINIMAL}
              icon={
                <Icon
                  icon={IconNames.USER}
                  iconSize={Icon.SIZE_LARGE}
                  intent={Intent.PRIMARY}
                  className="cursor-pointer"
                />
              }
            />
          </Popover>
        </div>
      </Navbar.Group>
    </Navbar>
  );
}
