import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  BoxAbout,
  BoxHome,
  BoxList,
  BoxName,
  StackContent,
  BoxContent,
  BoxTag,
} from "../../Assert/Style";
import Header from "../../Component/Header/Header";
import { BoxDetails, BoxText, BoxTitle, StackPost, TypographyTitle } from "../Home/Style";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";
import { BoxPost } from "./Style";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigation = useNavigate();
  const handleFollow = () => {
    navigation("/follow");
  };
  const handleEditPage = () => {
    navigation("/editpf");
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
            <Button variant="outlined" onClick={handleEditPage}>
              Edit Profile
            </Button>
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
                    <ListItemButton>
                      <ListItemIcon>
                        <QuestionAnswerIcon />
                      </ListItemIcon>
                      <ListItemText primary="Question" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleFollow}>
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
          {Array.from(Array(6)).map((_, i) => (
            <StackPost
              key={i}
              direction="row"
              spacing={2}
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ display: { xs: "none", lg: "block" } }}
                />
              }
            >
              <BoxDetails sx={{ display: { xs: "none", lg: "block" } }}>
                <BoxText>
                  <Typography>1 vote</Typography>
                </BoxText>
                <BoxText>
                  <Typography>1 answer</Typography>
                </BoxText>
                <BoxText>
                  <Typography>1 view</Typography>
                </BoxText>
              </BoxDetails>

              <BoxTitle>
                <TypographyTitle component="div" className="title">
                  SQL Error mismatched input 'sql_query' expecting when using
                  Create Table in Pyspark SQL Error mismatched input 'sql_query'
                  expecting when using Create Table in Pyspark SQL Error
                  mismatched input 'sql_query' expecting when using Create Table
                  in Pyspark
                </TypographyTitle>
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  sx={{ marginTop: 1 }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      width: "100%",
                      alignItems: "center",
                      marginBottom: 2,
                      marginTop: 1,
                    }}
                  >
                    {Array.from(Array(3)).map((_, i) => (
                      <BoxTag key={i}>
                        <Typography variant="body2">asd {i}</Typography>
                      </BoxTag>
                    ))}
                  </Stack>
                </Stack>
              </BoxTitle>
            </StackPost>
          ))}
        </BoxPost>
      </Stack>
    </BoxHome>
  );
}

export default Profile;
