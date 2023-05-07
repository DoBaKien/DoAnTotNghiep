import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";

import { BoxContent, InputFind, StackContent } from "./Style";
import { BoxHome, PaperUser } from "../../Assert/Style";
import {
  Avatar,
  Box,
  InputAdornment,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import axios from "axios";

import "../../Assert/index.css";
import { Link } from "react-router-dom";
function User() {
  const [users, setUsers] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(`/user/getAllUser`)
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const ser = (val) => {
    if (search === "") {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  };

  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <StackContent direction="row" sx={{ marginTop: 2 }}>
        <LeftSide></LeftSide>
        <BoxContent>
          <Typography variant="h4">Người dùng</Typography>

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
          <Box sx={{ marginTop: 5, marginBottom: 5, padding: 1 }}>
            <Grid2
              container
              spacing={{ xs: 1, md: 3 }}
              columns={{ xs: 1, sm: 10, lg: 12 }}
            >
              {Array.from(users)
                .filter(ser)
                .map((user, index) => (
                  <Grid2 xs={3} sm={7} md={4} key={index}>
                    <Link
                      to={`/profile/${user.uid}`}
                      style={{ textDecoration: "none" }}
                    >
                      <PaperUser>
                        <Stack direction="row" spacing={2}>
                          <Box
                            sx={{
                              width: 50,
                              height: 60,
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            <Avatar
                              alt="Avatar"
                              src={user.avatar || user.name}
                              sx={{ width: 50, height: 50 }}
                            />
                          </Box>
                          <Box
                            sx={{
                              height: 60,
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ marginBottom: 0.5 }}
                              className="title"
                            >
                              {user.name}
                            </Typography>
                            <Typography variant="caption">
                              {user.location || "Không có"}
                            </Typography>
                          </Box>
                        </Stack>
                      </PaperUser>
                    </Link>
                  </Grid2>
                ))}
            </Grid2>
          </Box>
        </BoxContent>
      </StackContent>
    </BoxHome>
  );
}

export default User;
