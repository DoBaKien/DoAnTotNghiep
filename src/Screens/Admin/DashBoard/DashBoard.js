import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  NativeSelect,
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
import AnnouncementIcon from "@mui/icons-material/Announcement";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SmsIcon from "@mui/icons-material/Sms";
import ChatIcon from "@mui/icons-material/Chat";
import { memo } from "react";
import { ChartQuestion } from "./Chart";
import Cookies from "js-cookie";
import Statistics from "./Statistics";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
function DashBoard() {
  const { show, setShow } = useContext(AuthContext);
  const [totalQ, setTotalQ] = useState(""); //tổng câu hỏi
  const [totalQV, setTotalQV] = useState(""); // tổng vote của câu hỏi
  const [totalAV, setTotalAV] = useState(""); // tổng vote của câu trả lời
  const [totalRQ, setTotalRQ] = useState(""); // tổng report của câu hỏi
  const [totalRA, setTotalRA] = useState(""); // tổng report của câu trả lời
  const [totalRC, setTotalRC] = useState(""); // tổng report của bình luận
  const [user, setUser] = useState(""); // tổng người dùng

  const cookie = Cookies.get("sessionCookie");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  const [chart, setChart] = useState(
    <ChartQuestion
      type="/question/getTotalQuestionYear"
      text="Số liệu câu hỏi"
      year={selectedYear}
    />
  );
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const currentYear = new Date().getFullYear();
  const recentYears = Array.from(
    { length: 5 },
    (_, index) => currentYear - index
  );

  const handleQ = (event, index) => {
    //0
    setChart(<ChartQuestion type="none" />);
    setTimeout(() => {
      setChart(
        <ChartQuestion
          type="/question/getTotalQuestionYear"
          text="Số liệu câu hỏi"
          year={selectedYear}
        />
      );
    }, 1000);
    setSelectedIndex(index);
  };

  const handleReportQ = (event, index) => {
    //1
    setSelectedIndex(index);
    setChart(<ChartQuestion type="none" />);
    setTimeout(() => {
      setChart(
        <ChartQuestion
          type="/question/getTotalQuestionYearReport"
          text="Số liệu câu hỏi bị tố cáo"
          year={selectedYear}
        />
      );
    }, 1000);
  };
  const handleA = (event, index) => {
    //2
    setChart(<ChartQuestion type="none" />);
    setTimeout(() => {
      setChart(
        <ChartQuestion
          type="/answer/getTotalAnswerYear"
          text="Số liệu câu trả lời"
          year={selectedYear}
        />
      );
    }, 1000);
    setSelectedIndex(index);
  };
  const handleReportA = (event, index) => {
    //3
    setChart(<ChartQuestion type="none" />);
    setTimeout(() => {
      setChart(
        <ChartQuestion
          type="/answer/getTotalAnswerReportYear"
          text={`Số liệu câu trả lời bị tố cáo `}
          year={selectedYear}
        />
      );
    }, 1000);
    setSelectedIndex(index);
  };
  const handleC = (event, index) => {
    //4
    setChart(<ChartQuestion type="none" />);
    setTimeout(() => {
      setChart(
        <ChartQuestion
          ChartQuestion
          type="/comment/getTotalCommentYear"
          text={`Số liệu bình luận `}
          year={selectedYear}
        />
      );
    }, 1000);
    setSelectedIndex(index);
  };
  const handleReportC = (event, index) => {
    //5
    setSelectedIndex(index);
    setChart(<ChartQuestion type="none" />);
    setTimeout(() => {
      setChart(
        <ChartQuestion
          type="/comment/getTotalCommentReportYear"
          text={`Số liệu bình luận `}
          year={selectedYear}
        />
      );
    }, 1000);
  };
  const handleTag = (event, index) => {
    //6
    setSelectedIndex(index);
    setChart(<Statistics />);
  };

  useEffect(() => {
    //tổng câu hỏi
    const getTotalQuestionQ = async () => {
      try {
        const response = await axios.get(
          `/question/getTotalQuestion/${cookie}`
        );
        setTotalQ(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    //   //tổng vote câu hỏi
    const getTotalVoteQ = async () => {
      try {
        const response = await axios.get(`/question/getTotalVote/${cookie}`);
        setTotalQV(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    //   //tổng vote câu trả lời
    const getTotalVoteA = async () => {
      try {
        const response = await axios.get(`/answer/getTotalVote/${cookie}`);
        setTotalAV(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    //   //tổng báo cáo answer
    const getTotalQuestionReportA = async () => {
      try {
        const response = await axios.get(
          `/question/getTotalQuestionReport/${cookie}`
        );
        setTotalRA(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    //   //tổng báo cáo câu hỏi
    const getTotalQuestionReportQ = async () => {
      try {
        const response = await axios.get(
          `/answer/getTotalAnswerReport/${cookie}`
        );
        setTotalRQ(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    //   //tổng báo cáo bình luận
    const getTotalQuestionReportC = async () => {
      try {
        const response = await axios.get(
          `/comment/getTotalCommentReport/${cookie}`
        );
        setTotalRC(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    //   // tổng user
    const getAllUser = async () => {
      try {
        const response = await axios.get(`/user/countUser/${cookie}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUser();
    getTotalVoteQ();
    getTotalVoteA();
    getTotalQuestionReportA();
    getTotalQuestionReportQ();
    getTotalQuestionReportC();
    getTotalQuestionQ();
  }, [cookie]);

  return (
    <BoxHome color={"text.primary"}>
      <StackContent direction="row">
        {show && <LeftAdmin />}
        <Box sx={{ width: "100%" }}>
          <Header setShow={setShow} show={show} />
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
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Năm
                </InputLabel>
                <NativeSelect
                  defaultValue={currentYear}
                  onChange={handleYearChange}
                  inputProps={{
                    name: "Năm",
                    id: "uncontrolled-native",
                  }}
                >
                  {recentYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
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
                    <AnnouncementIcon />
                  </ListItemIcon>
                  <ListItemText primary="Báo cáo câu hỏi" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleA(event, 2)}
                >
                  <ListItemIcon>
                    <SmsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Câu trả lời" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={(event) => handleReportA(event, 3)}
                >
                  <ListItemIcon>
                    <AnnouncementIcon />
                  </ListItemIcon>
                  <ListItemText primary="Báo cáo câu trả lời" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 4}
                  onClick={(event) => handleC(event, 4)}
                >
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bình luận" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 5}
                  onClick={(event) => handleReportC(event, 5)}
                >
                  <ListItemIcon>
                    <AnnouncementIcon />
                  </ListItemIcon>
                  <ListItemText primary="Báo cáo bình luận" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 5}
                  onClick={(event) => handleTag(event, 6)}
                >
                  <ListItemIcon>
                    <LocalOfferIcon />
                  </ListItemIcon>
                  <ListItemText primary="Thống kê thẻ" />
                </ListItemButton>
              </List>
            </Box>
            {chart}
          </Stack>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default memo(DashBoard);
