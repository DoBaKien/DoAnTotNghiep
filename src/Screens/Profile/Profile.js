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
import {
  BoxDetails,
  BoxText,
  BoxTitle,
  StackPost,
  TypographyTitle,
} from "../Home/Style";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";
import { BoxPost } from "./Style";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../Component/Auth/AuthContext";
import axios from "axios";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const id = useParams();

  const [data, setData] = useState("");
  const navigation = useNavigate();
  const handleFollow = () => {
    navigation("/follow");
  };
  const handleEditPage = () => {
    navigation(`/editpf/${id.id}`);
  };
  useEffect(() => {
    axios
      .get(`/user/findByUid/${id.id}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const btnEdit = () => {
    if (id.id === currentUser) {
      return (
        <>
          <Button variant="outlined" onClick={handleEditPage}>
            Chỉnh sửa
          </Button>
        </>
      );
    }
  };

  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <BoxContent>
        <StackContent
          direction={{ xs: "column", lg: "row" }}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Stack direction={{ xs: "column", lg: "row" }}>
            <Box
              sx={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Avatar
                alt="Avatar"
                src={data.avatar || data.name}
                sx={{ width: 100, height: 100 }}
              />
            </Box>
            <BoxName sx={{ paddingLeft: { lg: 5, xs: 0 } }}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: { lg: "start", xs: "center" },
                }}
              >
                {data.name}
              </Typography>
              <Typography sx={{ textAlign: { lg: "start", xs: "center" } }}>
                {data.location}
              </Typography>
            </BoxName>
          </Stack>
          <Box
            sx={{
              height: 40,
              display: "flex",
              justifyContent: { lg: "end", xs: "center" },
            }}
          >
            {btnEdit()}
          </Box>
        </StackContent>
      </BoxContent>

      <BoxContent sx={{ marginTop: 3 }}>
        <BoxAbout>
          <Typography variant="h5">Về bản thân</Typography>
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
                      <ListItemText primary="Câu hỏi" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleFollow}>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Theo dõi" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LocalOfferIcon />
                      </ListItemIcon>
                      <ListItemText primary="Thẻ" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
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
                  <Typography>1 phiếu</Typography>
                </BoxText>
                <BoxText>
                  <Typography>1 trả lời</Typography>
                </BoxText>
                <BoxText>
                  <Typography>1 xem</Typography>
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
