import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  BoxDetails,
  BoxText,
  BoxTitle,
  StackPost,
  TypographyTitle,
} from "../Home/Style";
import { BoxPost } from "./Style";
import { BoxTag, DateV } from "../../Assert/Style";
import { memo, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { AuthContext } from "../../Component/Auth/AuthContext";

function My(props) {
  const { currentUser } = useContext(AuthContext);

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
                  sx={{ marginTop: 1 }}
                >
                  <Grid
                    container
                    spacing={1}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
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

  return (
    <BoxPost
      sx={{
        width: currentUser === props.id ? "60vw" : "81vw",
        paddingRight: currentUser === props.id ? 0 : 2,
      }}
    >
      {post()}
    </BoxPost>
  );
}

export default memo(My);
