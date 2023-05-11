import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../Assert/Config";
import Swal from "sweetalert2";
import PasswordCheck from "../SignUp/PasswordCheck";
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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
function ModalChangePass({ setModal, modal, email }) {
  const [open, setOpen] = useState(false);
  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [passwordErrorN, setPasswordErrorN] = useState(false);
  const [showPassN, setShowPassN] = useState(false);
  const [text, setText] = useState("");
  const [help, setHelp] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleChanglePasswordN = (e) => {
    const match = regpass.exec(e);
    if (match === null) {
      setNewPass("");
      setPasswordErrorN(true);
      setHelp("Không hợp lệ");
    } else if (e === pass) {
      setNewPass("");
      setPasswordErrorN(true);
      setHelp("Trùng khớp với mật khẩu cũ");
    } else {
      setNewPass(e);
      setPasswordErrorN(false);
      setHelp("");
    }
  };
  const handleChanglePassword = (e) => {
    if (regpass.test(e)) {
      setPass(e);
      setPasswordError(false);
    } else {
      setPass("");
      setPasswordError(true);
    }
  };
  const toggleModal = () => {
    setModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pass, newPass);
    if (pass === "" || newPass === "") {
      setText("Vui lòng điền đầy đủ thông tin");
      setOpen(!open);
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          updatePassword(userCredential.user, newPass)
            .then(() => {
              setModal(false);
              Swal.fire("Thành công", "Đổi mật khẩu thành công", "success");
            })
            .catch((error) => {
              console.log("error");
            });
        })
        .catch((error) => {
          console.log("error");
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
          {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
          <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...style, width: 200, textAlign: "center" }}>
              <Typography variant="h5">{text}</Typography>
              <Button onClick={handleClose} sx={{ marginTop: 1 }}>
                Đóng
              </Button>
            </Box>
          </Modal>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <Typography id="modal-modal-title" variant="h4">
              Đổi mật khẩu
            </Typography>
          </Box>
          <Box>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                required
                autoComplete="off"
                label="Mật khẩu"
                error={passwordError}
                onChange={(e) => handleChanglePassword(e.target.value)}
                style={{ marginTop: 20, marginBottom: 10 }}
                fullWidth
                type={showPass ? "text" : "password"}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title={showPass ? "Hiện" : "Ẩn"}
                        placement="top-start"
                      >
                        <IconButton onClick={() => setShowPass(!showPass)}>
                          {showPass ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                required
                label="Mật khẩu mới"
                error={passwordErrorN}
                onChange={(e) => handleChanglePasswordN(e.target.value)}
                style={{ marginTop: 20, marginBottom: 15 }}
                fullWidth
                helperText={help}
                type={showPassN ? "text" : "password"}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title={showPassN ? "Hiện" : "Ẩn"}
                        placement="top-start"
                      >
                        <IconButton onClick={() => setShowPassN(!showPassN)}>
                          {showPassN ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              <PasswordCheck password={newPass} />
              <Stack
                direction="row"
                spacing={10}
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: 5,
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

export default ModalChangePass;
