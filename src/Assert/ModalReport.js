import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { memo, useState } from "react";
import Swal from "sweetalert2";

function ModalReport({ setModal, modal, qid, type, setCheckRp }) {
  const [reason, setReason] = useState("");
  const getUserReportValue = async () => {
    try {
      const response = await axios.get(`question/getUserReportValue/${qid}`);
      setCheckRp(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.default",
    border: "2px solid gray",
    boxShadow: 24,
    color: "text.primary",
    p: 4,
  };
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const toggleModal = () => {
    setModal(false);
  };
  const handleSubmit = () => {
    if (type === "câu trả lời" && reason !== "") {
      axios
        .post(`/answer/report/${qid}`, { detail: reason })
        .then(function (response) {
          setModal(false);

          Swal.fire("Thành công", "Tố cáo thành công", "success");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (type === "câu hỏi" && reason !== "") {
      axios
        .post(`/question/report/${qid}`, { detail: reason })
        .then(function (response) {
          setModal(false);
          getUserReportValue();
          Swal.fire("Thành công", "Tố cáo thành công", "success");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (type === "bình luận" && reason !== "") {
      axios
        .post(`/comment/report/${qid}`, { detail: reason })
        .then(function (response) {
          setModal(false);

          Swal.fire("Thành công", "Tố cáo thành công", "success");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Box>
      <Modal open={modal} onClose={toggleModal}>
        <Box sx={style}>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <Typography id="modal-modal-title" variant="h4">
              Báo cáo {type}
            </Typography>
          </Box>
          <Box>
            <Typography>Vui lòng nhập lý do tố cáo {type}</Typography>
            <TextField
              placeholder="Nhập lý do của bạn"
              variant="outlined"
              fullWidth
              multiline
              onChange={handleReasonChange}
              rows={4}
              style={{ marginTop: 20, marginBottom: 20 }}
            />
            <Stack
              direction="row"
              spacing={10}
              style={{ justifyContent: "center", textAlign: "center" }}
            >
              <Button
                variant="contained"
                onClick={() => setModal(!modal)}
                sx={{ width: 150 }}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: 150 }}
                onClick={handleSubmit}
              >
                Tố cáo
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default memo(ModalReport);
