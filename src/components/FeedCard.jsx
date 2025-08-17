import axios from "axios";
import { BaseUrl } from "../utils/constance";
import { useDispatch } from "react-redux";
import { removeFeed } from "../store/feedSlice";

const FeedCard = ({ user }) => {
  const dispatch = useDispatch();
  console.log(user);

  const handleFeed = async (id, useraction) => {
    try {
      await axios.post(
        `${BaseUrl}/request/${useraction}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));
      console.log(`Request ${useraction} successful for ID: ${id}`);
    } catch (error) {
      console.error("Error handling feed: ", error);
    }
  };

  const {
    _id = "",
    firstName = "",
    lastName = "",
    emailId = "",
    profilePic = "",
    skills = [],
    about = "",
    age = "",
  } = user || {};

  console.log(firstName, lastName, emailId, profilePic, about, age, _id); // Removed password from logs

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 h-[600px] shadow-xl bg-pink-100">
        <figure>
          <img
            src={
              profilePic ||
              "https://i.pinimg.com/736x/5e/72/eb/5e72ebebbd623f2cd8a6d855d31ada75.jpg"
            }
            alt="person"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName + " " + lastName} {age}
          </h2>
          <p>{about}</p>

          {/* Displaying skills properly if it's an array */}
          <p>
            Skills :{skills.length > 0 ? skills.join(", ") : "No skills listed"}
          </p>

          <div className="card-actions justify-center">
            <button
              className="btn btn-primary px-10"
              onClick={() => handleFeed(_id, "interested")}
            >
              Interested
            </button>
            <button
              className="btn  px-10 bg-red-600"
              onClick={() => handleFeed(_id, "ignored")}
            >
              Ignored
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
