import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  BoxDetails,
  BoxText,
  BoxTitle,
  StackName,
  StackPost,
  TypographyTitle,
} from "../Home/Style";
import { BoxPost } from "./Style";
import { BoxTag } from "../../Assert/Style";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function My(props) {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get(`/question/getQuestionDTOByUid/${props.id}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.id]);

  const post = () => {
    if (data && data.length > 0) {
      return (
        <>
          {Array.from(data).map((q, i) => (
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
                  sx={{ marginTop: 1 }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ width: "100%", alignItems: "center" }}
                  >
                    {q.tags.map((t, i) => (
                      <Link
                        to={`/tagdetail/${t.tid}`}
                        key={i}
                        style={{ textDecoration: "none" }}
                      >
                        <BoxTag>
                          <Typography variant="body2">{t.name}</Typography>
                        </BoxTag>
                      </Link>
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
        </>
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

  return <BoxPost>{post()}</BoxPost>;
}

export default memo(My);
