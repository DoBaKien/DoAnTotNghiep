import { Box, Button, Divider, Typography } from "@mui/material";
import { BoxHome } from "../../Assert/Style";
import Header from "../../Component/Header/Header";
import { BoxContent, BoxTitle } from "../EditPf/Style";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Component/Auth/AuthContext";
import axios from "axios";
import ModalChangePass from "./ModalChangePass";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function Setting() {
  const { currentUser, test } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const cookie = Cookies.get("sessionCookie");

  const [data, setData] = useState("");
  useEffect(() => {
    const GetTotalVoteValue = async () => {
      try {
        const response = await axios.get(`/user/findByUid/${currentUser}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser !== "") {
      GetTotalVoteValue();
    }
  }, [currentUser, test]);

  const handleResetPass = () => {
    setModal(!modal);
  };

  return (
    <>
      {cookie !== undefined ? (
        <BoxHome color={"text.primary"}>
          <ModalChangePass
            modal={modal}
            setModal={setModal}
            email={data.email}
          />
          <Header />
          <BoxTitle>
            <Typography variant="h4">Cài đặt</Typography>
            <Divider variant="inset" />
          </BoxTitle>

          <BoxContent>
            <Box>
              <Typography variant="h5">Địa chỉ Email</Typography>
              <Typography variant="body2">{data.email}</Typography>
            </Box>
          </BoxContent>
          <BoxContent sx={{ marginTop: 2 }}>
            <Box>
              <Button
                variant="contained"
                onClick={handleResetPass}
                color="error"
                sx={{ borderRadius: 5, padding: "10px 50px" }}
              >
                Đổi mật khẩu
              </Button>
            </Box>
          </BoxContent>
          <BoxContent sx={{ marginTop: 2 }}>
            <Box>
              <Button
                variant="outlined"
                color="error"
                sx={{ borderRadius: 5, padding: "10px 50px" }}
              >
                Vô hiệu hóa
              </Button>
            </Box>
          </BoxContent>
        </BoxHome>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Setting;
