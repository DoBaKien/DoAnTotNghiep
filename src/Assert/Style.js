import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const BoxHome = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  height: "-moz-fit-content",
  justifyContent: "center",
}));
