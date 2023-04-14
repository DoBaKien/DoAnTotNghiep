import { Button, Card, Stack, styled } from "@mui/material";

export const BoxGG = styled(Card)(({ theme }) => ({
  border: theme.palette.mode === "light" ? "1px solid black" : "1px solid gray",
  width: 300,
  borderRadius: 50,
  margin: "0 auto",
}));
export const BoxLogin = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  border: "1px solid gray",
  padding: 20,
  borderRadius: 20,
  width: 500,
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
