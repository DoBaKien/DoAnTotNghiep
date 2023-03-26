import { Box, styled } from "@mui/material";

export const BoxContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  padding: 10,
  minWidth: 300,
  height: "-moz-fit-content",
  width: "-moz-fit-content",
}));
export const BoxNav = styled(Box)(() => ({
  height: 100,
  marginTop: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
