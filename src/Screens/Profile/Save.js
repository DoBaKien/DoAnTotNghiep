import { Divider, Stack, Typography } from "@mui/material";
import {
  BoxDetails,
  BoxText,
  BoxTitle,
  StackPost,
  TypographyTitle,
} from "../Home/Style";
import { BoxPost } from "./Style";
import { BoxTag } from "../../Assert/Style";
import { memo, useEffect, useState } from "react";
import axios from "axios";

function Save() {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get(`/user/getUserSavedQuestion`)
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <BoxPost>
      {Array.from(data).map((item, i) => (
        <StackPost
          key={i}
          direction="row"
          spacing={2}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", lg: "block" } }}
            />
          }
        >
          <BoxDetails sx={{ display: { xs: "none", lg: "block" } }}>
            <BoxText>
              <Typography>1 phiếu</Typography>
            </BoxText>
            <BoxText>
              <Typography>1 trả lời</Typography>
            </BoxText>
            <BoxText>
              <Typography>1 xem</Typography>
            </BoxText>
          </BoxDetails>

          <BoxTitle>
            <TypographyTitle component="div" className="title">
              {item.title}
            </TypographyTitle>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              sx={{ marginTop: 1 }}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  width: "100%",
                  alignItems: "center",
                  marginBottom: 2,
                  marginTop: 1,
                }}
              >
                {Array.from(Array(3)).map((_, i) => (
                  <BoxTag key={i}>
                    <Typography variant="body2">asd {i}</Typography>
                  </BoxTag>
                ))}
              </Stack>
            </Stack>
          </BoxTitle>
        </StackPost>
      ))}
    </BoxPost>
  );
}

export default memo(Save);
