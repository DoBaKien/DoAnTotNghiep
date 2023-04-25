import {
  Autocomplete,
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { dataLocation } from "../../../Assert/DataLocation";
import { useEffect } from "react";
import axios from "axios";

function ModalEdit({ setModal, modal, id }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    const findByUid = async () => {
      try {
        const response = await axios.get(`/user/findByUid/${id}`);
        setName(response.data.name);
        setAbout(response.data.about);
        setLocation(response.data.location);
      } catch (error) {
        console.error(error);
      }
    };

    if (id !== "") {
      findByUid();
    }
  }, [id]);

  var maxLength = 200;
  let count = 0;
  if (about) {
    count = about.length;
  }
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
    setModal(false);
  };
  const handleSubmit = () => {
    console.log(name, about);
  };

  return (
    <Box>
      <Modal
        open={modal}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-about"
      >
        <Box sx={style}>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <Typography id="modal-modal-title" variant="h4">
              Sửa thông tin người dùng
            </Typography>
          </Box>
          <Box>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                label="Mã người dùng"
                variant="outlined"
                fullWidth
                disabled
                defaultValue={id}
                style={{ marginTop: 20, marginBottom: 20 }}
              />
              <TextField
                label="Tên người dùng"
                variant="outlined"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <Autocomplete
                fullWidth
                disablePortal
                value={location}
                onChange={(event, newValue) => {
                  setLocation(newValue);
                }}
                options={dataLocation}
                style={{ marginTop: 20 }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Địa chỉ" />
                )}
              />
              <TextField
                multiline
                placeholder="Về bản thân"
                fullWidth
                rows={2}
                value={about || ""}
                style={{ marginTop: 20, marginBottom: 20 }}
                inputProps={{ maxLength: maxLength }}
                onChange={(e) => setAbout(e.target.value)}
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
