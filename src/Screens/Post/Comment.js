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
import { BoxContent, DateV, TextUser } from "./Style";
import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { memo } from "react";
import Cookies from "js-cookie";
import ModalReport from "../../Assert/ModalReport";
import ModalComment from "./ModalComment";
import ClearIcon from "@mui/icons-material/Clear";
import { AuthContext } from "../../Component/Auth/AuthContext";

function Comment(props) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState("");
  const [modal, setModal] = useState(false);
  const [cid, setCid] = useState("");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const { role } = useContext(AuthContext);
  const cookies = Cookies.get("sessionCookie");
  const navigation = useNavigate("");
  const getCommentDTOByQid = useCallback(async () => {
    try {
      const response = await axios.get(
        `comment/getCommentDTOByQid/${props.qid}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [props.qid]);

  useEffect(() => {
    getCommentDTOByQid();
  }, [getCommentDTOByQid]);

  const handleSend = () => {
    if (cookies !== undefined) {
      if (comment !== "") {
        axios
          .post(`/comment/create/${props.qid}/${cookies}`, {
            detail: comment,
          })
          .then(function (response) {
            getCommentDTOByQid();
            setComment("");
            Swal.fire("Thành công", "Bình luận thành công", "success");
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
    } else {
      Swal.fire({
        title: "Lỗi",
        text: "Bạn phải đăng nhập trước",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigation("/login");
        }
      });
    }
  };

  const handleReport = (id) => {
    setCid(id);
    if (cookies !== undefined) {
      axios
        .get(`comment/getUserReportValue/${id}/${cookies}`)
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
    } else {
      Swal.fire({
        title: "Lỗi",
        text: "Bạn phải đăng nhập trước",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigation("/login");
        }
      });
    }
  };

  const handleEdit = (id, content) => {
    setCid(id);
    setContent(content);
    setOpen(!open);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: "Một khi đã xóa thì không thể hoàn tác",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: "true",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`comment/deleteComment/${id}/${cookies}`)
          .then(function (response) {
            getCommentDTOByQid();
            Swal.fire("Đã xóa!", "Bình luận đã xóa", "success");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  const checkRole = (cid, detail, uid) => {
    if (props.currentUser !== uid || cookies === undefined) {
      if (role === "Admin") {
        return (
          <>
            <Tooltip title="Báo cáo" placement="left">
              <IconButton onClick={() => handleReport(cid)}>
                <ReportIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa" placement="right">
              <IconButton onClick={() => handleDelete(cid)}>
                <ClearIcon sx={{ fontSize: 18 }} color="error" />
              </IconButton>
            </Tooltip>
          </>
        );
      } else {
        return (
          <>
            <Tooltip title="Báo cáo" placement="left">
              <IconButton onClick={() => handleReport(cid)}>
                <ReportIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </>
        );
      }
    } else if (props.currentUser === uid && role === "Admin") {
      return (
        <>
          <Tooltip title="Chỉnh sửa" placement="top">
            <IconButton onClick={() => handleEdit(cid, detail)}>
              <ModeEditIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa" placement="right">
            <IconButton onClick={() => handleDelete(cid)}>
              <ClearIcon sx={{ fontSize: 18 }} color="error" />
            </IconButton>
          </Tooltip>
        </>
      );
    } else if (props.currentUser === uid && role === "User") {
      return (
        <>
          <Tooltip title="Chỉnh sửa" placement="top">
            <IconButton onClick={() => handleEdit(cid, detail)}>
              <ModeEditIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa" placement="right">
            <IconButton onClick={() => handleDelete(cid)}>
              <ClearIcon sx={{ fontSize: 18 }} color="error" />
            </IconButton>
          </Tooltip>
        </>
      );
    }
  };

  const commentDetail = () => {
    if (data && data.length > 0) {
      return (
        <Box>
          {data.map((item, i) => (
            <Box
              key={i}
              sx={{
                marginBottom: 1,
                alignItems: "center",
                display: "flex",
                border:
                  item.comment.cid === props.id && props.type === "comment"
                    ? "3px solid red"
                    : "",
              }}
            >
              <Typography
                variant="body2"
                sx={{ float: "left", lineHeight: 1.5 }}
              >
                {item.comment.detail} —{" "}
                {TextUser(item.user.name, item.user.uid)}{" "}
                {DateV(item.comment.date)}
                {checkRole(
                  item.comment.cid,
                  item.comment.detail,
                  item.comment.uid
                )}
              </Typography>
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
          type="bình luận"
        />
        {props.status === "Open" ? (
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
        ) : (
          <Typography>Câu hỏi đã dóng</Typography>
        )}
      </BoxContent>
    </>
  );
}

export default memo(Comment);
