import {
  Badge,
  Box,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";

export const StackContent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  height: "-moz-fit-content",
  width: "80vw",
  margin: "0 auto",
}));
export const BoxContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  marginTop: 20,
  height: "-moz-fit-content",
  width: "60vw",
}));

export const StackCreate = styled(Stack)(({ theme }) => ({
  width: "60vw",
  height: 80,
  borderRadius: 10,
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
}));
export const CrePost = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3A3B3C" : "#E8E8E8",
  borderRadius: 5,
  width: "70%",
  height: 40,
  "&:hover": {
    border: "1px solid currentColor",
  },
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));
export const BoxTitle = styled(Box)(() => ({
  height: "-moz-fit-content",
  width: "90%",
}));
export const BoxDetails = styled(Box)(() => ({
  height: 100,
  width: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 8,
}));
export const BoxText = styled(Box)(() => ({
  width: "100%",
  height: 33,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const StackPost = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  marginBottom: 10,
  display: "flex",
  alignItems: "center",
  height: "-moz-fit-content",
}));

export const StackName = styled(Stack)(() => ({
  width: 220,
  alignItems: "center",
}));
export const TypographyTitle = styled(Typography)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.mode === "light" ? "#00A2E8" : "#C3C3C3",
  },
}));
export const BtnToTop = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: "50px",
  right: "70px",
  color: theme.palette.mode === "light" ? "white" : "black",
  backgroundColor: theme.palette.mode === "light" ? "#00A2E8" : "#E54B4B",
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "lightblue" : "#C3C3C3",
  },
}));
