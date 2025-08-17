import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import { BaseUrl } from "../utils/constance";

const Auth = () => {
  const dispatch = useDispatch();
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const formHandler = async () => {
    try {
      const endpoint = isSignup ? "/signup" : "/login";
      const payload = isSignup
        ? { firstName, emailId, password, lastName }
        : { emailId, password };

      const response = await axios.post(BaseUrl + endpoint, payload, {
        withCredentials: true,
      });
      localStorage.setItem("user", emailId);

      console.log("login", JSON.stringify(emailId));
      dispatch(addUser(response.data));
      navigate(isSignup ? "/profile" : "/");
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      setError(err?.response?.data || "An error occurred");
      console.error("Error:", err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[repeating-linear-gradient(45deg,#F9A8D4,#F9A8D4_10px,#FBCFE8_10px,#FBCFE8_20px)]">
      {/* <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#F9A8D4,transparent)]"></div> */}
      <div className="w-80 lg:w-1/4 max-w-md border p-7 rounded-lg border-gray-500 bg-slate-50">
        <h2 className="text-center text-lg font-bold mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        {isSignup && (
          <>
            <label className="input input-bordered flex items-center gap-2 my-2">
              <input
                type="text"
                className="grow"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-2">
              <input
                type="text"
                className="grow"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </>
        )}
        <label className="input input-bordered flex items-center gap-2 my-2">
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={emailId}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-2">
          <input
            type="password"
            placeholder="password"
            className="grow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          type="submit"
          className="border border-1 w-full py-2 mt-2 rounded-md hover:bg-pink-500 hover:text-white"
          onClick={formHandler}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
        <div className="flex justify-center items-center content-center mt-4">
          <p className="text-center  text-sm pr-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button
            className="text-blue-500"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

