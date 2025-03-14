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

  console.log(user);
  const profile = async () => {
    if (Object.keys(user).length <= 0) {
      try {
        const res = await axios.get(BaseUrl + "/profile/view", {
          withCredentials: true,
        });

        if (res?.data?.firstName) {
          dispatch(addUser(res.data));
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.log("Redirecting to login due to error:", error.message);
        navigate("/login");
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
