import styled from "@emotion/styled";
import { Button, Stack } from "@mui/material";

export const BoxLogin = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  border: "1px solid gray",
  padding: 20,
  borderRadius: 20,
  width: 600,
}));

export const BtnLog = styled(Button)(() => ({
  width: "60%",
  borderRadius: 5,
  height: 50,
  fontSize: 20,
  backgroundColor: "#D93A00",
  color: "white",
  "&:hover": {
    backgroundColor: "#CC0003",
  },
}));
