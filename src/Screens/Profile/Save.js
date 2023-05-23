import { Avatar, Divider, Grid, Stack, Typography } from "@mui/material";
import {
  BoxDetails,
  BoxText,
  BoxTitle,
  StackName,
  StackPost,
  TypographyTitle,
} from "../Home/Style";
import { BoxPost } from "./Style";
import { BoxTag, DateV } from "../../Assert/Style";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import Cookies from "js-cookie";

function Save() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(`/user/getUserSavedQuestion/${Cookies.get("sessionCookie")}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <BoxPost
      sx={{
        width: "60vw",
      }}
    >
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
              <Typography variant="body1">{DateV(q.question.date)}</Typography>
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
              <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(q.tags).map((t, index) => (
                  <Grid item xs={2} sm={2} md={2} key={index}>
                    <Link
                      to={`/tagdetail/${t.tid}`}
                      style={{ textDecoration: "none" }}
                    >
                      <BoxTag>
                        <Typography variant="body2">{t.name}</Typography>
                      </BoxTag>
                    </Link>
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
    </BoxPost>
  );
}

export default memo(Save);
