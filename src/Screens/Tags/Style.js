import { Box, Paper, Stack, styled } from "@mui/material";

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
export const BoxTags = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  padding: theme.spacing(2),
  width: 200,
}));
export const BoxTag = styled(Box)(() => ({
  height: 25,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid gray",
  borderRadius: 10,
  backgroundColor: "#E1ECF4",
  color: "black",
  cursor: "pointer",
  "&:hover": {
    border: "1px solid currentColor",
    backgroundColor: "#D6E0E8",
  },
}));
