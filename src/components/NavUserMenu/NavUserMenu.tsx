import React, { useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@fluentui/react-components";
import { useNavUserMenuStyles } from "./NavUserMenu.styles";
import { NavSignOutDialog } from "../NavSignOutDialog";
import type { UserProfile } from "../TopNav/types";

export interface NavUserMenuProps {
  user: UserProfile;
  /** Application name passed through to sign-out dialog */
  appName?: string;
  onNavigate: (href: string) => void;
  onSignOut: () => Promise<void>;
}

export const NavUserMenu: React.FC<NavUserMenuProps> = ({
  user,
  appName,
  onNavigate,
  onSignOut,
}) => {
  const styles = useNavUserMenuStyles();
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);

  const handleSignOutClick = () => {
    setIsSignOutDialogOpen(true);
  };

  const handleSignOutConfirm = async () => {
    setIsSignOutDialogOpen(false);
    await onSignOut();
  };

  const handleSignOutCancel = () => {
    setIsSignOutDialogOpen(false);
    // A11y: focus returns to avatar button via Menu's built-in focus management
  };

  return (
    <>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button
            appearance="subtle"
            aria-label="Account menu"
            className={styles.trigger}
          >
            <Avatar
              name={user.displayName}
              image={user.avatarUrl ? { src: user.avatarUrl } : undefined}
              initials={user.initials}
              size={32}
            />
          </Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem onClick={() => onNavigate("/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => onNavigate("/preferences")}>
              Preferences
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleSignOutClick}>
              Sign out
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <NavSignOutDialog
        open={isSignOutDialogOpen}
        appName={appName}
        onConfirm={handleSignOutConfirm}
        onCancel={handleSignOutCancel}
      />
    </>
  );
};
