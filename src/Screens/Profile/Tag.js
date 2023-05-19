import { Typography } from "@mui/material";
import { BoxPost } from "./Style";

import { memo } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { BoxTag, BoxTags } from "../Tags/Style";
import { Link } from "react-router-dom";

function Tag() {
  return (
    <BoxPost>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 10, lg: 12 }}
        sx={{ justifyContent: "center", display: "flex", marginBottom: 2 }}
      >
        {Array.from(Array(20)).map((_, index) => (
          <Grid2 xs={2} sm={4} md={4} lg={4} key={index}>
            <BoxTags>
              <Link
                // to={`/tagdetail/${tag.tid}`}
                style={{ textDecoration: "none" }}
              >
                <BoxTag>
                  <Typography variant="body1">Name</Typography>
                </BoxTag>
              </Link>
              <Typography sx={{ marginTop: 2 }} className="tag">
                Deps
              </Typography>
            </BoxTags>
          </Grid2>
        ))}
      </Grid2>
    </BoxPost>
  );
}

export default memo(Tag);
