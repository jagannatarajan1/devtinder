import axios from "axios";
import { useEffect } from "react";
import { BaseUrl } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const userfeed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const feed = async () => {
    try {
      const feedResponse = await axios.get(BaseUrl + "/feed", {
        withCredentials: true,
      });
      console.log(feedResponse?.data);
      dispatch(addFeed(feedResponse?.data));
    } catch (error) {
      console.error("Error fetching feed: ", error);
    }
  };
  useEffect(() => {
    feed();
  }, []);

  return (
    <div>
      <FeedCard user={userfeed[0]} />
    </div>
  );
};

export default Feed;
