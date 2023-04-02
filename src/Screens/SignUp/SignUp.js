import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { BoxLogin, BtnLog } from "./Style";
import PasswordCheck from "./PasswordCheck";
import { countries } from "../../Assert/DataLocation";
var regEmail = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z]{2,4})+$/;
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, name, location);
  };
  const handleSignUp = (e) => {
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
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3">Sign Up</Typography>
        </Box>
        <Box>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              style={{ marginTop: 20 }}
              label="Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <Autocomplete
              fullWidth
              disablePortal
              options={countries}
              sx={{ marginTop: 2 }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Location" />
              )}
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
                    <Tooltip
                      title={showPass ? "Show" : "Hidden"}
                      placement="top-start"
                    >
                      <IconButton onClick={() => setShowPass(!showPass)}>
                        {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />

            <PasswordCheck password={password} />

            <Box
              style={{
                justifyContent: "center",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              <BtnLog type="submit" variant="contained">
                Sign Up
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
          <Typography variant="body2"> Already have an account ? </Typography>
          <Link component="button" variant="body2" onClick={handleSignUp}>
            Login
          </Link>
        </Stack>
      </BoxLogin>
    </Box>
  );
}

export default SignUp;
