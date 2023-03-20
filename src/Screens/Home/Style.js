import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const BoxHome = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
}));
export const BoxContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  margin: 30,
  height: "86vh",
}));
