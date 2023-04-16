import { Button, styled } from "@mui/material";
import { Stack } from "@mui/system";

export const StackHeader = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: 10,
  paddingBottom: 10,
}));
export const Search = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3A3B3C" : "#E8E8E8",
  borderRadius: 20,
  width: "50%",
  height: 40,
  "&:hover": {
    border: "1px solid currentColor",
  },
}));
export const BtnLogin = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#E54B4B",
  "&:hover": {
    backgroundColor: "#C74141",
  },
  borderRadius: 30,
}));
