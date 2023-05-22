import { Box, CircularProgress, Paper } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import React from "react";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import Cookies from "js-cookie";

export const ChartQuestion = (props) => {
  const [data, setData] = useState("");
  useEffect(() => {
    const getTotalQuestionYear = async () => {
      try {
        const response = await axios.get(
          `${props.type}/${props.year}/${Cookies.get("sessionCookie")}`
        );
        const transformedData = Object.entries(response.data).map(
          ([year, population]) => ({
            month: `Tháng ${parseInt(year)}`,
            total: population,
          })
        );
        setData(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    if (props.type !== "none") {
      getTotalQuestionYear();
    }
  }, [props.type, props.year]);

  const checkData = () => {
    if (props.type === "none" || data === "") {
      return (
        <Box
          sx={{
            width: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
    } else {
      return (
        <Box sx={{ width: "80%" }}>
          {data.length > 0 ? (
            <Paper>
              <Chart data={data}>
                <ArgumentAxis />
                <ValueAxis max={12} />

                <BarSeries valueField="total" argumentField="month" />
                <Title text={props.text + " " + props.year} />
                <Animation />
              </Chart>
            </Paper>
          ) : (
            <></>
          )}
        </Box>
      );
    }
  };
  return <>{checkData()}</>;
};
