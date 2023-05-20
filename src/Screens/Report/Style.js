import { Box, styled } from "@mui/material";

export const BoxTitle = styled(Box)(() => ({
  paddingTop: 10,
  paddingBottom: 30,
  width: "80vw",
  textAlign: "center",
}));
export const BoxContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  height: "-moz-fit-content",
  width: "80vw",
  display: "flex",
  justifyContent: "center",
  margin: "0 auto",
  padding: 20,
}));
