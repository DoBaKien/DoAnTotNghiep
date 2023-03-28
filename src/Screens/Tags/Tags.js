import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";

import { BoxContent, BoxTag, BoxTags, InputFind, StackContent } from "./Style";
import { BoxHome } from "../../Assert/Style";
import { Box, InputAdornment, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./Tags.css";
function Tags() {
  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <StackContent direction="row">
        <LeftSide></LeftSide>
        <BoxContent>
          <Typography variant="h4">Tags</Typography>
          <Box sx={{ width: "40vw", marginTop: 2 }}>
            <Typography>
              A tag is a keyword or label that categorizes your question with
              other, similar questions. Using the right tags makes it easier for
              others to find and answer your question.
            </Typography>
          </Box>
          <InputFind>
            <InputBase
              sx={{ ml: 2, flex: 1, fontSize: 22 }}
              fullWidth
              placeholder="Find by name"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </InputFind>
          <Box sx={{ marginTop: 5, marginBottom: 5, padding: 1 }}>
            <Grid2
              container
              spacing={{ xs: 1, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(Array(20)).map((_, index) => (
                <Grid2 xs={4} sm={4} md={4} key={index}>
                  <BoxTags>
                    <BoxTag>
                      <Typography variant="body1">javascript</Typography>
                    </BoxTag>
                    <Typography sx={{ marginTop: 2 }} className="tag">
                      For questions about programming in ECMAScript
                      (JavaScript/JS) and its different dialects/implementations
                      (except for ActionScript). Keep in mind that JavaScript is
                      NOT the same as Java! Include all labels that are relevant
                      to your question; e.g., [node.js], [jQuery], [JSON],
                      [ReactJS], [angular], [ember.js], [vue.js], [typescript],
                      [svelte], etc.
                    </Typography>
                  </BoxTags>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </BoxContent>
      </StackContent>
    </BoxHome>
  );
}

export default Tags;
