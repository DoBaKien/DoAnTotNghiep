import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { BoxContent, DateV } from "./Style";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { memo } from "react";
import Cookies from "js-cookie";
import ModalReport from "../../Assert/ModalReport";
import ModalComment from "./ModalComment";

function Comment(props) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState("");
  const [modal, setModal] = useState(false);
  const [cid, setCid] = useState("");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const getCommentDTOByQid = useCallback(async () => {
    try {
      const response = await axios.get(
        `comment/getCommentDTOByQid/${props.qid}`
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [props.qid]);

  useEffect(() => {
    getCommentDTOByQid();
  }, [getCommentDTOByQid]);

  const handleSend = () => {
    if (comment !== "") {
      axios
        .post(`/comment/create/${props.qid}`, {
          detail: comment,
        })
        .then(function (response) {
          getCommentDTOByQid();
          setComment("");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng điền đầy đủ thông tin",
        "question"
      );
    }
  };
  const TextUser = (name, id) => {
    return (
      <Link
        to={`/profile/${id}`}
        style={{ textDecoration: "none", color: "lightblue" }}
      >
        {name}
      </Link>
    );
  };
  const handleReport = (id) => {
    console.log(id);
    setCid(id);
    if (Cookies.get("sessionCookie") !== undefined) {
      axios
        .get(`comment/getUserReportValue/${id}`)
        .then(function (response) {
          if (response.data === "None") {
            setModal(!modal);
          } else {
            Swal.fire("Bạn đã tố cáo rồi bình luận này rồi");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleEdit = (id, content) => {
    setCid(id);
    setContent(content);
    setOpen(!open);
  };

  const commentDetail = () => {
    if (data && data.length > 0) {
      return (
        <Box>
          {data.map((item, i) => (
            <Box key={i} sx={{ marginBottom: 1 }}>
              <Typography variant="body2">
                {item.comment.detail} —{" "}
                {TextUser(item.user.name, item.user.uid)}{" "}
                {DateV(item.comment.date)}
              </Typography>
              {props.currentUser !== item.comment.uid ? (
                <Tooltip title="Báo cáo" placement="left">
                  <IconButton onClick={() => handleReport(item.comment.cid)}>
                    <ReportIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Chỉnh sửa" placement="left">
                  <IconButton
                    onClick={() =>
                      handleEdit(item.comment.cid, item.comment.detail)
                    }
                  >
                    <ModeEditIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </Tooltip>
              )}
              <Divider sx={{ marginTop: 1 }} />
            </Box>
          ))}
        </Box>
      );
    }
  };
  return (
    <>
      <BoxContent sx={{ paddingTop: 1 }}>
        <Box>{commentDetail()}</Box>
        <ModalReport
          setModal={setModal}
          modal={modal}
          qid={cid}
          type="bình luận"
        />
        <ModalComment
          setOpen={setOpen}
          open={open}
          id={cid}
          qid={props.qid}
          content={content}
          setContent={setContent}
          setData={setData}
        />
        <Stack direction="row" sx={{ paddingLeft: 10 }}>
          <TextField
            id="standard-basic"
            variant="standard"
            placeholder="Viết bình luận"
            value={comment}
            sx={{ width: "30vw" }}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={handleSend}
            sx={{ marginLeft: 8 }}
          >
            Gửi
          </Button>
        </Stack>
      </BoxContent>
    </>
  );
}

export default memo(Comment);