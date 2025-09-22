import axios from "axios";
import { useEffect, useState } from "react";
import { BaseUrl } from "../utils/constance";
import { useDispatch } from "react-redux";
import { RemoveRequest } from "../store/requestSlice";

const Request = () => {
  const [request, setRequest] = useState([]);
  const dispatch = useDispatch();

  const fetchRequest = async () => {
    try {
      const receivedRequest = await axios.get(BaseUrl + "/request/receive", {
        withCredentials: true,
      });
      console.log("Received Request:", receivedRequest);
      setRequest(receivedRequest?.data || []); // store full objects
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const RequestHandler = async (id, action) => {
    try {
      await axios.post(
        `${BaseUrl}/request/review/${action}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(RemoveRequest(id));
      console.log(`Request ${action} successful for ID: ${id}`);
      fetchRequest(); // refresh after action
    } catch (error) {
      console.error(`Error handling ${action} request:`, error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="flex justify-center items-center p-4">
      <ul className="menu bg-base-200 w-full sm:w-3/6 rounded-lg p-2">
        {request.map((ele) => (
          <li key={ele._id} className="p-2 border-b last:border-none">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <img
                  className="w-28 h-28 rounded-lg object-cover"
                  src={ele.profilePic || "/default-profile.png"}
                  alt={`${ele.firstName} ${ele.lastName}`}
                />
                <div>
                  <p className="font-semibold">
                    {ele.firstName} {ele.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {ele.age ? `${ele.age} years old, ` : ""}
                    {ele.gender}
                  </p>
                  <p className="text-gray-500">{ele.about}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="btn btn-success"
                  onClick={() => RequestHandler(ele._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => RequestHandler(ele._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Request;
