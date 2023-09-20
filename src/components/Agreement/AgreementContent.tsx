import Button from "@mui/material/Button";
import { useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";

const Container = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
`;
const AgrContent = styled.div`
  height: 80%;
`;
const AgrAction = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const AgrActionTop = styled.div`
  height: 60%;
  display: flex;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AgrActionBottom = styled.div`
  flex: 1;
  display: flex;
  border: 1px solid #ccc;
  div {
    flex: 1;
    border-right: 1px solid #ccc;
  }
`;

const AgreementContent = () => {
  const [value, setValue] = useState("");

  return (
    <Container>
      <AgrContent>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          style={{ height: "calc(100% - 42px)" }}
        />
      </AgrContent>
      <AgrAction>
        <AgrActionTop>
          <Center style={{ flex: 1 }}>
            <Button
              variant="contained"
              style={{ width: "200px", textTransform: "unset" }}
            >
              Bên A Xác Nhận Đồng Ý
            </Button>
          </Center>
          <Center style={{ flex: 1 }}>
            <Button
              variant="contained"
              style={{ width: "200px", textTransform: "unset" }}
            >
              Bên B Xác Nhận Đồng Ý
            </Button>
          </Center>
        </AgrActionTop>
        <AgrActionBottom>
          <Center>Đã Đặt Cọc</Center>
          <Center>Đã Giao Hàng</Center>
          <Center>Đã Nhận hàng</Center>
          <Center>Hoàn Thành Giao Dịch</Center>
        </AgrActionBottom>
      </AgrAction>
    </Container>
  );
};

export default AgreementContent;
