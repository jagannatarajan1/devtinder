import axios from "axios";
import { useEffect, useState } from "react";
import { BaseUrl } from "../utils/constance";
import ListOfCard from "./ListOfCard";

const Request = () => {
  const [request, setRequest] = useState([]);
  const [reload, setReload] = useState(false);

  const reloadFunction = () => {
    setReload((prev) => !prev); // Toggle state to trigger re-fetch
  };

  const fetchRequest = async () => {
    try {
      const receivedRequest = await axios.get(BaseUrl + "/request/receive", {
        withCredentials: true,
      });

      console.log("Received Request:", receivedRequest);
      const requestArray =
        receivedRequest?.data?.map((ele) => ele?.fromUserId) || [];
      setRequest(requestArray);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [reload]);

  return (
    <ListOfCard
      connection={request}
      button={true}
      reloadFunction={reloadFunction} // ✅ Corrected function name
    />
  );
};

export default Request;
