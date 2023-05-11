import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import JoditEditor from "jodit-react";
import { useContext, useEffect, useRef, useState } from "react";
import { BoxHome } from "../../Assert/Style";
import Header from "../../Component/Header/Header";
import { BoxContent, BoxNav } from "../CreatePost/Style";
import CloseIcon from "@mui/icons-material/Close";
import { ProLanguage } from "../../Assert/DataProLanguage";
import axios from "axios";
import { PhotoCamera } from "@mui/icons-material";
import { storage } from "../../Assert/Config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Component/Auth/AuthContext";
import NotFound from "../../Component/NotFound/NotFound";
import Swal from "sweetalert2";

function EditPost() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { type, qid } = useParams();
  const [tags, setTags] = useState("");
  const [title, setTitle] = useState("");
  const [personName, setPersonName] = useState([]);
  const [tt, setTT] = useState("");

  const [fileImage, setFileImage] = useState("");

  const [user, setUser] = useState("");
  const [post, setPost] = useState([
    { qdid: 1, type: "text", content: "", qid: qid },
  ]);
  const editor = useRef(null);

  useEffect(() => {
    const getAllTag = async () => {
      try {
        const response = await axios.get("/tag/getAllTag");
        setTags(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getQuestionById = async () => {
      try {
        const response = await axios.get(`question/getQuestionById/${qid}`);
        setTitle(response.data.title);
        setUser(response.data.uid);
      } catch (error) {
        console.error(error);
      }
    };

    const getQuestionDetailByQid = async () => {
      try {
        const response = await axios.get(
          `question/getQuestionDetailByQid/${qid}`
        );
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllTag();
    getQuestionById();
    getQuestionDetailByQid();
  }, [qid]);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handlePost = async () => {
    if (post === [] || personName === "" || tt === "") {
      Swal.fire("Thiếu thông tin", "Vui lòng điền đầy đủ thông tin", "error");
    } else {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        showConfirmButton: false,
        timer: 1500,
      });

      axios
        .put(`/question/edit/${qid}`, {
          title: title,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .put(`/question/edit/${qid}`, {
          title: title,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .post(`/question/modifyTagPost/${qid}`, personName)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .post(`/question/editDetail/${qid}`, post)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .post(`/question/createActivityHistory/${qid}`, {
          action: "Sửa câu hỏi",
          description: tt,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      await sleep(2000);
      navigate(`/post/${qid}`);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  function handleInputChange(event, index, key) {
    const updatedUsers = [...post];
    updatedUsers[index][key] = event;
    setPost(updatedUsers);
  }

  function deleteUser(id) {
    console.log(id);
    const newPost = post.filter((user) => user.qdid !== id);
    setPost(newPost);
  }

  const metadata = {
    contentType: "image/jpeg",
  };

  const notiDel = (id, language) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa ?",
      text: "Khi bạn xóa hình thì bạn phải đăng lại hình mới",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");

        deleteImage(id, language);
      }
    });
  };

  function deleteImage(id, language) {
    const newPost = post.filter((user) => user.qdid !== id);
    setPost(newPost);
    axios
      .post(`/question/editDetail/${qid}`, newPost)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (language === "") {
      const desertRef = ref(storage, "images/" + fileImage);
      deleteObject(desertRef)
        .then(() => {
          console.log("asd");
          setFileImage("");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const desertRef = ref(storage, "images/" + language);
      deleteObject(desertRef)
        .then(() => {
          console.log("asd");
          setFileImage("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const uploadImage = async (file, index, key) => {
    const storageRef = ref(storage, "images/" + file.name);
    setFileImage(file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const updatedUsers = [...post];
          updatedUsers[index][key] = downloadURL;
          updatedUsers[index]["programLanguage"] = file.name;

          setPost(updatedUsers);
        });
      }
    );
  };
  const handleImageUpload = async (e, index, key) => {
    const file = e.target.files[0];
    console.log(file.name);
    await uploadImage(file, index, key);
  };
  const handleAdd = (e) => {
    setPost([...post, { id: post.length + 1, type: e, content: "", qid: qid }]);
  };
  const Suit = (e, id, i, da, language) => {
    if (e === "code") {
      return (
        <Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <IconButton color="error" onClick={() => deleteUser(id)}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Code</Typography>
            <Autocomplete
              disablePortal
              options={ProLanguage}
              sx={{ width: 200, marginLeft: 5, marginBottom: 1 }}
              value={language}
              onInputChange={(event, newValue) => {
                handleInputChange(newValue, i, "programLanguage");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Language" />
              )}
            />
          </Stack>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            fullWidth
            value={da}
            placeholder="Enter code"
            onChange={(e) => handleInputChange(e.target.value, i, "content")}
          />
        </Box>
      );
    } else if (e === "text") {
      return (
        <Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <IconButton color="error" onClick={() => notiDel(id, language)}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Text</Typography>
          </Stack>
          <Box sx={{ color: "black" }}>
            <JoditEditor
              ref={editor}
              tabIndex={1}
              value={da}
              onBlur={(newContent) =>
                handleInputChange(newContent, i, "content")
              }
              onChange={(newContent) =>
                handleInputChange(newContent, i, "content")
              }
            />
          </Box>
        </Box>
      );
    } else if (e === "image") {
      return (
        <Box>
          <IconButton color="error" onClick={() => notiDel(id, language)}>
            <CloseIcon />
          </IconButton>
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
            sx={{ marginLeft: 5 }}
          >
            Thêm ảnh
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => handleImageUpload(e, i, "content")}
            />
          </Button>

          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            {da && <img src={da} alt="Selected" style={{ width: "50%" }} />}
          </Box>
        </Box>
      );
    }
  };

  const TagBox = () => {
    if (tags && tags.length > 0) {
      return (
        <Select multiple value={personName} onChange={handleChange}>
          {tags.map((tag) => (
            <MenuItem key={tag.tid} value={tag.tid}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      );
    }
  };

  return (
    <>
      {user === currentUser ? (
        <BoxHome color={"text.primary"}>
          <Header />
          <BoxNav>
            <Typography variant="h3">Sửa câu hỏi</Typography>
          </BoxNav>
          <BoxContent
            sx={{
              margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
            }}
          >
            <Typography variant="h6">Tiêu đề</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </BoxContent>

          {post.map((data, i) => {
            return (
              <BoxContent
                key={i}
                sx={{
                  margin: {
                    lg: "10px 200px 0px 200px",
                    xs: "10px 10px 0px 10px",
                  },
                }}
              >
                {Suit(
                  data.type,
                  data.qdid,
                  i,
                  data.content,
                  data.programLanguage
                )}
              </BoxContent>
            );
          })}
          <BoxContent
            sx={{
              margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
            }}
          >
            <Button
              variant="contained"
              sx={{ marginRight: 1 }}
              onClick={() => handleAdd("text")}
            >
              Add Text
            </Button>
            <Button
              variant="contained"
              sx={{ marginRight: 1 }}
              onClick={() => handleAdd("code")}
            >
              Add code
            </Button>
            <Button
              variant="contained"
              sx={{ marginRight: 1 }}
              onClick={() => handleAdd("image")}
            >
              Add image
            </Button>
          </BoxContent>
          <BoxContent
            sx={{
              margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
            }}
          >
            <Typography variant="h6">Thẻ</Typography>
            <FormControl fullWidth>{TagBox()}</FormControl>
          </BoxContent>
          <BoxContent
            sx={{
              margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
            }}
          >
            <Typography variant="h6">Tóm tắt chỉnh sửa</Typography>
            <TextField
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              placeholder="Tóm tắt"
              onChange={(e) => setTT(e.target.value)}
            />
          </BoxContent>
          <BoxContent
            sx={{
              margin: { lg: "10px 200px 0px 200px", xs: "10px 10px 0px 10px" },
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button variant="contained" onClick={handlePost}>
              Sửa
            </Button>
          </BoxContent>
          <Box sx={{ height: 30, width: "100%" }}></Box>
        </BoxHome>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default EditPost;
