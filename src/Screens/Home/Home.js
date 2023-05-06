import {
  Box,
  Typography,
  Avatar,
  IconButton,
  InputBase,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddLinkIcon from "@mui/icons-material/AddLink";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {
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
} from "./Style";
import { BoxHome, BoxTag } from "../../Assert/Style";
import { useNavigate } from "react-router-dom";
import "../../Assert/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState("");
  useEffect(() => {
    axios
      .get("/question/getAllQuestionDTO")
      .then(function (response) {
        setQuestions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleCreate = () => {
    navigate("/create");
  };
  const handleTag = (id) => {
    navigate(`/tagdetail/${id}`);
  };
  const handlePost = (id) => {
    navigate(`/post/${id}`);
  };
  const post = () => {
    if (questions && questions.length > 0) {
      return (
        <BoxContent>
          {questions.map((q, i) => (
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
                  <Typography>{q.questionVote} phiếu</Typography>
                </BoxText>
                <BoxText>
                  <Typography>{q.answerCount} trả lời</Typography>
                </BoxText>
                <BoxText>
                  <Typography>1 xem</Typography>
                </BoxText>
              </BoxDetails>

              <BoxTitle>
                <TypographyTitle
                  component="div"
                  className="title"
                  onClick={() => handlePost(q.question.qid)}
                  variant="h5"
                >
                  {q.question.title}
                </TypographyTitle>
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  sx={{ marginTop: 1 }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ width: "100%", alignItems: "center" }}
                  >
                    {q.tags.map((t, i) => (
                      <BoxTag key={i} onClick={() => handleTag(t.tid)}>
                        <Typography variant="body2">{t.name}</Typography>
                      </BoxTag>
                    ))}
                  </Stack>
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
      <Header />
      <StackContent direction="row" sx={{ marginTop: 2 }}>
        <LeftSide></LeftSide>
        <Box>
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
                onClick={handleCreate}
              />
            </CrePost>
            <IconButton
              onClick={handleCreate}
              sx={{ display: { xs: "block", lg: "none" } }}
            >
              <PostAddIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={handleCreate}>
              <InsertPhotoIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={handleCreate}>
              <AddLinkIcon fontSize="large" />
            </IconButton>
          </StackCreate>
          {post()}
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default Home;
