import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { BoxList } from "../../Assert/Style";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";
import My from "./My";
import Save from "./Save";
import Tag from "./Tag";
import { signOut } from "firebase/auth";
import { auth } from "../../Assert/Config";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../../Component/Auth/AuthContext";

function LeftSide(props) {
  const { test, setTest } = useContext(AuthContext);
  const handleFollow = () => {
    props.setPage(<My id={props.id} />);
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setTest(!test);
        Cookies.remove("sessionCookie");
        localStorage.removeItem("id");

        // if (role === "Admin") {
        //   window.location.reload();
        // }
      })
      .catch((error) => {
        console.log("dx lỗi");
      });
  };
  return (
    <BoxList>
      <Box sx={{ flex: { xl: 1, md: 2, sm: 2, xs: 1 } }}>
        <Box p={2} sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            sx={{
              border: "1px solid gray",
              padding: 2,
              borderRadius: 10,
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleFollow}>
                  <ListItemIcon>
                    <QuestionAnswerIcon />
                  </ListItemIcon>
                  <ListItemText primary="Câu hỏi" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => props.setPage(<Save id={props.id} />)}
                >
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Theo dõi" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => props.setPage(<Tag id={props.id} />)}
                >
                  <ListItemIcon>
                    <LocalOfferIcon />
                  </ListItemIcon>
                  <ListItemText primary="Thẻ" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Đăng xuất" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box
          flex={0.1}
          sx={{
            display: { md: "none", xs: "block" },
          }}
        >
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <List style={{ width: "50px" }}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleFollow}>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => props.setPage(<Save id={props.id} />)}
                >
                  <ListItemIcon>
                    <QuestionAnswerIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => props.setPage(<Tag id={props.id} />)}
                >
                  <ListItemIcon>
                    <LocalOfferIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </BoxList>
  );
}

export default LeftSide;
