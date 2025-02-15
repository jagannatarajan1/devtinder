import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../utils/constance";
import ListOfCard from "./ListOfCard";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/connectionSlice";

const Connection = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const connectionUser = useSelector((store) => store.connection);

  const fetchConnectionUser = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(response.data));
      console.log("Connections:", response.data);
    } catch (err) {
      setError("Failed to fetch connections.");
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnectionUser();
  }, []);

  if (error) return <p>{error}</p>;

  return <ListOfCard connection={connectionUser} />;
};

export default Connection;
