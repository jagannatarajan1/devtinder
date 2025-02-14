import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../utils/constance";
import ListOfCard from "./ListOfCard";

const Connection = () => {
  const [connection, setConnection] = useState([]);
  const [error, setError] = useState(null);

  const fetchConnectionUser = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/connections`, {
        withCredentials: true,
      });
      setConnection(response.data);
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

  return <ListOfCard connection={connection} button={false} />;
};

export default Connection;
