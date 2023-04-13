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
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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
            console.log(response);
            Cookies.set("sessionCookie", response.data);
            auth.signOut();
            navigate("/");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSignUp = (e) => {
    navigate("/signup");
  };
  const handleChangleUserName = (e) => {
    // if (regUserName.test(e)) {
    //   setUserName(e);
    //   setUserNameError(false);
    // } else {
    //   setUserName("");
    //   setUserNameError(true);
    // }
    setUserName(e);
  };

  const handleChanglePassword = (e) => {
    // if (regpass.test(e)) {
    //   setPassword(e);
    //   setPasswordError(false);
    // } else {
    //   setPassword("");
    //   setPasswordError(true);
    // }
    setPassword(e);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyDH8wI1KbtyVVaeNlhl2o2gtgF6l-BjFNs",
    authDomain: "vietstack-kltn2023.firebaseapp.com",
    projectId: "vietstack-kltn2023",
    storageBucket: "vietstack-kltn2023.appspot.com",
    messagingSenderId: "295876770626",
    appId: "1:295876770626:web:b5d84a6050dd164084a6db",
  };
  const vietstack = initializeApp(firebaseConfig);
  const auth = getAuth(vietstack);

  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <BoxLogin>
        <Box sx={{ textAlign: "center", marginBottom: 5 }}>
          <Typography variant="h3">Login</Typography>
        </Box>
        <BoxGG variant="outlined">
          <CardActionArea>
            <CardContent sx={{ alignItems: "center" }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "center",
                }}
              >
                <GoogleIcon sx={{ marginRight: 2 }} />
                <Typography>Continue with Google</Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </BoxGG>
        <Divider sx={{ margin: 5 }}>OR</Divider>

        <Box>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="User Name"
              variant="outlined"
              fullWidth
              onChange={(e) => handleChangleUserName(e.target.value)}
              error={userNameError}
            />

            <TextField
              label="Password"
              error={passwordError}
              onChange={(e) => handleChanglePassword(e.target.value)}
              style={{ marginTop: 20, marginBottom: 20 }}
              fullWidth
              type={showPass ? "text" : "password"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={showPass ? "Show" : "Hidden"}>
                      <IconButton onClick={() => setShowPass(!showPass)}>
                        {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />

            <Box style={{ justifyContent: "center", textAlign: "center" }}>
              <BtnLog type="submit" variant="contained">
                log in
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
          <Link component="button" variant="body2">
            Forgotten password?
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
          <Typography variant="body2"> Don't have an account ? </Typography>
          <Link component="button" variant="body2" onClick={handleSignUp}>
            Sign Up
          </Link>
        </Stack>
      </BoxLogin>
    </Box>
  );
}

export default Login;
