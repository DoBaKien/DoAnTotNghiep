import { Typography } from "@mui/material";
import { BoxPost } from "./Style";

import { memo } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { BoxTag, BoxTags } from "../Tags/Style";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Tag() {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get(`/user/getUserFollowTag`)
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <BoxPost sx={{ width: "60vw" }}>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 10, lg: 12 }}
        sx={{ justifyContent: "center", display: "flex", marginBottom: 2 }}
      >
        {Array.from(data).map((item, index) => (
          <Grid2 xs={2} sm={4} md={4} lg={4} key={index}>
            <BoxTags>
              <Link
                to={`/tagdetail/${item.tid}`}
                style={{ textDecoration: "none" }}
              >
                <BoxTag>
                  <Typography variant="body1">{item.name}</Typography>
                </BoxTag>
              </Link>
              <Typography sx={{ marginTop: 2 }} className="tag">
                {item.description}
              </Typography>
            </BoxTags>
          </Grid2>
        ))}
      </Grid2>
    </BoxPost>
  );
}

export default memo(Tag);
