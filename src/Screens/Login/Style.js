import styled from "@emotion/styled";
import { Box, Card } from "@mui/material";

export const BoxGG = styled(Card)(() => ({
  border: "1px solid black",
  width: 300,
  borderRadius: 50,
}));
export const BoxLogin = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  padding: 20,
  borderRadius: 20,
}));

export const BoxLog = styled(Box)(({ theme }) => ({}));

