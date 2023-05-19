import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import "./Modal.css";
import { ModalContent } from "./Style";
import axios from "axios";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Assert/Config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Modal({ setModal, name, email, password }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  
  const toggleModal = () => {
    setModal(false);
  };
  const handleCreate = () => {
    axios
      .post(`/account/register/${otp}`, {
        account: {
          email: email,
          password: password,
        },
        user: {
          name: name,
        },
      })
      .then(function (response) {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("id", user.uid);
            return user.getIdToken();
          })
          .then((token) => {
            axios
              .post("/account/createSessionCookie", token)
              .then(function (response) {
                Cookies.set("sessionCookie", response.data, { expires: 10 });
                navigate("/");
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <ModalContent className="modal-content">
          <button className="close-modal" onClick={toggleModal}>
            X
          </button>
          <Box>
            <Typography variant="h5">Mã xác nhận</Typography>
            <Stack direction="row">
              <TextField
                variant="standard"
                placeholder="Mã"
                fullWidth
                onChange={(e) => setOtp(e.target.value)}
                sx={{ marginTop: 2, marginRight: 10 }}
              />
              <button className="send-modal">Gửi lại</button>
            </Stack>
            <Box
              sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                sx={{ width: 200 }}
                onClick={handleCreate}
              >
                Tạo
              </Button>
            </Box>
          </Box>
        </ModalContent>
      </div>
    </>
  );
}

export default Modal;
