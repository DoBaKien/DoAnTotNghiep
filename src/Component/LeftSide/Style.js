import { Box, styled } from "@mui/material";

export const BoxSide = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  width: "45%",
  marginRight: 50,
  minWidth: 60,
}));
