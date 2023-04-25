import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function ModalEdit({ setModalE, modalE, id }) {
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
    setModalE(false);
  };
  const handleSubmit = () => {
    console.log(name, description);
  };

  return (
    <Box>
      <Modal
        open={modalE}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <Typography id="modal-modal-title" variant="h4">
              Chỉnh sửa thẻ
            </Typography>
          </Box>
          <Box>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                label="Mã thẻ"
                variant="outlined"
                fullWidth
                disabled
                defaultValue={id}
                style={{ marginTop: 20, marginBottom: 20 }}
              />
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
                  onClick={() => setModalE(!modalE)}
                  sx={{ width: 150 }}
                >
                  Hủy
                </Button>
                <Button type="submit" variant="contained" sx={{ width: 150 }}>
                  đăng nhập
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ModalEdit;
