import { Note } from "@/front/utils/useTemplates";
import { createContext, ReactNode, useState } from "react";

export interface PreviewContextType {
  contextValue:{
    isChanged: boolean;
    isModifying: boolean;
    curNote: Note;
    idx: string;
  },
  setContextValue: React.Dispatch<React.SetStateAction<{
    isChanged: boolean;
    isModifying: boolean;
    curNote: Note;
    idx: string;
  }>>
}
export const PreviewContext = createContext<PreviewContextType>({
  contextValue: {
    isChanged: false,
    isModifying: false,
    curNote: {} as Note,
    idx: '0-0',
  },
  setContextValue: () => {},
});
