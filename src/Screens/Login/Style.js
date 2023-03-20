import styled from "@emotion/styled";
import { Box, Card, Stack } from "@mui/material";

export const BoxGG = styled(Card)(({ theme }) => ({
  border: theme.palette.mode === "light" ? "1px solid black" : "1px solid gray",
  width: 300,
  borderRadius: 50,
  margin: "0 auto",
}));
export const BoxLogin = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  border: theme.palette.mode === "light" ? "1px solid black" : "1px solid gray",
  padding: 20,
  borderRadius: 20,
}));

export const BoxLog = styled(Box)(({ theme }) => ({}));
