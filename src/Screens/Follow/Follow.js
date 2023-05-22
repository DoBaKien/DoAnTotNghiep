import {
  Box,
  Typography,
  Avatar,
  IconButton,
  InputBase,
  Stack,
  Divider,
  CircularProgress,
  Grid,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddLinkIcon from "@mui/icons-material/AddLink";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {
  BtnToTop,
  BoxContent,
  BoxDetails,
  BoxText,
  BoxTitle,
  CrePost,
  StackContent,
  StackCreate,
  StackName,
  StackPost,
  StyledBadge,
  TypographyTitle,
} from "../Home/Style";
import { BoxHome, BoxTag } from "../../Assert/Style";
import CheckIcon from "@mui/icons-material/Check";
import "../../Assert/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [questions, setQuestions] = useState("");
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });

    axios
      .get("/question/getQuestionDTOByUserTag")
      .then(function (response) {
        setQuestions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const post = () => {
    if (questions && questions.length > 0) {
      return (
        <BoxContent>
          {questions.map((q, i) => (
            <StackPost
              key={i}
              direction="row"
              spacing={1}
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
                  <Typography>{q.questionVote} phiếu</Typography>
                </BoxText>
                <BoxText
                  gap={1}
                  bgcolor={q.acceptAnswerAvailable === true ? "#66FF66" : ""}
                  color={
                    q.acceptAnswerAvailable === true ? "black" : "text.primary"
                  }
                  sx={{
                    border: q.acceptAnswerAvailable ? `2px solid gray` : "",
                  }}
                >
                  {q.acceptAnswerAvailable ? (
                    <>
                      <CheckIcon />
                    </>
                  ) : (
                    <></>
                  )}
                  <Typography>{q.answerCount} trả lời</Typography>
                </BoxText>

                <BoxText>
                  <Typography>1 xem</Typography>
                </BoxText>
              </BoxDetails>

              <BoxTitle>
                <Link
                  to={`/post/${q.question.qid}`}
                  style={{ textDecoration: "none" }}
                >
                  <TypographyTitle
                    component="div"
                    className="title"
                    variant="h5"
                    color={"text.primary"}
                  >
                    {q.question.title}
                  </TypographyTitle>
                </Link>
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  sx={{ marginTop: 1, justifyContent: "space-between" }}
                >
                  <Grid
                    container
                    spacing={1}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {Array.from(q.tags).map((t, index) => (
                      <Grid item xs={2} sm={2} md={2} key={index}>
                        <BoxTag>
                          <Typography variant="body2">{t.name}</Typography>
                        </BoxTag>
                      </Grid>
                    ))}
                  </Grid>
                  <StackName
                    direction="row"
                    spacing={2}
                    sx={{
                      marginTop: { xs: 1, lg: 0 },
                      marginBottom: { xs: 1, lg: 0 },
                    }}
                  >
                    <Avatar
                      alt="Avatar"
                      src={q.user.avatar || q.user.name}
                      sx={{ width: 35, height: 35 }}
                    />

                    <Typography>{q.user.name}</Typography>
                  </StackName>
                </Stack>
              </BoxTitle>
            </StackPost>
          ))}
        </BoxContent>
      );
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            height: "81vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
  };
  return (
    <BoxHome color={"text.primary"}>
      {backToTop && (
        <BtnToTop onClick={scrollUp}>
          <NavigationIcon />
        </BtnToTop>
      )}

      <Header />
      <StackContent direction="row" sx={{ marginTop: 2 }}>
        <LeftSide></LeftSide>
        <Box>
          <Link to="/create">
            <StackCreate direction="row" spacing={{ xs: 1, lg: 2 }}>
              <Box>
                <IconButton>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
                  </StyledBadge>
                </IconButton>
              </Box>

              <CrePost sx={{ display: { xs: "none", lg: "block" } }}>
                <InputBase
                  sx={{ ml: 2, flex: 1, fontSize: 22 }}
                  fullWidth
                  placeholder="Đặt câu hỏi"
                />
              </CrePost>

              <IconButton sx={{ display: { xs: "block", lg: "none" } }}>
                <PostAddIcon fontSize="large" />
              </IconButton>
              <IconButton>
                <InsertPhotoIcon fontSize="large" />
              </IconButton>
              <IconButton>
                <AddLinkIcon fontSize="large" />
              </IconButton>
            </StackCreate>
          </Link>
          {post()}
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default Home;
