import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";

import { BoxContent, StackContent } from "./Style";
import { BoxHome, BoxTag } from "../../Assert/Style";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
function Post() {
  const editor = useRef(null);
  const { qid } = useParams();
  console.log(qid);
  const codeString = `.title {
    display: block;
    display: -webkit-box;
    height: 16px * 1.3 * 3;
    font-size: 20px;
    line-height: 1.3;
    -webkit-line-clamp: 2; /* số dòng hiển thị */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
    cursor: pointer;
  }
  `;

  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <StackContent direction="row" sx={{ marginTop: 2 }}>
        <LeftSide></LeftSide>
        <Box>
          <BoxContent sx={{ width: "60vw" }}>
            <Typography variant="h5">
              WAndroid - Image glitches and loaded to another item(which has
              null or empty image from api) in recycler view when scrolling
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Date: 3/2/2023
            </Typography>
          </BoxContent>

          <BoxContent sx={{ marginTop: 2 }}>
            <Stack direction="row">
              <Box
                sx={{
                  width: 30,

                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <NorthIcon />
                <Typography variant="h6" sx={{ marginBottom: 0.6 }}>
                  0
                </Typography>
                <SouthIcon />
              </Box>
              <Box sx={{ marginLeft: 3 }}>
                <Box sx={{ marginBottom: 5 }}>
                  <Typography>
                    I am having some issues implementing a circular shift in C I
                    have an function that takes a parameter call char*
                    hexadecimal values as shown below I wish to perform an
                    circular right shift on this instruction meaning if I have
                    the binary 000000000000000111000111 and wish to circular
                    shift it by 1 then by resultant would be
                    100000000000000011100011 With the last bit moved to the
                    front of the binary this is what I hope to achieve At the
                    moment, I have defined a function below void
                    perform_circular_right_shift( unsigned char* instruction,
                    int shift_by)
                    {}
                    This function takes the parameter hexadecimal values such as
                    0xA8, 0x7C, 0x20,0x1c And then performs a circular shift by
                    N How would I go about doing this.
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: 5 }}>
                  <Typography>
                    I am having some issues implementing a circular shift in C I
                    have an function that takes a parameter call char*
                    hexadecimal values as shown below I wish to perform an
                    circular right shift on this instruction meaning if I have
                    the binary 000000000000000111000111 and wish to circular
                    shift it by 1 then by resultant would be
                    100000000000000011100011 With the last bit moved to the
                    front of the binary this is what I hope to achieve At the
                    moment, I have defined a function below void
                    perform_circular_right_shift( unsigned char* instruction,
                    int shift_by)
                    {}
                    This function takes the parameter hexadecimal values such as
                    0xA8, 0x7C, 0x20,0x1c And then performs a circular shift by
                    N How would I go about doing this.
                  </Typography>
                </Box>
                <Box>
                  <SyntaxHighlighter language="cssExtras" style={atomOneDark}>
                    {codeString}
                  </SyntaxHighlighter>
                </Box>
              </Box>
            </Stack>
          </BoxContent>

          <BoxContent sx={{ marginTop: 2 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ width: "100%", alignItems: "center" }}
            >
              {Array.from(Array(3)).map((_, i) => (
                <BoxTag key={i}>
                  <Typography variant="body2">javascript {i}</Typography>
                </BoxTag>
              ))}
            </Stack>
          </BoxContent>

          <BoxContent color={"black"} sx={{ marginTop: 2 }}>
            <Typography variant="h6" color={"text.primary"}>
              Your Answer
            </Typography>
            <JoditEditor ref={editor} tabIndex={1} />
          </BoxContent>

          <BoxContent sx={{ marginTop: 2 }}>
            <Typography variant="h6">Code Example</Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              fullWidth
              placeholder="Enter code"
            />
          </BoxContent>

          <BoxContent
            sx={{
              marginTop: 2,
              justifyContent: "center",
              display: "flex",
              marginBottom: 2,
            }}
          >
            <Button variant="contained">Answer</Button>
          </BoxContent>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default Post;
