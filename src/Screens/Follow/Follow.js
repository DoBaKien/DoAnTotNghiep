import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  BoxHome,
  BoxAbout,
  BoxContent,
  BoxList,
  BoxName,
  StackContent,
  PaperUser,
} from "../../Assert/Style";
import Header from "../../Component/Header/Header";

import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";
import { BoxPost } from "./Style";
import { useNavigate } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function Follow() {
  const navigation = useNavigate();
  const handleQUestion = () => {
    navigation("/profile");
  };
  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <BoxContent>
        <StackContent direction={{ xs: "column", lg: "row" }}>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Avatar sx={{ width: 100, height: 100 }}>A</Avatar>
          </Box>
          <BoxName>
            <Typography
              variant="h5"
              sx={{
                display: { lg: "none", xs: "block" },
                textAlign: { lg: "start", xs: "center" },
              }}
            >
              Nameasdasdsaddasasd
            </Typography>
            <Typography
              variant="h3"
              sx={{ display: { lg: "block", xs: "none" } }}
            >
              Nameasdasdsaddasasd
            </Typography>
            <Typography sx={{ textAlign: { lg: "start", xs: "center" } }}>
              Location
            </Typography>
          </BoxName>
          <Box
            sx={{
              width: "100%",
              height: 40,
              display: "flex",
              justifyContent: { lg: "end", xs: "center" },
            }}
          >
            <Button variant="outlined">Edit Profile</Button>
          </Box>
        </StackContent>
      </BoxContent>

      <BoxContent sx={{ marginTop: 3 }}>
        <BoxAbout>
          <Typography variant="h5">About me</Typography>
          <Typography>
            Karakai Jouzu no Takagi-san dựa trên tác phẩm cùng tên, nói về
            Takagi và con gái cô ấy, Chi. mang đến có các bạn những câu chuyện
            thường ngày châm chọc hài hước, liều rằng người bố có xuất hiện hay
            không.....?
          </Typography>
        </BoxAbout>
      </BoxContent>
      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        <BoxList>
          <Box sx={{ flex: { xl: 1, md: 2, sm: 2, xs: 1 } }}>
            <Box p={2} sx={{ display: { xs: "none", md: "block" } }}>
              <Box
                sx={{
                  border: "1px solid gray",
                  padding: 1,
                  borderRadius: 10,
                }}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleQUestion}>
                      <ListItemIcon>
                        <QuestionAnswerIcon />
                      </ListItemIcon>
                      <ListItemText primary="Question" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Follow" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LocalOfferIcon />
                      </ListItemIcon>
                      <ListItemText primary="Tags" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Log out" />
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
                    <ListItemButton>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <QuestionAnswerIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LocalOfferIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
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
        <BoxPost>
          <Grid2
            container
            spacing={{ xs: 1, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(20)).map((_, index) => (
              <Grid2 xs={4} sm={4} md={4} key={index}>
                <PaperUser>
                  <Stack direction="row" spacing={2}>
                    <Box
                      sx={{
                        width: 50,
                        height: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar sx={{ width: 50, height: 50 }}>A</Avatar>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: 60,
                      }}
                    >
                      <Typography sx={{ marginBottom: 1 }}>Name</Typography>
                      <Typography>Loacation</Typography>
                    </Box>
                  </Stack>
                </PaperUser>
              </Grid2>
            ))}
          </Grid2>
        </BoxPost>
      </Stack>
    </BoxHome>
  );
}

export default Follow;
