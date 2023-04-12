import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";

import { BoxContent,  StackContent } from "./Style";
import { BoxHome, BoxTag } from "../../Assert/Style";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BlockIcon from "@mui/icons-material/Block";
import "../Tags/Tags.css";
import {
  BoxDetails,
  BoxText,
  BoxTitle,
  StackName,
  StackPost,
  TypographyTitle,
} from "../Home/Style";
function TagDetails() {
  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <StackContent direction="row">
        <LeftSide></LeftSide>
        <BoxContent sx={{ width: { xs: "100vw", lg: "60vw" } }}>
          <Typography variant="h4">Questions tagged [javascript]</Typography>
          <Box sx={{ width: "50vw", marginTop: 2 }}>
            <Typography>
              For questions about programming in ECMAScript (JavaScript/JS) and
              its different dialects/implementations (except for ActionScript).
              Keep in mind that JavaScript is NOT the same as Java! Include all
              labels that are relevant to your question; e.g., [node.js],
              [jQuery], [JSON], [ReactJS], [angular], [ember.js], [vue.js],
              [typescript], [svelte], etc.
            </Typography>
          </Box>
          <Stack direction="row" sx={{ marginTop: 3 }}>
            <Button
              variant="contained"
              sx={{ marginRight: 5 }}
              startIcon={<RemoveRedEyeIcon />}
            >
              Follow
            </Button>
            <Button variant="outlined" startIcon={<BlockIcon />}>
              ingore
            </Button>
          </Stack>
          <Box sx={{ marginTop: 3, marginBottom: 5}}>
            <BoxContent>
              {Array.from(Array(6)).map((_, i) => (
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
                      <Typography>1 vote</Typography>
                    </BoxText>
                    <BoxText>
                      <Typography>1 answer</Typography>
                    </BoxText>
                    <BoxText>
                      <Typography>1 view</Typography>
                    </BoxText>
                  </BoxDetails>

                  <BoxTitle>
                    <TypographyTitle component="div" className="title">
                      SQL Error mismatched input 'sql_query' expecting when
                      using Create Table in Pyspark SQL Error mismatched input
                      'sql_query' expecting when using Create Table in Pyspark
                      SQL Error mismatched input 'sql_query' expecting when
                      using Create Table in Pyspark
                    </TypographyTitle>
                    <Stack
                      direction={{ xs: "column", lg: "row" }}
                      sx={{ marginTop: 1 }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ width: "100%", alignItems: "center" }}
                      >
                        {Array.from(Array(3)).map((_, i) => (
                          <BoxTag key={i}>
                            <Typography variant="body2">asd {i}</Typography>
                          </BoxTag>
                        ))}
                      </Stack>
                      <StackName
                        direction="row"
                        spacing={2}
                        sx={{
                          marginTop: { xs: 1, lg: 0 },
                          marginBottom: { xs: 1, lg: 0 },
                        }}
                      >
                        <Avatar sx={{ width: 35, height: 35 }}>N</Avatar>

                        <Typography>Name Account</Typography>
                      </StackName>
                    </Stack>
                  </BoxTitle>
                </StackPost>
              ))}
            </BoxContent>
          </Box>
        </BoxContent>
      </StackContent>
    </BoxHome>
  );
}

export default TagDetails;
