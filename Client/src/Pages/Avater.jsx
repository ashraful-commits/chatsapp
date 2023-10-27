import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import { UpdateUser } from "../Feature/AuthApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllSate } from "../Feature/AuthSlice";
const Avater = () => {
  const api = "https://api.multiavatar.com/45678945";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const { loggedInData } = useSelector(getAllSate);

  const setProfilePicture = async () => {
    if (selectedAvatar === "") {
      toast.success("Please Select an avatar", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const user = await JSON.parse(localStorage.getItem("LoggedInUser"));

      if (user?.isAvatarImageSet) {
        navigate("/");
      } else {
        dispatch(
          UpdateUser({ id: user?._id, avatar: avatars[selectedAvatar] })
        );
        user.isAvatarImageSet = true;
        user.avatarImage = avatars[selectedAvatar];
        localStorage.setItem("LoggedInUser", JSON.stringify(user));

        if (loggedInData?.isAvatarImageSet) {
          navigate("/");
        }
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const getAvatarAuth = async () => {
      const user = await JSON.parse(localStorage.getItem("LoggedInUser"));
      if (user.isAvatarImageSet) {
        navigate("/");
      }
      if (!user) {
        navigate("/login");
      }
    };
    getAvatarAuth();
  }, []);
  return (
    <>
      <Container>
        {isLoading ? (
          <div className="loader">
            <p className="">Loading...</p>
          </div>
        ) : (
          <>
            <div className="title">
              <h1>Pick an avatar as your profile picture</h1>
              <div className="avatars">
                {avatars?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`avatar ${
                        selectedAvatar === index ? "selected" : ""
                      }`}
                    >
                      <img
                        src={`data:image/svg+xml;base64,${item}`}
                        alt={item}
                        onClick={() => setSelectedAvatar(index)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <button className="submit-btn" onClick={setProfilePicture}>
              Set as Profile Picture
            </button>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  .loader {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: white;
    }
  }
  .title {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default Avater;
