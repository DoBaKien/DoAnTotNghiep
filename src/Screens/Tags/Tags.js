import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import { BoxContent, BoxTag, BoxTags, InputFind, StackContent } from "./Style";
import { BoxHome } from "../../Assert/Style";
import { Box, InputAdornment, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "../../Assert/index.css";
import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
function Tags() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");

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
                    <Link
                      to={`/tagdetail/${tag.tid}`}
                      style={{ textDecoration: "none" }}
                    >
                      <BoxTag>
                        <Typography variant="body1">{tag.name}</Typography>
                      </BoxTag>
                    </Link>
                    <Typography sx={{ marginTop: 2 }} className="tag">
                      {tag.description}
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
              Thẻ là từ khóa hoặc nhãn phân loại câu hỏi của bạn với các câu hỏi
              tương tự khác. Sử dụng đúng thẻ giúp người khác tìm và trả lời câu
              hỏi của bạn dễ dàng hơn.
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
