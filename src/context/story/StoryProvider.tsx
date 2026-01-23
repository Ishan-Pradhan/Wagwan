import { useState } from "react";
import { StoryContext } from "./StoryContext";

export default function StoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewedIds, setViewedIds] = useState<string[]>([]);

  return (
    <StoryContext.Provider value={{ viewedIds, setViewedIds }}>
      {children}
    </StoryContext.Provider>
  );
}
