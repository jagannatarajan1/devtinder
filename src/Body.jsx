import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "./utils/constance";
import axios from "axios";
import { addUser } from "./store/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const profile = async () => {
    if (Object.keys(user).length === 0) {
      console.log("no user");
      try {
        const userProfile = await axios.get(BaseUrl + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(userProfile.data));
      } catch (error) {
        navigate("/login");
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    profile();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
