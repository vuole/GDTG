import { Button, ButtonProps } from "@mui/material";

const SButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant="contained" style={{ textTransform: "unset" }} {...props}>
      {children}
    </Button>
  );
};

export default SButton;
