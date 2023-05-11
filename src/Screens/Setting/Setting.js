import { Box, Divider, Typography } from "@mui/material";
import { BoxHome } from "../../Assert/Style";
import Header from "../../Component/Header/Header";
import { BoxContent, BoxTitle } from "../EditPf/Style";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Component/Auth/AuthContext";
import axios from "axios";

function Setting() {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState("");
  useEffect(() => {
    const GetTotalVoteValue = async () => {
      try {
        const response = await axios.get(`/user/findByUid/${currentUser}`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser !== "") {
      GetTotalVoteValue();
    }
  }, [currentUser]);
  return (
    <BoxHome color={"text.primary"}>
      <Header />

      <BoxTitle>
        <Typography variant="h4">Cài đặt</Typography>
        <Divider variant="inset" />
      </BoxTitle>

      <BoxContent>
        <Box>
          <Typography variant="h5">Địa chỉ Email</Typography>
          <Typography variant="bdoy2">{data.email}</Typography>
        </Box>
      </BoxContent>
    </BoxHome>
  );
}

export default Setting;
