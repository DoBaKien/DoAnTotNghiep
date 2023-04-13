import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import { BoxContent, BoxTag, BoxTags, InputFind, StackContent } from "./Style";
import { BoxHome } from "../../Assert/Style";
import { Box, InputAdornment, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./Tags.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Tags() {
  const navigate = useNavigate();
  const handle = () => {
    navigate("/tagdetail");
  };
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");
  const [tagFind, setTagFind] = useState("");
  useEffect(() => {
    axios
      .get("/tag/getAllTag")
      .then(function (response) {
        setTags(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [search]);

  const ser = (val) => {
    if (search === "") {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  };

  const tagB = () => {
    if (tags && tags.length > 0) {
      return (
        <Box sx={{ marginTop: 5, marginBottom: 5, padding: 1 }}>
          <Grid2
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 10, lg: 12 }}
          >
            {Array.from(tags)
              .filter(ser)
              .map((tag, index) => (
                <Grid2 xs={3} sm={7} md={4} key={index}>
                  <BoxTags>
                    <BoxTag onClick={handle}>
                      <Typography variant="body1">{tag.name}</Typography>
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
      );
    }
  };

  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <StackContent direction="row" sx={{ marginTop: 2 }}>
        <LeftSide></LeftSide>
        <BoxContent sx={{ width: { xs: "100vw", lg: "60vw" } }}>
          <Typography variant="h4">Thẻ</Typography>
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
              placeholder="Tìm bằng tên"
              onChange={(e) => setSearch(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </InputFind>
          {tagB()}
        </BoxContent>
      </StackContent>
    </BoxHome>
  );
}

export default Tags;
