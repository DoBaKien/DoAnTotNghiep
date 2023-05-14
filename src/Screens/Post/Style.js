import { Box, Stack, styled } from "@mui/material";

export const StackContent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  height: "-moz-fit-content",
  width: "80%",
  margin: "0 auto",
}));
export const BoxContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",

  width: "60vw",
}));
export const BoxUser = styled(Stack)(({ theme }) => ({
  border: theme.palette.mode === "light" ? "1px solid black" : "1px solid gray",
  cursor: "pointer",
  alignItems: "center",
  borderRadius: 10,
  padding: 5,
  "&:hover": {
    border:
      theme.palette.mode === "light" ? "2px solid black" : "2px solid gray",
    opacity: 0.5,
  },
}));
export const DateV = (value) => {
  const dateObject = new Date(value);
  const day = dateObject.getDate(); // Lấy ngày
  const month = dateObject.getMonth() + 1; // Lấy tháng (lưu ý: tháng trong JavaScript bắt đầu từ 0 nên phải cộng thêm 1)
  const year = dateObject.getFullYear(); // Lấy năm
  const hours = dateObject.getHours(); // Lấy giờ
  const minutes = dateObject.getMinutes(); // Lấy phút
  const date = `${hours}:${minutes} - ${day}/${month}/${year}`;

  return date;
};

export const BoxUserPost = styled(Stack)(() => ({
  display: "flex",
  alignItems: "center",
}));
