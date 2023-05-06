import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";

import { BoxContent, StackContent } from "./Style";
import { BoxHome, BoxTag } from "../../Assert/Style";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BlockIcon from "@mui/icons-material/Block";
import "../Tags/Tags.css";
import {
  BoxDetails,
  BoxText,
  BoxTitle,
  StackName,
  StackPost,
  TypographyTitle,
} from "../Home/Style";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function TagDetails() {
  const { tid } = useParams();
  const [tagD, setTagD] = useState("");
  const [tagID, setTagID] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/question/getQuestionDTOByTag/${tid}`)
      .then(function (response) {
        setTagD(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`/tag/getTagByTid/${tid}`)
      .then(function (response) {
        setTagID(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [tid]);
  const handlePost = (id) => {
    navigate(`/post/${id}`);
  };
  const handleTag = (id) => {
    navigate(`/tagdetail/${id}`);
  };
  const post = () => {
    if (tagD && tagD.length > 0) {
      return (
        <BoxContent>
          {tagD.map((q, i) => (
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
      <StackContent direction="row">
        <LeftSide></LeftSide>
        <BoxContent sx={{ width: { xs: "100vw", lg: "60vw" } }}>
          <Typography variant="h4">Câu hỏi gắn thẻ {tagID.name}</Typography>
          <Box sx={{ width: "50vw", marginTop: 2 }}>
            <Typography>{tagID.description}</Typography>
          </Box>
          <Stack direction="row" sx={{ marginTop: 3 }}>
            <Button
              variant="contained"
              sx={{ marginRight: 5 }}
              startIcon={<RemoveRedEyeIcon />}
            >
              Follow
            </Button>
            <Button variant="outlined" startIcon={<BlockIcon />}>
              ingore
            </Button>
          </Stack>
          <Box sx={{ marginTop: 3, marginBottom: 5 }}>
            <BoxContent>{post()}</BoxContent>
          </Box>
        </BoxContent>
      </StackContent>
    </BoxHome>
  );
}

export default TagDetails;
