import type { Dispatch, SetStateAction } from "react";

export interface StoryContextType {
  viewedIds: string[];
  setViewedIds: Dispatch<SetStateAction<string[]>>;
}
