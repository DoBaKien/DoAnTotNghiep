import { BoxContent } from "./Style";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import parse from "html-react-parser";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
export const AnswerDetails = (qid, answer) => {
  const ad = () => {
    if (answer && answer.length > 0) {
      return (
        <>
          {answer.map((item, i) => (
            <BoxContent sx={{ marginTop: 2 }} key={i}>
              <Stack direction="row">
                <Box
                  sx={{
                    width: 50,

                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton>
                    <NorthIcon />
                  </IconButton>

                  <Typography variant="h6" sx={{ marginBottom: 0.6 }}>
                    {item.answerVote}
                  </Typography>
                  <IconButton>
                    <SouthIcon />
                  </IconButton>
                </Box>
                <Box sx={{ marginTop: 0.5 }}>
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
