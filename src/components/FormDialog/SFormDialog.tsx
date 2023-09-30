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
      <SButton onClick={handleClickOpen} color="info">
        {props.actionName}
      </SButton>
      <Dialog
        sx={{
          "& .MuiList-root": { paddingBottom: "0px", paddingTop: "0px" },
        }}
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle sx={{ marginBottom: "0px" }}>{props.title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
        >
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
