import { io } from "socket.io-client";
import { BaseUrl } from "./constance";
export const createSocketConnection = () => {
  //   const socket = io(BaseUrl, {
  //     transports: ["websocket"],
  //     withCredentials: true,
  //   });
  //   return socket;
  if (location.hostname === "localhost") {
    return io(BaseUrl);
  } else {
    return io("/", { paths: "api/socket.io" });
  }
};
