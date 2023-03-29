import { Box, Stack } from "@mui/material";
import { styled } from "@mui/system";

export const BoxContent = styled(Box)(() => ({
  height: "-moz-fit-content",
  margin: "30px 50px 10px 50px",
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
