import { Typography } from "@mui/material";
import Header from "../../Component/Header/Header";
import { BoxContent, BoxHome } from "./Style";

function Home() {
  return (
    <BoxHome sx={{ height: "100vh" }} color={"text.primary"}>
      <Header />

      <BoxContent>
        <Typography variant="body1">
          Sau khi chè chén no say, có lẽ vì muốn “lấy thân báo đáp” nên chú mèo
          đã dí theo cô về tận nhà, muốn cho cô cơ hội được phục vụ mình. Cô gái
          thấy thế vội vã đóng cửa lại nhưng không ngờ quàng thượng này lì quá,
          nó cạy cửa ra rồi cố gắng lách mình vào trong nhà. Không còn cách nào
          khác, cô gái đành phải tạm thời thu nhận tên giang hồ meo này về nuôi.
        </Typography>
      </BoxContent>
    </BoxHome>
  );
}

export default Home;
