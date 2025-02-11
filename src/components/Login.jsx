import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import { BaseUrl } from "../utils/constance";

const Login = () => {
  const dispatch = useDispatch();
  const [emailId, setEmail] = useState("raj@gmail.com");
  const [password, setPassword] = useState("GhostGopal@123");
  const [error, seterror] = useState("");
  const navigation = useNavigate();

  const loginFormHandler = async () => {
    try {
      const login = await axios.post(
        BaseUrl + "/login",
        {
          emailId: emailId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(login.data));
      navigation("/");
      setEmail("");
      setPassword("");
    } catch (err) {
      seterror(err?.response?.data);
      console.error("Error logging in:", err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 lg:w-1/4 max-w-md border p-7 rounded-lg border-gray-500">
        {/* Email Input */}
        <label className="input input-bordered flex items-center gap-2 my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={emailId} // ✅ Fixed: Added value
            onChange={(e) => setEmail(e.target.value)} // ✅ Fixed: Corrected event handling
          />
        </label>

        {/* Password Input */}
        <label className="input input-bordered flex items-center gap-2 my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="*******"
            className="grow"
            value={password} // ✅ Fixed: Controlled input
            onChange={(e) => setPassword(e.target.value)} // ✅ Fixed: Corrected event handling
          />
        </label>
        {error && <p className="text-red-500 text-xs">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="border border-1 w-full py-2 mt-2 rounded-md"
          onClick={loginFormHandler} // ✅ Fixed: Corrected event handling
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
