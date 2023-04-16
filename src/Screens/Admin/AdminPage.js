import { Box, Typography } from "@mui/material";
import Header from "../../Component/Admin/Header";
import LeftAdmin from "../../Component/Admin/Left";
import { BoxHome, StackContent, Item } from "./Style";

import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { AuthContext } from "../../Component/Auth/AuthContext";
function AdminPage() {
  const { show, setShow } = useContext(AuthContext);

  return (
    <BoxHome color={"text.primary"}>
      <StackContent direction="row">
        {show && <LeftAdmin />}
        <Box sx={{ width: "100%" }}>
          <Header show={show} setShow={setShow} />
          <Box
            bgcolor={"background.default"}
            sx={{ width: "moz-fit-width", paddingLeft: 2, paddingRight: 2 }}
          >
            <Typography variant="h4" sx={{ paddingTop: 3 }}>
              Bảng điều khiển
            </Typography>
            <Box sx={{ marginTop: 5 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 1, sm: 8, md: 12 }}
              >
                {Array.from(Array(4)).map((_, index) => (
                  <Grid xs={3} key={index}>
                    <Item>
                      <Typography>Tổng câu hỏi</Typography>
                      <h1>4,42,236</h1>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default AdminPage;
