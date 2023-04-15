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
import { useNavigate } from "react-router-dom";

function User() {
  const navigation = useNavigate();
  const [users, setUsers] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(`/user/getAllUser`)
      .then(function (response) {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handlePf = (id) => {
    navigation(`/profile/${id}`);
  };
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
        <BoxContent sx={{ width: { xs: "100vw", lg: "60vw" } }}>
          <Typography variant="h4">Người dùng</Typography>
          <Box sx={{ width: "40vw", marginTop: 2 }}></Box>
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
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(users)
                .filter(ser)
                .map((user, index) => (
                  <Grid2 xs={4} sm={4} md={4} key={index}>
                    <PaperUser onClick={() => handlePf(user.uid)}>
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
                          <Avatar sx={{ width: 50, height: 50 }}>
                            {user.name}
                          </Avatar>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            height: 60,
                          }}
                        >
                          <Typography sx={{ marginBottom: 1 }}>
                            {user.name}
                          </Typography>
                          <Typography>Location</Typography>
                        </Box>
                      </Stack>
                    </PaperUser>
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
