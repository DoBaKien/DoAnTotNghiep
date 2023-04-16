import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleIcon from "@mui/icons-material/People";

import ReportIcon from "@mui/icons-material/Report";
import { useContext } from "react";
import { ThemeUseContext } from "../Darkmode/ThemeUseContext.js";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import logo from "../../Assert/Img/logo.png";
function LeftAdmin() {
  const BoxSide = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
    border: "1px solid gray",
    borderRadius: 20,
    height: "95vh",
    marginTop:10
  }));

  const context = useContext(ThemeUseContext);
  const navigate = useNavigate();
  const handleDB = () => {
    navigate("/admin");
  };
  const handleTags = () => {};
  const handleUsers = () => {};
  const handleUser = () => {
    navigate("/manageruser");
  };

  return (
    <BoxSide>
      <Box p={1} sx={{ width: 240 }}>
        <Box>
          <List>
            <Box
              component="img"
              sx={{
                height: 50,
                width: 200,
                cursor: "pointer",
                marginBottom: 5,
              }}
              alt="logo"
              src={logo}
            />
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleDB}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Bảng điều khiển" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleUser}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Người Dùng" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleTags}>
                <ListItemIcon>
                  <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Câu hỏi" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleUsers}>
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Thẻ" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleUsers}>
                <ListItemIcon>
                  <ReportIcon />
                </ListItemIcon>
                <ListItemText primary="Quản Lý Báo Cáo" />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Box>
    </BoxSide>
  );
}

export default LeftAdmin;
