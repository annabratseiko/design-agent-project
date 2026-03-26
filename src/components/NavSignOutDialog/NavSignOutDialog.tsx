import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";

export interface NavSignOutDialogProps {
  open: boolean;
  /** Application name shown in dialog title. Defaults to "this app". */
  appName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const NavSignOutDialog: React.FC<NavSignOutDialogProps> = ({
  open,
  appName = "this app",
  onConfirm,
  onCancel,
}) => {
  // T032: appName prop replaces [App] placeholder
  // A11y: focus moves to Cancel button on open (safe default — prevents
  // accidental sign-out from a single Enter keypress)
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      // Small delay ensures Dialog has finished mounting before focusing
      const timer = setTimeout(() => {
        cancelRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(_, data) => !data.open && onCancel()}>
      <DialogSurface aria-describedby="signout-dialog-body">
        <DialogTitle>Sign out of {appName}?</DialogTitle>
        <DialogBody>
          <DialogContent id="signout-dialog-body">
            Any unsaved changes will be lost.
          </DialogContent>
          <DialogActions>
            <Button
              appearance="primary"
              onClick={onConfirm}
            >
              Sign out
            </Button>
            <Button
              appearance="secondary"
              ref={cancelRef}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
