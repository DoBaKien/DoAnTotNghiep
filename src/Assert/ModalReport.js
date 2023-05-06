import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { memo } from "react";

function ModalReport({ setModal, modal, qid, type }) {
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
  const handleSubmit = () => {};

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
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                label="Mã người dùng"
                variant="outlined"
                fullWidth
                disabled
                defaultValue={qid}
                style={{ marginTop: 20, marginBottom: 20 }}
              />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Label"
                />
                <FormControlLabel control={<Checkbox />} label="Required" />
                <FormControlLabel control={<Checkbox />} label="Disabled" />
              </FormGroup>
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

export default memo(ModalReport);
