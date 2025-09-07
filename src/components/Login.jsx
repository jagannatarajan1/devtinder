import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import { BaseUrl } from "../utils/constance";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // step 1: signup/login
  const formHandler = async () => {
    try {
      const endpoint = isSignup ? "/signup" : "/login";
      const payload = isSignup
        ? { firstName, lastName, emailId, password }
        : { emailId, password };

      const res = await axios.post(BaseUrl + endpoint, payload, {
        withCredentials: true,
      });

      if (isSignup) {
        if (res.data.message?.includes("OTP")) {
          setOtpSent(true);
          setError("");
        }
      } else {
        // login: directly authenticate
        localStorage.setItem("user", emailId);
        dispatch(addUser(res.data.user));
        navigate("/");
      }
    } catch (err) {
      setError(err?.response?.data || "Error occurred");
    }
  };

  // step 2: verify OTP (only signup)
  const verifyOtpHandler = async () => {
    try {
      const res = await axios.post(
        BaseUrl + "/verify-otp",
        { emailId, otp },
        { withCredentials: true }
      );

      localStorage.setItem("user", emailId);
      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Invalid OTP");
    }
  };

  // resend OTP (only signup)
  const resendOtpHandler = async () => {
    try {
      const res = await axios.post(BaseUrl + "/resend-otp", { emailId });
      alert(res.data.message);
      setError("");
    } catch (err) {
      setError(err?.response?.data || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 lg:w-1/4 max-w-md border p-7 rounded-lg border-gray-500">
        {!otpSent ? (
          <>
            <h2 className="text-center text-lg font-bold mb-4">
              {isSignup ? "Sign Up" : "Login"}
            </h2>

            {isSignup && (
              <>
                <input
                  className="input input-bordered w-full my-2"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="input input-bordered w-full my-2"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}

            <input
              className="input input-bordered w-full my-2"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input input-bordered w-full my-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              className="w-full py-2 mt-2 rounded-md bg-blue-500 text-white"
              onClick={formHandler}
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            <div className="flex justify-center items-center mt-4">
              <p className="text-sm pr-2">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </p>
              <button
                className="text-blue-500"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-center text-lg font-bold mb-4">
              Enter OTP sent to {emailId}
            </h2>
            <input
              className="input input-bordered w-full my-2"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              className="w-full py-2 mt-2 rounded-md bg-green-500 text-white"
              onClick={verifyOtpHandler}
            >
              Verify OTP
            </button>

            <button
              className="w-full py-2 mt-2 rounded-md bg-gray-200"
              onClick={resendOtpHandler}
            >
              Resend OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
