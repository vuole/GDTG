import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";

interface StyledButtonProps extends ButtonProps {
  children: ReactElement | string;
}

const StyledButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
  textTransform: "none",
  "&.MuiButton-containedPrimary": {
    backgroundColor: "#29BA74",
  },
  "&.MuiButton-containedSecondary": {
    backgroundColor: "#00524e",
  },
}));

export default function SButton({ children, ...props }: StyledButtonProps) {
  return (
    <StyledButton variant="contained" {...props}>
      {children}
    </StyledButton>
  );
}
