import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

type SocketContextType = {
  socketRef: React.MutableRefObject<Socket | null>;
};
export const SocketContext = createContext<SocketContextType | null>(null);

export function useSocket(): SocketContextType {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
