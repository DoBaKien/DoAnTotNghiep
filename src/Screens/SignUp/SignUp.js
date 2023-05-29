import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { BoxLogin, BtnLog } from "./Style";
import PasswordCheck from "./PasswordCheck";
import Header from "../../Component/Header/Header";
import Modal from "./Modal";
import axios from "axios";
import Swal from "sweetalert2";
var regEmail = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z]{2,4})+$/;
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [rePass, setRePass] = useState("");
  const [rePassErr, setRePassErr] = useState(false);
  const [help, setHelp] = useState("");
  const [modal, setModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "" || name === "") {
      Swal.fire({
        icon: "error",
        text: "Vui lòng nhập đầy đủ thông tin",
      });
    } else {
      axios
        .post("/account/register", {
          email: email,
          password: password,
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data === "OTP sent") {
            setModal(!modal);
          } else {
            Swal.fire({
              icon: "error",
              title: "Kiểm tra lại",
              text: "Tài khoản Email đã dược đăng ký",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const handleChangleEmail = (e) => {
    if (regEmail.test(e)) {
      setEmail(e);
      setEmailError(false);
    } else {
      setEmail("");
      setEmailError(true);
    }
  };

  const handleChanglePassword = (e) => {
    if (regpass.test(e)) {
      setPassword(e);
      setPasswordError(false);
    } else {
      setPassword("");
      setPasswordError(true);
    }
  };
  const handleChangleRePassword = (e) => {
    if (regpass.test(e)) {
      setRePass(e);
      setRePassErr(false);
    } else {
      setRePass(e);
      setRePassErr(true);
    }
  };
  useEffect(() => {
    if (rePass === "") {
      setHelp("Nhập lại mật khẩu");
    } else if (rePass !== "") {
      setHelp("Mật khẩu trùng khớp");
    } else if (rePass.includes(password)) {
      setHelp("Mật khẩu trùng khớp");
    }
  }, [rePass, password]);

  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{ height: "100vh" }}
    >
      <Header />
      <Box
        sx={{
          height: "92vh",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {modal && (
          <Modal
            setModal={setModal}
            name={name}
            email={email}
            password={password}
          />
        )}
        <BoxLogin>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3">Đăng ký</Typography>
          </Box>
          <Box>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                style={{ marginTop: 20 }}
                label="Tên hiển thị"
                variant="outlined"
                required
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                style={{ marginTop: 20 }}
                onChange={(e) => handleChangleEmail(e.target.value)}
                error={emailError}
              />

              <TextField
                required
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

              <PasswordCheck password={password} />
              <TextField
                required
                label="Nhập lại mật khẩu"
                error={rePassErr}
                onChange={(e) => handleChangleRePassword(e.target.value)}
                style={{ marginTop: 30, marginBottom: 20 }}
                fullWidth
                type={showPass ? "text" : "password"}
                variant="outlined"
                helperText={help}
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

              <Box
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                <BtnLog type="submit" variant="contained">
                  Đăng ký
                </BtnLog>
              </Box>
            </form>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            <Typography variant="body2"> Bạn đã có tài khoản ? </Typography>
            <Link component="button" variant="body2" onClick={handleLogin}>
              Đăng nhập
            </Link>
          </Stack>
        </BoxLogin>
      </Box>
    </Box>
  );
}

export default SignUp;
