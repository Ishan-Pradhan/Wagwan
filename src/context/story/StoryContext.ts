import { createContext, useContext } from "react";
import type { StoryContextType } from "types/StoryContextType";

export const StoryContext = createContext<StoryContextType | null>(null);

export function useStory(): StoryContextType {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within an AuthProvider");
  }
  return context;
}
