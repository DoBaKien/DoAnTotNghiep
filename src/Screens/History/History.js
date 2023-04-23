import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import { BoxContent, StackContent } from "./Style";
import { BoxHome } from "../../Assert/Style";
import { Box, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function History() {
  const { type, id } = useParams();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {}, []);
  console.log(type, id);
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
        </BoxContent>
      </StackContent>
    </BoxHome>
  );
}

export default History;
