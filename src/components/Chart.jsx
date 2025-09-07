import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../utils/constance";
import { createSocketConnection } from "../utils/socket";
import { format, formatDistanceToNow } from "date-fns";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // jump instantly
      // OR smooth
      // container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  // helper: generate a simple clientId (no extra dependency)
  const genClientId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BaseUrl}/chats/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages =
        chat?.data?.[0]?.messages?.map((msg) => ({
          firstName: msg.senderId?.firstName,
          lastName: msg.senderId?.lastName,
          text: msg.text,
          timestamp: msg.timestamp,
          // if server has an _id, keep it (useful for dedupe)
          serverId: msg._id || null,
        })) || [];

      setMessages(chatMessages);
    } catch (err) {
      console.error("Error fetching chat messages:", err);
    }
  };

  useEffect(() => {
    // refetch when targetUserId changes
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    // create socket once
    socketRef.current = createSocketConnection();

    socketRef.current.on("connect", () => {
      console.log("socket connected", socketRef.current.id);
      // join chat room (server-side should handle this)
      socketRef.current.emit("joinChat", {
        firstName: user.firstName,
        userId,
        targetUserId,
      });
    });

    // primary incoming handler
    socketRef.current.on("messageReceived", (msg) => {
      // msg might contain: firstName, lastName, text, timestamp, clientId, serverId, userId...
      setMessages((prev) => {
        // 1) If server returned clientId for our optimistic message -> replace it
        if (msg.clientId) {
          const exists = prev.some((m) => m.clientId === msg.clientId);
          if (exists) {
            return prev.map((m) =>
              m.clientId === msg.clientId ? { ...m, ...msg, pending: false } : m
            );
          }
        }

        // 2) Basic dedupe: if the exact serverId already exists, skip
        if (msg.serverId && prev.some((m) => m.serverId === msg.serverId)) {
          return prev;
        }

        // 3) Fallback dedupe: avoid duplicates by text+timestamp+sender
        if (
          prev.some(
            (m) =>
              m.text === msg.text &&
              m.firstName === msg.firstName &&
              m.lastName === msg.lastName &&
              m.timestamp === msg.timestamp
          )
        ) {
          return prev;
        }

        // otherwise append
        return [...prev, msg];
      });
    });

    socketRef.current.on("disconnect", () => {
      console.log("socket disconnected");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId, targetUserId, user?.firstName]);

  // // auto-scroll on new messages
  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const sendMessage = () => {
    const trimmed = newMessage.trim();
    if (!trimmed || !socketRef.current) return;

    const clientId = genClientId();
    const optimisticMsg = {
      firstName: user.firstName,
      lastName: user.lastName,
      text: trimmed,
      timestamp: new Date().toISOString(),
      clientId,
      pending: true, // UI can show "sending..." if you want
      self: true,
      userId, // optional
    };

    // 1) Optimistically update UI
    setMessages((prev) => [...prev, optimisticMsg]);

    // 2) Emit to server. Include clientId so server can echo it back in the saved message.
    // If server supports ack callback, it can return the saved message data.
    socketRef.current.emit(
      "sendMessage",
      {
        firstName: user.firstName,
        lastName: user.lastName,
        userId,
        targetUserId,
        text: trimmed,
        clientId,
      },
      // optional ack callback from server
      (savedMessageFromServer) => {
        // If server acknowledges with a message object, update the optimistic message
        if (savedMessageFromServer) {
          setMessages((prev) =>
            prev.map((m) =>
              m.clientId === clientId
                ? { ...m, ...savedMessageFromServer, pending: false }
                : m
            )
          );
        }
      }
    );

    // clear input
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-auto p-5" ref={messagesContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={msg.clientId || msg.serverId || index}
            className={
              "chat " +
              (user.firstName === msg.firstName ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header flex items-center gap-2">
              <span>{`${msg.firstName} ${msg.lastName}`}</span>
              {msg.timestamp && (
                <time className="text-xs opacity-50">
                  {format(new Date(msg.timestamp), "hh:mm a")} •{" "}
                  {formatDistanceToNow(new Date(msg.timestamp), {
                    addSuffix: true,
                  })}
                </time>
              )}
              {/* {msg.pending && (
                <span className="ml-2 text-xs opacity-60"> • sending...</span>
              )} */}
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">
              {msg.self ? "Seen" : ""}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          className="flex-1 border border-gray-500 text-white rounded p-2"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
