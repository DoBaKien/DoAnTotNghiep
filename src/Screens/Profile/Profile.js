import { Avatar, Box, Button, Typography } from "@mui/material";
import { BoxHome } from "../../Assert/Style";
import Header from "../../Component/Header/Header";
import { BoxContent, BoxName, StackContent } from "./Style";

function Profile() {
  return (
    <BoxHome color={"text.primary"}>
      <Header />

      <BoxContent>
        <StackContent direction={{ xs: "column", lg: "row" }}>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Avatar sx={{ width: 100, height: 100 }}>A</Avatar>
          </Box>
          <BoxName>
            <Typography
              variant="h5"
              sx={{
                display: { lg: "none", xs: "block" },
                textAlign: { lg: "start", xs: "center" },
              }}
            >
              Nameasdasdsaddasasd
            </Typography>
            <Typography
              variant="h3"
              sx={{ display: { lg: "block", xs: "none" } }}
            >
              Nameasdasdsaddasasd
            </Typography>
            <Typography sx={{ textAlign: { lg: "start", xs: "center" } }}>
              Location
            </Typography>
          </BoxName>
          <Box
            sx={{
              width: "100%",
              height: 40,
              display: "flex",
              justifyContent: { lg: "end", xs: "center" },
            }}
          >
            <Button variant="outlined">Edit Profile</Button>
          </Box>
        </StackContent>
      </BoxContent>
    </BoxHome>
  );
}

export default Profile;
