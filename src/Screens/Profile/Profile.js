import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import {
  BoxAbout,
  BoxHome,
  BoxName,
  StackContent,
  BoxContent,
} from "../../Assert/Style";
import Header from "../../Component/Header/Header";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../Component/Auth/AuthContext";
import axios from "axios";
import LeftSide from "./LeftSide";

import My from "./My";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const id = useParams();
  const [page, setPage] = useState(<My id={id.id} />);
  const [data, setData] = useState("");
  const navigation = useNavigate();

  const handleEditPage = () => {
    navigation(`/editpf/${id.id}`);
  };
  useEffect(() => {
    axios
      .get(`/user/findByUid/${id.id}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const btnEdit = () => {
    if (id.id === currentUser) {
      return (
        <>
          <Button variant="outlined" onClick={handleEditPage}>
            Chỉnh sửa
          </Button>
        </>
      );
    }
  };

  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <BoxContent sx={{ display: "flex", justifyContent: "center" }}>
        <StackContent
          direction={{ xs: "column", lg: "row" }}
          sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}
        >
          <Stack direction={{ xs: "column", lg: "row" }}>
            <Box
              sx={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Avatar
                alt="Avatar"
                src={data.avatar || data.name}
                sx={{ width: 100, height: 100 }}
              />
            </Box>
            <BoxName sx={{ paddingLeft: { lg: 5, xs: 0 } }}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: { lg: "start", xs: "center" },
                }}
              >
                {data.name}
              </Typography>
              <Typography sx={{ textAlign: { lg: "start", xs: "center" } }}>
                {data.location}
              </Typography>
            </BoxName>
          </Stack>
          <Box
            sx={{
              height: 40,
              display: "flex",
              justifyContent: { lg: "end", xs: "center" },
            }}
          >
            {btnEdit()}
          </Box>
        </StackContent>
      </BoxContent>

      <BoxContent sx={{ marginTop: 3 }}>
        <BoxAbout>
          <Typography variant="h5">Về bản thân</Typography>
          <Typography>{data.about}</Typography>
        </BoxAbout>
      </BoxContent>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        {currentUser === id.id ? (
          <LeftSide page={page} setPage={setPage} id={id.id} />
        ) : (
          <></>
        )}

        {page}
      </Stack>
    </BoxHome>
  );
}

export default Profile;
