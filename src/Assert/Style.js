import { Box, Paper, Stack } from "@mui/material";
import { styled } from "@mui/system";

export const BoxHome = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  height: "-moz-fit-content",
  justifyContent: "center",
  minHeight: "100vh",
}));
export const BoxContent = styled(Box)(() => ({
  height: "-moz-fit-content",
  margin: "20px 50px 20px 50px",
}));
export const StackContent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  height: "-moz-fit-content",
  width: "80vw",
  margin: "0 auto",
}));
export const BoxName = styled(Box)(() => ({
  padding: 10,
}));

export const BoxAbout = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  width: "80vw",
  padding: 10,
  margin: "0 auto",
}));
export const BoxList = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  width: "20vw",
  height: 300,
}));
export const PaperUser = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
  padding: theme.spacing(2),
  width: 200,
  cursor: "pointer",
  "&:hover": {
    border: "1px solid currentColor",
    backgroundColor: theme.palette.mode === "light" ? "#D6E0E8" : "#030303",
  },
}));
export const BoxTag = styled(Box)(() => ({
  padding: "2px 10px 2px 10px",
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
export const ValueDate = ({ value }) => {
  const dateObject = new Date(value);
  const day = dateObject.getDate(); // Lấy ngày
  const month = dateObject.getMonth() + 1; // Lấy tháng (lưu ý: tháng trong JavaScript bắt đầu từ 0 nên phải cộng thêm 1)
  const year = dateObject.getFullYear(); // Lấy năm
  const hours = dateObject.getHours(); // Lấy giờ
  const minutes = dateObject.getMinutes(); // Lấy phút
  const date = `${hours}:${minutes} - ${day}/${month}/${year}`;
  return <div>{date}</div>;
};
