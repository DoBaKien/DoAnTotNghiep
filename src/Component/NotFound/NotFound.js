import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navi = useNavigate();
  const BoxItem = styled(Stack)(({ theme }) => ({
    border:
      theme.palette.mode === "dark" ? "10px dashed white" : "10px dashed black",
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  }));
  const handleBack = () => {
    navi("/");
  };

  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
      }}
    >
      <BoxItem>
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">
         Trang không tồn tại
        </Typography>
        <Button
          variant="outlined"
          size="large"
          sx={{ marginTop: 2 }}
          onClick={handleBack}
        >
          Trở về trang chủ
        </Button>
      </BoxItem>
    </Box>
  );
}

export default NotFound;
