import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import { BoxSide } from "./Style.js";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import MessageIcon from "@mui/icons-material/Message";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { useContext } from "react";
import { ThemeUseContext } from "../Darkmode/ThemeUseContext.js";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
function LeftSide() {
  const context = useContext(ThemeUseContext);
  return (
    <BoxSide>
      <Box sx={{ flex: { xl: 1, md: 2, sm: 2, xs: 1 } }}>
        <Box p={2} sx={{ display: { xs: "none", lg: "block" } }}>
          <Box position="fixed">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Question" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LeaderboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tags" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MessageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </ListItem>
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
        <Box flex={0.1} sx={{ display: { lg: "none", xs: "block" } }}>
          <Box position="fixed">
            <List style={{ width: "50px" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LeaderboardIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MessageIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InsertPhotoIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
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
