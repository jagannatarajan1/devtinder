import axios from "axios";
import { useEffect, useState } from "react";
import { BaseUrl } from "../utils/constance";
import { useDispatch } from "react-redux";
import { addFeed, removeFeed } from "../store/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const dispatch = useDispatch();
  const [displayList, setDisplayList] = useState([]); // local queue we render

  const fetchFeed = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/feed`, { withCredentials: true });
      const data = res?.data || [];
      dispatch(addFeed(data)); // keep Redux in sync
      setDisplayList(data); // but render from our local queue
    } catch (e) {
      console.error("Error fetching feed:", e);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleDecision = async (action, user) => {
    if (!user?._id) return;

    // 1) OPTIMISTIC UI: remove the top card immediately
    setDisplayList((prev) => prev.slice(1));

    // 2) Fire API in background
    try {
      await axios.post(
        `${BaseUrl}/request/${action}/${user._id}`,
        {},
        { withCredentials: true }
      );

      // 3) On success, sync Redux store (optional for rest of app)
      dispatch(removeFeed(user._id));
    } catch (e) {
      console.error("Decision API failed:", e);

      // 4) (Optional) Rollback UI if you want:
      // setDisplayList(prev => [user, ...prev]);
      // You might also show a toast here.
    }
  };

  if (!displayList) return null;
  if (displayList.length === 0) {
    return <p className="text-center p-3">🎉 No more users to show</p>;
  }

  // Render only the first card in the queue
  const currentUser = displayList[0];

  return (
    <div className="flex justify-center items-center h-screen">
      <FeedCard user={currentUser} onDecision={handleDecision} />
    </div>
  );
};

export default Feed;
