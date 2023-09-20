import TextField from "@mui/material/TextField";
import styled from "styled-components";

const Container = styled.div`
  width: 20%;
  height: 100%;
  border: 1px solid #ccc;
  padding: 5px;
`;
const MemberSearching = styled.div``;
const MemberShow = styled.div`
  margin-top: 10px;
  ol {
    margin-left: 20px;
  }
`;

interface AgreementMembersProps {
  title: string;
  isLeft?: boolean;
}

const AgreementMembers = (props: AgreementMembersProps) => {
  return (
    <Container>
      <MemberSearching>
        <p>Tìm kiếm thành viên:</p>
        <TextField variant="outlined" size="small" fullWidth />
      </MemberSearching>
      <MemberShow>
        <p>{props.title}</p>
        <ol>
          <li>Nguyen Van A</li>
          <li>Nguyen Van B</li>
        </ol>
      </MemberShow>
    </Container>
  );
};

export default AgreementMembers;
