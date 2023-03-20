import {
  Box,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BoxGG, BoxLog, BoxLogin } from "./Style";
import GoogleIcon from "@mui/icons-material/Google";
import { styled } from "@mui/system";

function Login() {
  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  });

  const handleClick = () => {};
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
        <BoxLog>
          <CssTextField label="Filled" variant="outlined"  />
        </BoxLog>
      </BoxLogin>
    </Box>
  );
}

export default Login;
