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

import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { useNavigate, useParams } from "react-router-dom";
import { dataLocation } from "../../Assert/DataLocation";
import axios from "axios";
import Swal from "sweetalert2";

function EditPf() {
  const id = useParams().id;
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState(dataLocation[0]);
  const [pre, setPre] = useState(null);
  const navigate = useNavigate();
  const maxLength = 200;
  let count = 0;
  if (about) {
    count = about.length;
  }
  const maxLengthName = 30;
  const countName = name.length;
  useEffect(() => {
    axios
      .get(`/user/findByUid/${id}`)
      .then(function (response) {
        setName(response.data.name);
        setAbout(response.data.about);
        setLocation(response.data.location);
        setPre(response.data.avatar);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  const onCrop = (view) => {
    setPre(view);
  };
  const onClose = () => {
    setPre(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`user/updateUser`, {
        name: name,
        about: about,
        location: location,
        avatar: pre,
      })
      .then((res) => {
        Swal.fire("Thành công", "Bạn cập nhật thông tin thành công", "success");
        navigate(-1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <BoxHome color={"text.primary"}>
      <Header />

      <BoxTitle>
        <Typography variant="h4">Chỉnh sửa thông tin</Typography>
        <Divider variant="inset" />
      </BoxTitle>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <BoxContent>
          <Box>
            <Typography variant="h5">Tên hiển thị</Typography>
            <Typography variant="body2" color="gray">
              Đặt tên hiển thị. Điều này không thay đổi tên người dùng của bạn.
            </Typography>
            <TextField
              sx={{ marginTop: 1 }}
              placeholder="Tên hiển thị"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{ maxLength: maxLengthName }}
              helperText={`Còn lại ${
                maxLengthName - countName
              }/${maxLengthName} ký tự`}
            />
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h5">Địa chỉ</Typography>
            <Autocomplete
              fullWidth
              disablePortal
              value={location}
              onChange={(event, newValue) => {
                setLocation(newValue);
              }}
              options={dataLocation}
              sx={{ marginTop: 1 }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Địa chỉ" />
              )}
            />
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h5">Về bản thân</Typography>
            <Typography variant="body2" color="gray">
              Một mô tả ngắn gọn về bản thân được hiển thị trên hồ sơ của bạn.
            </Typography>
            <TextField
              multiline
              sx={{ marginTop: 1 }}
              placeholder="Về bản thân"
              fullWidth
              rows={2}
              value={about || ""}
              inputProps={{ maxLength: maxLength }}
              onChange={(e) => setAbout(e.target.value)}
              helperText={`Còn lại ${maxLength - count}/${maxLength} ký tự`}
            />
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
                src={null}
                label="Choose avatar"
                hidden
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
            <Button variant="contained" sx={{ marginRight: 2 }} type="submit">
              Lưu thông tin
            </Button>
            <Button variant="text" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Box>
        </BoxContent>
      </form>
    </BoxHome>
  );
}

export default EditPf;
