import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../store/userSlice";
import { BaseUrl } from "../utils/constance";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const logoutHandler = async () => {
    await axios.post(BaseUrl + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-pink-600">
          👨‍🎓Intern Swipe
        </Link>
      </div>
      {user._id && (
        <div className="flex-none gap-2">
          <p>
            {/* hii there{" "} */}
            {user.firstName ? user.firstName + " " + user.lastName : "Someone"}
          </p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user.profilePic
                      ? user.profilePic
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/request/receive">Request</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <Link onClick={logoutHandler}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
