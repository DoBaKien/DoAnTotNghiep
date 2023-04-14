import { Box, Button, Stack, styled } from "@mui/material";

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
export const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "40%",
  left: "50%",
  maxWidth: "600px",
  minWidth: "300px",
  borderRadius: "3px",
  padding: "14px 28px",
  lineHeight: 1.4,
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.mode === "light" ? "white" : "#636363",
}));
