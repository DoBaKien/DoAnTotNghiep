import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleIcon from "@mui/icons-material/People";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { useContext } from "react";
import { ThemeUseContext } from "../Darkmode/ThemeUseContext.js";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { AuthContext } from "../Auth/AuthContext.js";

function LeftSide() {
  const BoxSide = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
    width: 220,
    marginRight: 20,
    minWidth: 60,
    border: "1px solid gray",
    borderRadius: 20,
    minHeight: "90vh",
  }));

  const { role } = useContext(AuthContext);
  const context = useContext(ThemeUseContext);
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const handleTags = () => {
    navigate("/tags");
  };
  const handleUsers = () => {
    navigate("/users");
  };
  const handleAdmin = () => {
    navigate("/admin");
  };
  const handleFollow = () => {
    navigate("/follow");
  };

  return (
    <BoxSide>
      <Box sx={{ flex: { xl: 1, md: 2, sm: 2, xs: 1 } }}>
        <Box p={2} sx={{ display: { xs: "none", lg: "block" } }}>
          <Box
            position="fixed"
            sx={{
              border: "1px solid gray",
              padding: 1,
              borderRadius: 10,
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleHome}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Trang chủ" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleFollow}>
                  <ListItemIcon>
                    <QuestionAnswerIcon />
                  </ListItemIcon>
                  <ListItemText primary="Theo dõi" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleTags}>
                  <ListItemIcon>
                    <LocalOfferIcon />
                  </ListItemIcon>
                  <ListItemText primary="Thẻ" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleUsers}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Người dùng" />
                </ListItemButton>
              </ListItem>

              {role === "Admin" ? (
                <ListItem disablePadding>
                  <ListItemButton onClick={handleAdmin}>
                    <ListItemIcon>
                      <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary=" Admin" />
                  </ListItemButton>
                </ListItem>
              ) : (
                <></>
              )}

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ModeNightIcon />
                  </ListItemIcon>
                  <Switch onChange={context.toggle} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box
          flex={0.1}
          sx={{
            display: { lg: "none", xs: "flex" },
            justifyContent: "center",
          }}
        >
          <Box position="fixed">
            <List style={{ width: "50px" }}>
              <ListItem disablePadding>
                <ListItemButton onClick={handleHome}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleFollow}>
                  <ListItemIcon>
                    <QuestionAnswerIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleTags}>
                  <ListItemIcon>
                    <LocalOfferIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleUsers}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              {role === "Admin" ? (
                <ListItem disablePadding>
                  <ListItemButton onClick={handleAdmin}>
                    <ListItemIcon>
                      <AdminPanelSettingsIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              ) : (
                <></>
              )}
              <ListItem disablePadding>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={context.toggle}
                  color="inherit"
                >
                  {localStorage.getItem("mode") === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </BoxSide>
  );
}

export default LeftSide;
