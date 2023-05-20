import { Divider, Typography } from "@mui/material";

import Header from "../../Component/Header/Header";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Component/Auth/AuthContext";
import axios from "axios";

import { Navigate } from "react-router-dom";
import { BoxContent, BoxTitle } from "./Style";
import { BoxHome } from "../../Assert/Style";

import Cookies from "js-cookie";
import { datatable, datatableanswer, datatablecomment } from "./Data";

function Report() {
  const { currentUser } = useContext(AuthContext);
  const cookie = Cookies.get("sessionCookie");
  const [data, setData] = useState("");
  const [answer, setAnswer] = useState("");
  const [comment, setComment] = useState("");
  useEffect(() => {
    const getUserReportQuestion = async () => {
      try {
        const response = await axios.get(
          `/question/getUserReport/${currentUser}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const getUserReportAnswer = async () => {
      try {
        const response = await axios.get(
          `/answer/getUserReport/${currentUser}`
        );
        setAnswer(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const getUserReportComment = async () => {
      try {
        const response = await axios.get(
          `/comment/getUserReport/${currentUser}`
        );
        setComment(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser !== "") {
      getUserReportComment();
      getUserReportQuestion();
      getUserReportAnswer();
    }
  }, [currentUser]);

  return (
    <>
      {cookie !== undefined ? (
        <BoxHome color={"text.primary"} sx={{ paddingBottom: 5 }}>
          <Header />
          <BoxTitle>
            <Typography variant="h4">Danh sách báo cáo của bạn</Typography>
            <Divider variant="inset" />
          </BoxTitle>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Báo cáo câu hỏi
          </Typography>
          <BoxContent>{datatable(data)}</BoxContent>
          <Typography sx={{ textAlign: "center", marginTop: 10 }} variant="h4">
            Báo cáo câu trả lời
          </Typography>
          <BoxContent>{datatableanswer(answer)}</BoxContent>
          <Typography sx={{ textAlign: "center", marginTop: 10 }} variant="h4">
            Báo cáo bình luận
          </Typography>
          <BoxContent>{datatablecomment(comment)}</BoxContent>
        </BoxHome>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Report;
