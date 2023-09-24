import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

type STextFieldProps = TextFieldProps & {
  isEmty?: boolean;
};

const STextField = ({ children, ...props }: STextFieldProps) => {
  const [isOnBlur, setIsOnBlur] = useState<boolean>(false);
  return (
    <TextField
      variant="outlined"
      error={isOnBlur && props.isEmty ? true : false}
      helperText={isOnBlur && props.isEmty ? "Trường này là bắt buộc." : ""}
      onBlur={(e) => setIsOnBlur(true)}
      {...props}
    >
      {children}
    </TextField>
  );
};

export default STextField;
