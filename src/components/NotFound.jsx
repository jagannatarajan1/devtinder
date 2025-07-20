import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <div className="flex items-center justify-center gap-x-2">
        <p className="">
          The page you are looking for does not exist. please login
        </p>
        <button
          className="btn  border border-white"
          onClick={() => navigate("/login")}
        >
          Click here
        </button>
      </div>
    </div>
  );
};

export default NotFound;
