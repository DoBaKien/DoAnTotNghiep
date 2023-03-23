import { Box, Typography, Avatar, IconButton, InputBase } from "@mui/material";
import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddLinkIcon from "@mui/icons-material/AddLink";
import {
  BoxContent,
  BoxHome,
  CrePost,
  StackContent,
  StackCreate,
  StyledBadge,
} from "./Style";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("/create");
  };
  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <StackContent direction="row">
        <LeftSide></LeftSide>
        <Box>
          <StackCreate direction="row" spacing={2}>
            <Box>
              <IconButton>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
                </StyledBadge>
              </IconButton>
            </Box>

            <CrePost>
              <InputBase
                sx={{ ml: 2, flex: 1, fontSize: 22 }}
                fullWidth
                placeholder="Create Post."
                onClick={handleCreate}
              />
            </CrePost>
            <IconButton onClick={handleCreate}>
              <InsertPhotoIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={handleCreate}>
              <AddLinkIcon fontSize="large" />
            </IconButton>
          </StackCreate>

          <BoxContent>
            {Array.from(Array(6)).map(() => (
              <Typography variant="body1">
                Sau khi chè chén no say, có lẽ vì muốn “lấy thân báo đáp” nên
                chú mèo đã dí theo cô về tận nhà, muốn cho cô cơ hội được phục
                vụ mình. Cô gái thấy thế vội vã đóng cửa lại nhưng không ngờ
                quàng thượng này lì quá, nó cạy cửa ra rồi cố gắng lách mình vào
                trong nhà. Không còn cách nào khác, cô gái đành phải tạm thời
                thu nhận tên giang hồ meo này về nuôi.
              </Typography>
            ))}
          </BoxContent>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default Home;
