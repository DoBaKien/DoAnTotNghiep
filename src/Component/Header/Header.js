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
  Tooltip,
} from "@mui/material";
import { memo, useContext, useEffect, useState } from "react";
import { ThemeUseContext } from "../Darkmode/ThemeUseContext";
import { MaterialUISwitch, StackHeader, Search, BtnLogin } from "./Style";
import logo from "../../Assert/Img/logo.png";
import logo2 from "../../Assert/Img/logo2.png";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Logout, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../Auth/AuthContext";
import { auth } from "../../Assert/Config";
import axios from "axios";
import { signOut } from "firebase/auth";

function Header() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const context = useContext(ThemeUseContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const cookie = Cookies.get("sessionCookie");
  const [data, setData] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const findByUid = async () => {
      try {
        const response = await axios.get(`/user/findByUid/${currentUser}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser !== "") {
      findByUid();
    }
  }, [currentUser]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFind = () => {
    navigate(`/find/${text}`);
  };

  const handlelogout = () => {
    signOut(auth)
      .then(() => {
        Cookies.remove("sessionCookie");
        localStorage.removeItem("id");
        setAnchorEl(null);
        window.location.reload();
      })
      .catch((error) => {
        console.log("dx lỗi");
      });
  };
  const handlePf = () => {
    navigate(`/profile/${currentUser}`);
    setAnchorEl(null);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSetting = () => {
    navigate("/setting");
    setAnchorEl(null);
  };
  const CheckAuth = () => {
    if (cookie === undefined) {
      return (
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <BtnLogin
            variant="contained"
            onClick={handleLogin}
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            Đăng nhập
          </BtnLogin>
          <Tooltip title="Đăng nhập">
            <IconButton
              variant="contained"
              onClick={handleLogin}
              sx={{ display: { xs: "block", lg: "none" } }}
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {data.avatar !== null ? (
                <Avatar
                  alt="Avatar"
                  src={data.avatar}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <Avatar>V</Avatar>
              )}
            </IconButton>
          </Tooltip>
        </Box>
      );
    }
  };

  return (
    <StackHeader direction="row" color={"text.primary"} spacing={2}>
      <Box
        component="img"
        sx={{
          display: { xs: "none", lg: "block" },
          height: 50,
          width: 200,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
        alt="logo"
        src={logo}
      />
      <Box
        component="img"
        sx={{
          display: { xs: "block", lg: "none" },
          height: 50,
          width: 50,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
        alt="logo"
        src={logo2}
      />

      <Search>
        <InputBase
          sx={{ ml: 2, flex: 1, fontSize: 22 }}
          fullWidth
          placeholder="Tìm kiếm..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFind();
            }
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Search>

      <IconButton>
        <NotificationsIcon />
      </IconButton>
      {CheckAuth()}

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
          {data.avatar !== null ? (
            <Avatar alt="Avatar" src={data.avatar} />
          ) : (
            <Avatar>V</Avatar>
          )}
          Trang cá nhân
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
        <MenuItem onClick={handleSetting}>
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
    </StackHeader>
  );
}

export default memo(Header);
