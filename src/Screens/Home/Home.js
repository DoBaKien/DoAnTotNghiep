import {
  Box,
  Typography,
  Avatar,
  IconButton,
  InputBase,
  Stack,
  Divider,
} from "@mui/material";
import Header from "../../Component/Header/Header";
import LeftSide from "../../Component/LeftSide/LeftSide";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddLinkIcon from "@mui/icons-material/AddLink";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {
  BoxContent,
  BoxDetails,
  BoxText,
  BoxTitle,
  CrePost,
  StackContent,
  StackCreate,
  StackName,
  StackPost,
  StyledBadge,
  TypographyTitle,
} from "./Style";
import { BoxHome, BoxTag } from "../../Assert/Style";
import { useNavigate } from "react-router-dom";
import "./Home.css";
function Home() {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("/create");
  };
  const handlePost = () => {
    navigate("/post");
  };
  return (
    <BoxHome color={"text.primary"}>
      <Header />
      <StackContent direction="row" sx={{ marginTop: 2 }}>
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

            <CrePost sx={{ display: { xs: "none", lg: "block" } }}>
              <InputBase
                sx={{ ml: 2, flex: 1, fontSize: 22 }}
                fullWidth
                placeholder="Create Post."
                onClick={handleCreate}
              />
            </CrePost>
            <IconButton
              onClick={handleCreate}
              sx={{ display: { xs: "block", lg: "none" } }}
            >
              <PostAddIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={handleCreate}>
              <InsertPhotoIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={handleCreate}>
              <AddLinkIcon fontSize="large" />
            </IconButton>
          </StackCreate>

          <BoxContent>
            {Array.from(Array(6)).map((_, i) => (
              <StackPost
                key={i}
                direction="row"
                spacing={2}
                divider={
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ display: { xs: "none", lg: "block" } }}
                  />
                }
              >
                <BoxDetails sx={{ display: { xs: "none", lg: "block" } }}>
                  <BoxText>
                    <Typography>1 vote</Typography>
                  </BoxText>
                  <BoxText>
                    <Typography>1 answer</Typography>
                  </BoxText>
                  <BoxText>
                    <Typography>1 view</Typography>
                  </BoxText>
                </BoxDetails>

                <BoxTitle>
                  <TypographyTitle
                    component="div"
                    className="title"
                    onClick={handlePost}
                  >
                    SQL Error mismatched input 'sql_query' expecting when using
                    Create Table in Pyspark SQL Error mismatched input
                    'sql_query' expecting when using Create Table in Pyspark SQL
                    Error mismatched input 'sql_query' expecting when using
                    Create Table in Pyspark
                  </TypographyTitle>
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    sx={{ marginTop: 1 }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ width: "100%", alignItems: "center" }}
                    >
                      {Array.from(Array(3)).map((_, i) => (
                        <BoxTag key={i}>
                          <Typography variant="body2">asd {i}</Typography>
                        </BoxTag>
                      ))}
                    </Stack>
                    <StackName
                      direction="row"
                      spacing={2}
                      sx={{
                        marginTop: { xs: 1, lg: 0 },
                        marginBottom: { xs: 1, lg: 0 },
                      }}
                    >
                      <Avatar sx={{ width: 35, height: 35 }}>N</Avatar>

                      <Typography>Name Account</Typography>
                    </StackName>
                  </Stack>
                </BoxTitle>
              </StackPost>
            ))}
          </BoxContent>
        </Box>
      </StackContent>
    </BoxHome>
  );
}

export default Home;
