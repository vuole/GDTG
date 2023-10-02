import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SButton from "../Button/SButton";

interface SFormDialogProps {
  children: React.ReactElement;
  title: string;
  isError: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave(): void;
}

export default function SFormDialog({ children, ...props }: SFormDialogProps) {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      sx={{
        "& .MuiList-root": { paddingBottom: "0px", paddingTop: "0px" },
      }}
      open={props.open}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle sx={{ marginBottom: "0px" }}>{props.title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          paddingBottom: "16px",
        }}
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
  );
}
