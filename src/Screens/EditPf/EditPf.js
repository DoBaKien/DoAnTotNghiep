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

import { useState } from "react";
import Avatar from "react-avatar-edit";
import { useNavigate } from "react-router-dom";
import { dataLocation } from "../../Assert/DataLocation";

function EditPf() {
  const [pre, setPre] = useState(null);
  const navigate = useNavigate();
  const onCrop = (view) => {
    setPre(view);
  };
  const onClose = () => {
    setPre(null);
  };

  return (
    <BoxHome color={"text.primary"}>
      <Header />

      <BoxTitle>
        <Typography variant="h4">Chỉnh sửa thông tin</Typography>
        <Divider variant="inset" />
      </BoxTitle>

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
          />
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5">Địa chỉ</Typography>
          <Autocomplete
            fullWidth
            disablePortal
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
            rows={4}
          />
          <Typography variant="body2" color="gray">
            Giới hạn 200 từ
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
          <Button variant="contained" sx={{ marginRight: 2 }}>
            Lưu thông tin
          </Button>
          <Button variant="text" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Box>
      </BoxContent>
    </BoxHome>
  );
}

export default EditPf;
