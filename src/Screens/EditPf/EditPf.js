import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BoxHome } from "../../Assert/Style";
import Header from "../../Component/Header/Header";
import { BoxContent, BoxTitle } from "./Style";
import { countries } from "../../Assert/DataLocation";

import { useState } from "react";
import Avatar from "react-avatar-edit";
import { useNavigate } from "react-router-dom";
function EditPf() {
  const [src, setScr] = useState(null);
  const [pre, setPre] = useState(null);
  const navigate = useNavigate();
  const onCrop = (view) => {
    setPre(view);
  };
  const onClose = () => {
    setPre(null);
  };

  const handleCancel = () => {};

  return (
    <BoxHome color={"text.primary"}>
      <Header />

      <BoxTitle>
        <Typography variant="h4">User Setting</Typography>
        <Divider variant="inset" />
      </BoxTitle>

      <BoxContent>
        <Box>
          <Typography variant="h5">Display name</Typography>
          <Typography variant="body2" color="gray">
            Set a display name. This does not change your username.
          </Typography>
          <TextField
            sx={{ marginTop: 1 }}
            placeholder="Display name"
            fullWidth
          />
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5">Location</Typography>
          <Autocomplete
            fullWidth
            disablePortal
            options={countries}
            sx={{ marginTop: 1 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Location" />
            )}
          />
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5">About</Typography>
          <Typography variant="body2" color="gray">
            A brief description of yourself shown on your profile.
          </Typography>
          <TextField
            multiline
            sx={{ marginTop: 1 }}
            placeholder="Display name"
            fullWidth
            rows={4}
          />
          <Typography variant="body2" color="gray">
            200 Characters remaining
          </Typography>
        </Box>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          sx={{
            justifyContent: "center",
            marginTop: 3,
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              margin: "0 auto",
              backgroundColor: "white",
            }}
          >
            <Avatar
              width={200}
              height={200}
              onCrop={onCrop}
              onClose={onClose}
              src={src}
            />
          </Box>
          <Box
            sx={{
              width: 200,
              height: 200,
              margin: "0 auto",
              marginTop: 3,
            }}
          >
            {pre && <img src={pre} alt="avatar" />}
          </Box>
        </Stack>
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          <Button variant="contained" sx={{ marginRight: 2 }}>
            Save profile
          </Button>
          <Button variant="text" onClick={() => navigate(-1)}>Cancel</Button>
        </Box>
      </BoxContent>
    </BoxHome>
  );
}

export default EditPf;
