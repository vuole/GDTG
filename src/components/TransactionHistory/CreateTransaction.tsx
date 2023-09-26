import styled from "styled-components";
import SFormDialog from "../FormDialog/SFormDialog";
import STextField from "../TextField/STextField";
import { useEffect, useMemo, useState } from "react";
import UserService from "../../services/UserService";
import { useDebounce } from "../../hooks/useDebounce";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { User } from "../../types/type";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";

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
  const [keyword, setKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Array<User>>([]);
  const [name, setName] = useState<string>("");
  const [adminB, setAdminB] = useState<User>({});

  const searchQuery = useDebounce(keyword, 1000);
  const isErrorForm = useMemo(() => {
    return !name || Object.keys(adminB).length <= 0;
  }, [name, adminB]);

  useEffect(() => {
    if (searchQuery) {
      UserService.findUser(searchQuery).then((res) => {
        setSearchResult(res);
      });
    } else {
      setSearchResult([]);
    }
  }, [searchQuery]);

  const createTransation = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    UserService.createTransaction(
      { name, adminB: adminB._id || "" },
      currentUser.jwt
    ).then((res) => {
      props.setRefresh(!props.refresh);
    });
  };

  return (
    <SFormDialog
      actionName="Tạo Giao Dịch"
      title="Tạo Giao Dịch"
      isError={isErrorForm}
      onSave={createTransation}
      onCancel={() => {}}
    >
      <Wrapper>
        <STextField
          label="Tên giao dịch"
          fullWidth
          sx={{ marginTop: "5px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          isEmty={!name}
        />
        <STextField
          placeholder="Nhập email hoặc số điện thoại để tìm kiếm người dùng..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          InputProps={{
            startAdornment:
              Object.keys(adminB).length > 0 ? (
                <InputAdornment position="start">
                  <Chip avatar={<Avatar>A</Avatar>} label={adminB.name} />
                </InputAdornment>
              ) : undefined,
          }}
        />
        <List
          dense
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "250px",
            overflowY: "auto",
          }}
        >
          {searchResult.map((value) => {
            return (
              <ListItem
                key={value._id}
                disablePadding
                onClick={(e) => {
                  setAdminB(value);
                  setKeyword("");
                }}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>A</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={value.name}
                    secondary={`${value.email} (${value.phone})`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Wrapper>
    </SFormDialog>
  );
}
