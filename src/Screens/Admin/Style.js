import { Box, Paper, Stack, styled, Link, Button } from "@mui/material";
import { useState } from "react";

import PropTypes from "prop-types";
export const StackContent = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#F8F9F9" : "#292929",
}));
export const BoxHome = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#DAE0E6" : "#030303",
  justifyContent: "center",
  minHeight: "100vh",
}));
export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
}));
export const ExpandableCell = ({ value }) => {
  const [expanded, setExpanded] = useState(false);
  const LinkView = styled(Link)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? "#90CAD" : "blue",
    cursor: "pointer",
  }));
  ExpandableCell.propTypes = {
    value: PropTypes.any,
  };
  return (
    <Box>
      {expanded ? value : value.slice(0, 100)}&nbsp;
      {value.length > 100 && (
        <LinkView onClick={() => setExpanded(!expanded)}>
          {expanded ? "view less" : "view more"}
        </LinkView>
      )}
    </Box>
  );
};
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
