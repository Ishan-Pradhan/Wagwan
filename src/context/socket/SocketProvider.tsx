import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import { useAppSelector } from "stores/hooks";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAppSelector((state) => state.auth);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (loading || !user) return;
    if (socketRef.current) return;

    const socket = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:8080",
      {
        withCredentials: true,
      },
    );

    socketRef.current = socket;

    return () => {};
  }, [loading, user]);

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socketRef }}>
      {children}
    </SocketContext.Provider>
  );
}
