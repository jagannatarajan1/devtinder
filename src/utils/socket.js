import { io } from "socket.io-client";
import { BaseUrl } from "./constance";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BaseUrl, { transports: ["websocket", "polling"] });
  } else {
    return io("/", {
      path: "/socket.io",
      transports: ["websocket", "polling"],
    });
  }
};
