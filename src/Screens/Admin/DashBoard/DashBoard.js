import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Header from "../../../Component/Admin/Header";
import LeftAdmin from "../../../Component/Admin/Left";
import { BoxHome, StackContent, Item } from "../Style";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { AuthContext } from "../../../Component/Auth/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import ReportIcon from "@mui/icons-material/Report";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Question } from "./Question";

function DashBoard() {
  const { show, setShow } = useContext(AuthContext);
  const [totalQ, setTotalQ] = useState(""); //tổng câu hỏi
  const [totalQV, setTotalQV] = useState(""); // tổng vote của câu hỏi
  const [totalAV, setTotalAV] = useState(""); // tổng vote của câu trả lời
  const [totalRQ, setTotalRQ] = useState(""); // tổng report của câu hỏi
  const [totalRA, setTotalRA] = useState(""); // tổng report của câu trả lời
  const [totalRC, setTotalRC] = useState(""); // tổng report của bình luận
  const [user, setUser] = useState(""); // tổng người dùng
  const [questYear, setQuestYear] = useState(""); // tổng câu hỏi năm
  const [questRYear, setQuestRYear] = useState(""); // tổng report câu hỏi năm
  const [answerRYear, setAnswerRYear] = useState(""); // tổng báo cáo câu trả lời năm
  const [answerYear, setAnswerYear] = useState(""); // tổng câu trả lời năm
  const [commentYear, setCommentYear] = useState(""); // tổng bình luận năm
  const [commentRYear, setCommentRYear] = useState(""); // tổng bình luận năm
  const [check, setCheck] = useState(true);
  const [chart, setChart] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleQ = (event, index) => {
    setChart(<Question questYear={questYear} />);
    setSelectedIndex(index);
    setCheck(false);
  };
  const handleReportQ = (event, index) => {
    setSelectedIndex(index);
    setChart(<Question questYear={questRYear} />);
    setCheck(false);
  };
  const handleA = (event, index) => {
    setSelectedIndex(index);
    setChart(<Question questYear={answerYear} />);
    setCheck(false);
  };
  const handleReportA = (event, index) => {
    setSelectedIndex(index);
    setChart(<Question questYear={answerRYear} />);
    setCheck(false);
  };
  const handleC = (event, index) => {
    setSelectedIndex(index);
    setChart(<Question questYear={commentYear} />);
    setCheck(false);
  };
  const handleReportC = (event, index) => {
    setSelectedIndex(index);
    setChart(<Question questYear={commentRYear} />);
    setCheck(false);
  };

  useEffect(() => {
    //tổng câu hỏi
    const getTotalQuestionQ = async () => {
      try {
        const response = await axios.get("/question/getTotalQuestion");

        setTotalQ(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    //tổng vote câu hỏi
    const getTotalVoteQ = async () => {
      try {
        const response = await axios.get("/question/getTotalVote");
        setTotalQV(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    //tổng vote câu trả lời
    const getTotalVoteA = async () => {
      try {
        const response = await axios.get("/answer/getTotalVote");
        setTotalAV(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    //tổng báo cáo answer
    const getTotalQuestionReportA = async () => {
      try {
        const response = await axios.get("/question/getTotalQuestionReport");
        setTotalRA(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    //tổng báo cáo câu hỏi
    const getTotalQuestionReportQ = async () => {
      try {
        const response = await axios.get("/answer/getTotalAnswerReport");
        setTotalRQ(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    //tổng báo cáo câu hỏi
    const getTotalQuestionReportC = async () => {
      try {
        const response = await axios.get("/comment/getTotalCommentReport");
        setTotalRC(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // tổng user
    const getAllUser = async () => {
      try {
        const response = await axios.get("/user/getAllUser");
        setUser(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    // tổng câu hỏi năm
    const getTotalQuestionYear = async () => {
      try {
        const response = await axios.get("/question/getTotalQuestionYear/2023");

        const transformedData = Object.entries(response.data).map(
          ([year, population]) => ({
            month: `Tháng ${parseInt(year)}`,
            total: population,
          })
        );
        setQuestYear(transformedData);
      } catch (error) {
        console.log(error);
      }
    };

    const getTotalQuestionYearReport = async () => {
      try {
        const response = await axios.get(
          "/question/getTotalQuestionYearReport/2023"
        );

        const transformedData = Object.entries(response.data).map(
          ([year, population]) => ({
            month: `Tháng ${parseInt(year)}`,
            total: population,
          })
        );
        setQuestRYear(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    const getTotalAnswerYear = async () => {
      try {
        const response = await axios.get("/answer/getTotalAnswerYear/2023");

        const transformedData = Object.entries(response.data).map(
          ([year, population]) => ({
            month: `Tháng ${parseInt(year)}`,
            total: population,
          })
        );
        setAnswerYear(transformedData);
      } catch (error) {
        console.log(error);
      }
    };

    const getTotalAnswerReport = async () => {
      try {
        const response = await axios.get(
          "/answer/getTotalAnswerReportYear/2023"
        );

        const transformedData = Object.entries(response.data).map(
          ([year, population]) => ({
            month: `Tháng ${parseInt(year)}`,
            total: population,
          })
        );
        setAnswerRYear(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    const getTotalCommentReportYear = async () => {
      try {
        const response = await axios.get(
          "/comment/getTotalCommentReportYear/2023"
        );

        const transformedData = Object.entries(response.data).map(
          ([year, population]) => ({
            month: `Tháng ${parseInt(year)}`,
            total: population,
          })
        );
        setCommentRYear(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    const getTotalCommentYear = async () => {
      try {
        const response = await axios.get("/comment/getTotalCommentYear/2023");

        const transformedData = Object.entries(response.data).map(
          ([year, population]) => ({
            month: `Tháng ${parseInt(year)}`,
            total: population,
          })
        );
        setCommentYear(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalCommentYear();
    getTotalCommentReportYear();
    getTotalQuestionYear();
    getTotalAnswerYear();
    getTotalAnswerReport();
    getTotalQuestionYearReport();
    getAllUser();
    getTotalVoteQ();
    getTotalVoteA();
    getTotalQuestionReportA();
    getTotalQuestionReportQ();
    getTotalQuestionReportC();
    getTotalQuestionQ();
  }, []);

  return (
    <BoxHome color={"text.primary"}>
      <StackContent direction="row">
        {show && <LeftAdmin />}
        <Box sx={{ width: "100%" }}>
          <Header show={show} setShow={setShow} />
          <Box
            bgcolor={"background.default"}
            sx={{ width: "moz-fit-width", paddingLeft: 2, paddingRight: 2 }}
          >
            <Typography variant="h4" sx={{ paddingTop: 2 }}>
              Bảng điều khiển
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 1, sm: 8, md: 12 }}
              >
                <Grid xs={3}>
                  <Item>
                    <Typography>Tổng câu hỏi</Typography>
                    <h1>{totalQ}</h1>
                  </Item>
                </Grid>
                <Grid xs={3}>
                  <Item>
                    <Typography>Tổng bình chọn</Typography>
                    <h1>{totalQV + totalAV}</h1>
                  </Item>
                </Grid>
                <Grid xs={3}>
                  <Item>
                    <Typography>Tổng báo cáo</Typography>
                    <h1>{totalRA + totalRQ + totalRC}</h1>
                  </Item>
                </Grid>
                <Grid xs={3}>
                  <Item>
                    <Typography>Tổng người dùng</Typography>
                    <h1>{user}</h1>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Stack
            direction="row"
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box>
              <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={(event) => handleQ(event, 0)}
                >
                  <ListItemIcon>
                    <QuestionAnswerIcon />
                  </ListItemIcon>
                  <ListItemText primary="Câu hỏi" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleReportQ(event, 1)}
                >
                  <ListItemIcon>
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText primary="Báo cáo câu hỏi" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleA(event, 2)}
                >
                  <ListItemIcon>
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText primary="Câu trả lời" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={(event) => handleReportA(event, 3)}
                >
                  <ListItemIcon>
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText primary="Báo cáo câu trả lời" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 4}
                  onClick={(event) => handleC(event, 4)}
                >
                  <ListItemIcon>
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText primary="Báo cáo câu trả lời" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 5}
                  onClick={(event) => handleReportC(event, 5)}
                >
                  <ListItemIcon>
                    <ReportIcon />
                  </ListItemIcon>
                  <ListItemText primary="Báo cáo câu trả lời" />
                </ListItemButton>
              </List>
            </Box>
            <Box
              sx={{
                width: "80%",
                display: check === true ? "block" : "none",
              }}
            >
              {questYear.length > 0 ? (
                <Paper>
                  <Chart data={questYear}>
                    <ArgumentAxis />
                    <ValueAxis max={12} />

                    <BarSeries valueField="total" argumentField="month" />
                    <Title text="Số liệu câu hỏi năm 2023" />
                    <Animation />
                  </Chart>
                </Paper>
              ) : (
                <></>
              )}
            </Box>
            {chart}
          </Stack>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default DashBoard;
