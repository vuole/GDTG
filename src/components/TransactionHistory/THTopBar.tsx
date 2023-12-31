import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import styled from "styled-components";
import logo from "../../assets/logo.png";

export const Logo = styled.img`
  width: 70px;
  height: 70px;
`;

export default function THTopBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    await UserService.logout(currentUser.jwt).then((res) => {
      localStorage.removeItem("currentUser");
      navigate("/login");
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "linear-gradient(90deg, #0095C5 0%, #0DB966 100%)" }}
      >
        <Toolbar>
          {/* <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}
          <Link to={"/"}>
            <Logo src={logo} />
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trung Gian Giao Dịch
          </Typography>
          <div>
            <IconButton color="inherit" sx={{ marginRight: "-10px" }}>
              <div style={{ fontSize: "14px" }}>0 VNĐ</div>
            </IconButton>
            <IconButton size="large" color="inherit">
              <AccountBalanceWalletIcon />
            </IconButton>
            <IconButton size="large" color="inherit">
              <NotificationsNoneIcon />
            </IconButton>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={(e) => {
                  handleClose();
                  navigate("/profile");
                }}
              >
                Thông tin tài khoản
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  handleClose();
                  navigate("/password-change");
                }}
              >
                Đổi mật khẩu
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  handleClose();
                  logout();
                }}
              >
                Đăng xuất
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
