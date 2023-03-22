import { Box, Stack, styled } from "@mui/material";

export const BoxHome = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  height: "-moz-fit-content",
  justifyContent: "center",
}));
export const StackContent = styled(Stack)(({ theme }) => ({
  backgroundColor: "red",
  height: "-moz-fit-content",
  width: "80vw",
  margin: "0 auto",
}));
export const BoxContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  margin: "20px 50px 20px 10px",
  height: "-moz-fit-content",
  width: "-moz-fit-content",
}));
