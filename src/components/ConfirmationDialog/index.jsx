import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";

export default function ConfirmationDialog({ remove }) {
  const {
    removeData,
    setOpenRemove,
    openRemove: { status, id },
  } = remove;

  const handleClose = () => {
    setOpenRemove({ status: false, id: null });
  };

  const handleRemove = () => {
    removeData(id);
    handleClose();
  };

  return (
    <div>
      <Dialog open={status} onClose={handleClose} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Remove
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this expense?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleRemove}>Remove</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
