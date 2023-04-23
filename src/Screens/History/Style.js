import { Box, Stack, styled } from "@mui/material";

export const BoxContent = styled(Box)(() => ({
  height: "-moz-fit-content",
  marginTop: 10,
}));
export const StackContent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  height: "-moz-fit-content",
  width: "80vw",
  margin: "0 auto",
}));
