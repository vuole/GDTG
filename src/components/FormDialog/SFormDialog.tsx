import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SButton from "../Button/SButton";

interface SFormDialogProps {
  actionName: string;
  title: string;
  children: React.ReactElement;
}

export default function SFormDialog({ children, ...props }: SFormDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SButton onClick={handleClickOpen}>{props.actionName}</SButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <SButton color="error" onClick={handleClose}>
            Hủy
          </SButton>
          <SButton onClick={handleClose}>Lưu</SButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
