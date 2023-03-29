import { Box, Stack } from "@mui/material";
import { styled } from "@mui/system";

export const BoxContent = styled(Box)(() => ({
  height: "-moz-fit-content",
  margin: "20px 50px 20px 50px",
}));
export const StackContent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  height: "-moz-fit-content",
  width: "80vw",
  margin: "0 auto",
  padding: 10,
}));
export const BoxName = styled(Box)(() => ({
  marginLeft: 20,
  padding: 10,
}));

export const BoxAbout = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  width: "80vw",
  padding: 10,
  margin: "0 auto",
}));
export const BoxPost = styled(Box)(() => ({
  width: "60vw",
  marginLeft: 20,
}));
export const BoxList = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  width: "20vw",
  height: 300,
}));
