import { Box, Stack, styled } from "@mui/material";

export const StackContent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  height: "-moz-fit-content",
  width: "80vw",
  margin: "0 auto",
}));
export const BoxContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  padding: 10,
  width: "60vw",
}));
