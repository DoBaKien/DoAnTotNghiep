import { Box, Paper } from "@mui/material";
import React from "react";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

export const Question = (props) => {
  console.log(props.questYear);

  return (
    <Box sx={{ width: "80%" }}>
      {props.questYear.length > 0 ? (
        <Paper>
          <Chart data={props.questYear}>
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
  );
};
