import { Box, styled } from "@mui/material";

export const BoxSide = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  width: 220,
  marginRight: 50,
  minWidth: 60,
  border: "1px solid gray",
  borderRadius: 20,
  minHeight: "90vh",
}));
