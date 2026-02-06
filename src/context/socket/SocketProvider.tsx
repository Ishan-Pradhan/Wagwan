import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import { useAppSelector } from "stores/hooks";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAppSelector((state) => state.auth);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (loading || !user) return;

    // Disconnect previous socket if it exists
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const socket = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:8080",
      {
        withCredentials: true,
        transports: ["websocket"], // force WebSocket transport
      },
    );

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Cleanup whenever user changes or component unmounts
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [loading, user]);

  return (
    <SocketContext.Provider value={{ socketRef }}>
      {children}
    </SocketContext.Provider>
  );
}
