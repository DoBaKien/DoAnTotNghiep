import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import Swal from "sweetalert2";

function ModalComment({
  setOpen,
  open,
  id,
  qid,
  content,
  setContent,
  setData,
}) {
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

  const toggleModal = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/comment/edit/${id}`, {
        detail: content,
      })
      .then(function (response) {
        axios
          .get(`comment/getCommentDTOByQid/${qid}`)
          .then(function (response) {
            setData(response.data);
            setOpen(!open);
            Swal.fire("Thành công", "Chỉnh sửa thành công", "success");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <Typography id="modal-modal-title" variant="h4">
              Chỉnh sửa bình luận
            </Typography>
          </Box>
          <Box>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                label="Bình luận mới"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <Stack
                direction="row"
                spacing={10}
                style={{ justifyContent: "center", textAlign: "center" }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpen(!open)}
                  sx={{ width: 150 }}
                >
                  Hủy
                </Button>
                <Button type="submit" variant="contained" sx={{ width: 150 }}>
                  Sửa
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ModalComment;
