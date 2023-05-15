import {
  Box,
  CardActionArea,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { BoxGG, BtnLog, BoxLogin } from "./Style";
import GoogleIcon from "@mui/icons-material/Google";
import { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../Component/Header/Header";
import { auth } from "../../Assert/Config";
import Swal from "sweetalert2";
import { AuthContext } from "../../Component/Auth/AuthContext";
import ModalForgot from "./ModalForgot";

var regEmail = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z]{2,4})+$/;
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
function Login() {
  const { role } = useContext(AuthContext);

  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [modal, setModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === "" || password === "") {
      Swal.fire({
        icon: "error",
        text: "Vui lòng nhập đầy đủ thông tin",
      });
    } else {
      signInWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("id", user.uid);

          return user.getIdToken();
        })
        .then((token) => {
          axios
            .post("/account/createSessionCookie", token)
            .then(function (response) {
              Cookies.set("sessionCookie", response.data, { expires: 365 });
              if (role === "Admin") {
                navigate("/admin");
              } else if (role === "User") {
                navigate(-1);
              }
            });
        })
        .catch((error) => {
          Swal.fire("Sai thông tin đăng nhập");
        });
    }
  };
  const handleSignUp = (e) => {
    navigate("/signup");
  };
  const handleChangleUserName = (e) => {
    if (regEmail.test(e)) {
      setUserName(e);
      setUserNameError(false);
    } else {
      setUserName("");
      setUserNameError(true);
    }
  };

  const handleForget = () => {
    setModal(!modal);
  };

  const handleChanglePassword = (e) => {
    if (regpass.test(e)) {
      setPassword(e);
      setPasswordError(false);
    } else {
      setPassword("");
      setPasswordError(true);
    }
    setPassword(e);
  };

  const provider = new GoogleAuthProvider();
  const handleFb = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        axios
          .post("/account/dangky", {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          })
          .then(function (response) {});
        axios
          .post("/account/createSessionCookie", user.accessToken)
          .then(function (response) {
            Cookies.set("sessionCookie", response.data, { expires: 365 });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(credential);
      });
  };

  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{
        height: "100vh",
      }}
    >
      <ModalForgot setModal={setModal} modal={modal} />
      <Header />
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          marginTop: 5,
        }}
      >
        <BoxLogin>
          <Box sx={{ textAlign: "center", marginBottom: 5 }}>
            <Typography variant="h3">Đăng nhập</Typography>
          </Box>
          <BoxGG variant="outlined">
            <CardActionArea>
              <CardContent sx={{ alignItems: "center" }} onClick={handleFb}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <GoogleIcon sx={{ marginRight: 2 }} />
                  <Typography>Tiếp tục với Google</Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </BoxGG>
          <Divider sx={{ margin: 5 }}>Hoặc</Divider>

          <Box>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                onChange={(e) => handleChangleUserName(e.target.value)}
                error={userNameError}
              />

              <TextField
                label="Mật khẩu"
                error={passwordError}
                onChange={(e) => handleChanglePassword(e.target.value)}
                style={{ marginTop: 20, marginBottom: 20 }}
                fullWidth
                type={showPass ? "text" : "password"}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title={showPass ? "Hiện" : "Ẩn"}>
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

              <Box style={{ justifyContent: "center", textAlign: "center" }}>
                <BtnLog type="submit" variant="contained">
                  đăng nhập
                </BtnLog>
              </Box>
            </form>
          </Box>

          <Box
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            <Link component="button" variant="body2" onClick={handleForget}>
              Quên mật khẩu?
            </Link>
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
            <Typography variant="body2"> Bạn không có tài khoản ? </Typography>
            <Link component="button" variant="body2" onClick={handleSignUp}>
              Đăng ký
            </Link>
          </Stack>
        </BoxLogin>
      </Box>
    </Box>
  );
}

export default Login;
