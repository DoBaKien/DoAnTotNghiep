import { Box, Stack, styled, Typography } from "@mui/material";

function NotFound() {
  const BoxItem = styled(Stack)(({ theme }) => ({
    border:
      theme.palette.mode === "dark" ? "10px dashed white" : "10px dashed black",
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  }));

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
          This page isn't available. Sorry about that
        </Typography>
      </BoxItem>
    </Box>
  );
}

export default NotFound;
