import { io } from "socket.io-client";
import { BaseUrl } from "./constance";
export const createSocketConnection = () => {
  //   const socket = io(BaseUrl, {
  //     transports: ["websocket"],
  //     withCredentials: true,
  //   });
  if (location.hostname === "localhost") {
    return io(BaseUrl, { transports: ["websocket"] });
  } else {
    return io("/", { path: "/api/socket.io", transports: ["websocket"] });
  }
};
