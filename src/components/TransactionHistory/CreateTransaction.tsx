import styled from "styled-components";
import SFormDialog from "../FormDialog/SFormDialog";
import STextField from "../TextField/STextField";
import { useEffect, useMemo, useState } from "react";
import UserService from "../../services/UserService";
import { useDebounce } from "../../hooks/useDebounce";
import { User } from "../../types/type";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import SearchResultList from "./SearchResultList";
import Avatar from "@mui/material/Avatar";
import SButton from "../Button/SButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface CreateTransactionProps {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateTransaction(props: CreateTransactionProps) {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Array<User>>([]);
  const [name, setName] = useState<string>("");
  const [adminB, setAdminB] = useState<User>({});
  const [isShowChip, setIsShowChip] = useState(true);

  const searchQuery = useDebounce(keyword, 1000);
  const isErrorForm = useMemo(() => {
    return !name || Object.keys(adminB).length <= 0;
  }, [name, adminB]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (searchQuery) {
      UserService.findUser(searchQuery, currentUser.jwt).then((res) => {
        setSearchResult(res);
      });
    } else {
      setSearchResult([]);
    }
  }, [searchQuery]);

  const resetForm = () => {
    setName("");
    setKeyword("");
    setAdminB({});
  };

  const createTransation = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    UserService.createTransaction(
      { name, adminB: adminB._id || "" },
      currentUser.jwt
    ).then((res) => {
      props.setRefresh(!props.refresh);
    });
  };

  const handleSelectedItem = (value: any) => {
    setIsShowChip(true);
    setAdminB(value);
    setKeyword("");
  };

  return (
    <>
      <SButton
        onClick={(e) => {
          resetForm();
          setOpen(true);
        }}
        color="info"
      >
        Tạo giao dịch
      </SButton>
      <SFormDialog
        title="Tạo Giao Dịch"
        isError={isErrorForm}
        open={open}
        setOpen={setOpen}
        onSave={createTransation}
      >
        <Wrapper>
          <STextField
            label="Tên giao dịch"
            fullWidth
            sx={{ marginTop: "6px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            isEmty={!name}
          />
          <STextField
            placeholder="Tìm kiếm người dùng (Email hoặc số điện thoại)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            InputProps={{
              startAdornment: Object.keys(adminB).length > 0 && isShowChip && (
                <InputAdornment position="start">
                  <Chip
                    avatar={<Avatar>A</Avatar>}
                    label={adminB.name}
                    onDelete={() => {
                      setIsShowChip(false);
                      setAdminB({});
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <SearchResultList
            data={searchResult}
            onSlectedItem={handleSelectedItem}
            fullSubInfo
          />
        </Wrapper>
      </SFormDialog>
    </>
  );
}
