import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "styled-components";

const HelperText = styled.small`
  font-size: 12px;
  color: #d32f2f;
  margin-top: 3px;
  margin-left: 14px;
  letter-spacing: 0.03333em;
`;

type SOutlinedInputProps = OutlinedInputProps & {
  isEmty?: boolean;
};

const PasswordTextField = (props: SOutlinedInputProps) => {
  const [isOnBlur, setIsOnBlur] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel
        htmlFor="outlined-adornment-password"
        error={isOnBlur && props.isEmty ? true : false}
      >
        {props.label}
      </InputLabel>
      <OutlinedInput
        {...props}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        error={isOnBlur && props.isEmty ? true : false}
        onBlur={(e) => setIsOnBlur(true)}
      />
      {isOnBlur && props.isEmty && (
        <HelperText>Trường này là bắt buộc.</HelperText>
      )}
    </FormControl>
  );
};

export default PasswordTextField;
