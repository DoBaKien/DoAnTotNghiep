import { BoxContent, BoxUser } from "./Style";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import parse from "html-react-parser";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import HistoryIcon from "@mui/icons-material/History";
import ReportIcon from "@mui/icons-material/Report";
export const AnswerDetails = (answer) => {
  const ad = () => {
    if (answer && answer.length > 0) {
      return (
        <>
          {answer.map((item, i) => (
            <BoxContent sx={{ marginTop: 2 }} key={i}>
              <Stack direction="row">
                <Box
                  sx={{
                    width: 40,
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton color={item.voteValue === "Up" ? "primary" : ""}>
                    <NorthIcon fontSize="small" />
                  </IconButton>

                  <Typography variant="subtitle1">{item.answerVote}</Typography>
                  <IconButton
                    color={item.voteValue === "Down" ? "primary" : ""}
                  >
                    <SouthIcon fontSize="small" />
                  </IconButton>
                  <Tooltip title="Lịch sử chỉnh sửa" placement="left">
                    <IconButton>
                      <HistoryIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Báo cáo" placement="left">
                    <IconButton>
                      <ReportIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ marginTop: 0.5 }}>
                  <BoxUser direction="row" spacing={2}>
                    <Avatar>{item.user.name}</Avatar>
                    <Typography>{item.user.name}</Typography>
                  </BoxUser>
                  <Box>
                    {item.answerDetails.map((subItem, i) => {
                      if (subItem.type === "text") {
                        return (
                          <Box key={i}>
                            <div>{parse(subItem.content)}</div>
                          </Box>
                        );
                      } else {
                        return (
                          <Box key={i}>
                            <SyntaxHighlighter
                              language={subItem.programLanguage}
                              style={atomOneDark}
                            >
                              {subItem.content}
                            </SyntaxHighlighter>
                          </Box>
                        );
                      }
                    })}
                  </Box>
                </Box>
              </Stack>
            </BoxContent>
          ))}
        </>
      );
    } else if (answer === "") {
      return (
        <BoxContent>
          <CircularProgress />
        </BoxContent>
      );
    } else if (answer.length === 0) {
      return (
        <BoxContent>
          <Typography variant="h6">Không có câu trả lời</Typography>
        </BoxContent>
      );
    }
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h5">Câu trả lời</Typography>
      {ad()}
    </Box>
  );
};
