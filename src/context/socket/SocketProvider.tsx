import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "context/auth/AuthContext";
import { SocketContext } from "./SocketContext";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (loading || !user) return;
    if (socketRef.current) return;

    const socket = io("http://localhost:8080", {
      withCredentials: true,
    });

    socketRef.current = socket;

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
