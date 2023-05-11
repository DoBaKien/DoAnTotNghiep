import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../../Assert/Config";

var regEmail = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z]{2,4})+$/;

function ModalForgot({ setModal, modal }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
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
  useEffect(() => {
    let intervalId;

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setDisabled(false);
    }

    return () => clearInterval(intervalId);
  }, [countdown]);
  const handleChangleUserName = (e) => {
    if (regEmail.test(e)) {
      setEmail(e);
      setEmailError(false);
    } else {
      setEmail("");
      setEmailError(true);
    }
  };
  const toggleModal = () => {
    setModal(false);
  };
  const handleSubmit = () => {
    if (email === "") {
      setText("Vui lòng điền email");
      setOpen(!open);
    } else {
      setDisabled(true);
      setCountdown(20);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setText(`Đã gửi thư về mail ${email}`);
          setOpen(!open);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log("asd");
      setTimeout(() => {}, 20000);
    }
  };

  return (
    <Modal
      open={modal}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Modal open={open} onClose={() => setOpen(!open)}>
          <Box sx={{ ...style, width: 250, textAlign: "center" }}>
            <Typography variant="h5">{text}</Typography>
            <Button onClick={() => setOpen(!open)} sx={{ marginTop: 1 }}>
              Đóng
            </Button>
          </Box>
        </Modal>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          <Typography id="modal-modal-title" variant="h4">
            Quên mật khẩu
          </Typography>
        </Box>
        <Box>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              error={emailError}
              fullWidth
              onChange={(e) => handleChangleUserName(e.target.value)}
            />

            <Stack
              direction="row"
              spacing={10}
              style={{
                justifyContent: "center",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => setModal(!modal)}
                sx={{ width: 150 }}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                sx={{ width: 150 }}
                disabled={disabled}
                onClick={handleSubmit}
              >
                {disabled ? `(${countdown}s)` : "Gửi"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalForgot;
