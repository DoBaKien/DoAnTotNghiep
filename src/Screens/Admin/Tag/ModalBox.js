import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";

function ModalBox({ setModal, modal, setTags }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
  const maxLength = 500;
  const count = description.length;

  const toggleModal = () => {
    setModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name !== "" || description !== "") {
      axios
        .post(`/tag/addTag/${Cookies.get("sessionCookie")}`, {
          name,
          description,
        })
        .then(function (response) {
          setModal(false);
          Swal.fire("Thành công", "Tạo thành công", "success");
          axios
            .get("/tag/getAllTag")
            .then(function (response) {
              setTags(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Box>
      <Modal
        open={modal}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <Typography id="modal-modal-title" variant="h4">
              Thêm thẻ
            </Typography>
          </Box>
          <Box>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                label="Tên thẻ"
                variant="outlined"
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                label="Mô tả"
                rows={3}
                multiline
                style={{ marginTop: 20, marginBottom: 20 }}
                fullWidth
                variant="outlined"
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{ maxLength: maxLength }}
                helperText={`Còn lại ${maxLength - count}/${maxLength} ký tự`}
              />

              <Stack
                direction="row"
                spacing={10}
                style={{ justifyContent: "center", textAlign: "center" }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setModal(!modal)}
                  sx={{ width: 150 }}
                >
                  Hủy
                </Button>
                <Button type="submit" variant="contained" sx={{ width: 150 }}>
                  Tạo
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ModalBox;
