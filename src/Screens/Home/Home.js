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
import {
  BoxContent,
  BoxDetails,
  BoxTag,
  BoxText,
  BoxTitle,
  CrePost,
  StackContent,
  StackCreate,
  StackPost,
  StyledBadge,
} from "./Style";
import { BoxHome } from "../../Assert/Style";
import { useNavigate } from "react-router-dom";
import "./Home.css";
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
                  <Typography component="div" className="title">
                    SQL Error mismatched input 'sql_query' expecting when using
                    Create Table in Pyspark SQL Error mismatched input
                    'sql_query' expecting when using Create Table in Pyspark SQL
                    Error mismatched input 'sql_query' expecting when using
                    Create Table in Pyspark
                  </Typography>
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
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        width: 300,
                        alignItems: "center",
                        marginTop: { xs: 1, lg: 0 },
                        marginBottom: { xs: 1, lg: 0 },
                      }}
                    >
                      <Avatar sx={{ width: 35, height: 35 }}>N</Avatar>

                      <Typography>Name Account</Typography>
                    </Stack>
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
