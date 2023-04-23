import {
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";

import { StackHeader, Search } from "./Style";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Logout, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { ThemeUseContext } from "../Darkmode/ThemeUseContext";
import { MaterialUISwitch } from "../Header/Style";
import { auth } from "../../Assert/Config";
import Cookies from "js-cookie";
function Header({ show, setShow }) {
  const navigate = useNavigate();
  const context = useContext(ThemeUseContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlelogout = () => {
    auth.signOut();
    Cookies.remove("sessionCookie");
    localStorage.removeItem("id");
    setAnchorEl(null);
    navigate("/login");
  };
  const handlePf = () => {};

  return (
    <StackHeader direction="row" color={"text.primary"} spacing={2}>
      <IconButton onClick={() => setShow(!show)}>
        <MenuIcon />
      </IconButton>
      <Search>
        <InputBase
          sx={{ ml: 2, flex: 1, fontSize: 22 }}
          fullWidth
          placeholder="Tìm kiếm..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Search>
      <Stack direction="row" sx={{ paddingRight: 10 }}>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Tài khoản">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          // onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handlePf}>
            <Avatar /> Trang cá nhân
          </MenuItem>
          <MenuItem sx={{ justifyContent: "center" }}>
            Chế độ tối
            <FormControlLabel
              control={<MaterialUISwitch defaultChecked />}
              onChange={context.toggle}
              sx={{ paddingLeft: 2 }}
            />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Cài đặt
          </MenuItem>
          <MenuItem onClick={handlelogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>
        </Menu>
      </Stack>
    </StackHeader>
  );
}

export default Header;