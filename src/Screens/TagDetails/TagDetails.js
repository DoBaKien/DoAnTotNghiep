import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";

import { BoxContent, StackContent } from "./Style";
import { BoxHome, BoxTag, DateV } from "../../Assert/Style";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import "../../Assert/index.css";
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
import CheckIcon from "@mui/icons-material/Check";
import { useParams } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
function TagDetails() {
  const { tid } = useParams();
  const [tagD, setTagD] = useState("");
  const [tagID, setTagID] = useState("");
  const [fol, setFolTag] = useState("");
  const cookie = Cookies.get("sessionCookie");
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
    axios
      .get(`/user/checkFollowTag/${tid}/${cookie}`)
      .then(function (response) {
        setFolTag(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [tid, cookie]);

  const handleFollow = (value) => {
    axios
      .post(`/user/modifyFollowTag/${tid}/${cookie}`)
      .then(function (response) {
        Swal.fire("Thành công", `${value} thành công`, "success");
        axios
          .get(`/user/checkFollowTag/${tid}/${cookie}`)
          .then(function (response) {
            setFolTag(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const post = () => {
    if (tagD && tagD.length > 0) {
      return (
        <BoxContent>
          {tagD.map((q, i) => (
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
                  <Typography variant="body1">
                    {DateV(q.question.date)}
                  </Typography>
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
      <Header />
      <StackContent direction="row">
        <LeftSide></LeftSide>
        <BoxContent sx={{ width: { xs: "100vw", lg: "60vw" } }}>
          <Typography variant="h4">Câu hỏi gắn thẻ {tagID.name}</Typography>
          <Box sx={{ width: "50vw", marginTop: 2 }}>
            <Typography>{tagID.description}</Typography>
          </Box>
          <Stack direction="row" sx={{ marginTop: 3 }}>
            {fol !== "Following" ? (
              <Button
                variant="contained"
                sx={{ marginRight: 5 }}
                startIcon={<RemoveRedEyeIcon />}
                onClick={() => handleFollow("Theo dõi")}
              >
                Theo dõi
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  sx={{ marginRight: 5 }}
                  startIcon={<VisibilityOffIcon />}
                  onClick={() => handleFollow("Bỏ Theo dõi")}
                >
                  Bỏ Theo dõi
                </Button>
              </>
            )}
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
