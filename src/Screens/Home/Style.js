import { Badge, Box, Stack, styled } from "@mui/material";

export const BoxHome = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  height: "-moz-fit-content",
  justifyContent: "center",
}));
export const StackContent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  height: "-moz-fit-content",
  width: "80vw",
  margin: "0 auto",
}));
export const BoxContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  margin: "20px 50px 20px 10px",
  height: "-moz-fit-content",
  width: "-moz-fit-content",
}));
export const StackCreate = styled(Stack)(({ theme }) => ({
  width: "-moz-fit-content",
  height: 80,
  margin: "20px 50px 20px 10px",
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
