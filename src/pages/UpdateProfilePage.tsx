import TextField from "@mui/material/TextField";
import SButton from "../components/Button/SButton";
import styled from "styled-components";
import FormWrapper from "../components/FormWrapper/FormWrapper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Action = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const UpdateProfilePage = () => {
  const [position, setPosition] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value as string);
  };

  return (
    <Container>
      <FormWrapper title="Chỉnh Sửa Hồ Sơ">
        <TextField label="Họ và tên" variant="outlined" />
        <TextField label="Email" variant="outlined" />
        <TextField label="Số điện thoại" variant="outlined" />
        <TextField label="Tên công ty" variant="outlined" />
        <TextField label="Địa chỉ" variant="outlined" />
        <FormControl fullWidth>
          <InputLabel>Chức vụ</InputLabel>
          <Select
            value={position}
            label="Position"
            onChange={handleChange}
          >
            <MenuItem value={10}>A</MenuItem>
            <MenuItem value={20}>B</MenuItem>
            <MenuItem value={30}>C</MenuItem>
          </Select>
        </FormControl>
        <Action>
        <SButton
            color="error"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Hủy
          </SButton>
          <SButton
            type="submit"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Lưu
          </SButton>
        </Action>
      </FormWrapper>
    </Container>
  );
};
export default UpdateProfilePage;
