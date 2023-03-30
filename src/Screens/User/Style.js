import { Box,  Stack, styled } from "@mui/material";

export const StackContent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  height: "-moz-fit-content",
  width: "80vw",
  margin: "0 auto",
}));
export const BoxContent = styled(Box)(() => ({
  height: "-moz-fit-content",
  marginTop: 10,
}));

export const InputFind = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3A3B3C" : "#E8E8E8",
  borderRadius: 5,
  width: "50%",
  minWidth: 200,
  height: 40,
  marginTop: 20,
  border: "1px solid black",
}));
