import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SButton from "../Button/SButton";

interface SFormDialogProps {
  children: React.ReactElement;
  actionName: string;
  title: string;
  isError: boolean;
  onSave(): void;
  onCancel(): void;
}

export default function SFormDialog({ children, ...props }: SFormDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.onCancel();
    setOpen(false);
  };

  return (
    <div>
      <SButton onClick={handleClickOpen} color="secondary">{props.actionName}</SButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ marginBottom: "10px" }}>{props.title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <SButton
            color="error"
            onClick={(e) => {
              handleClose();
            }}
          >
            Hủy
          </SButton>
          <SButton
            onClick={(e) => {
              handleClose();
              props.onSave();
            }}
            disabled={props.isError}
          >
            Lưu
          </SButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
