import { createContext, useReducer } from "react";
import { Conversations } from "../types/type";

export const ChatContext = createContext<ChatContextType>(
  {} as ChatContextType
);

export const ChatProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ chatContextData: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

const chatReducer = (state: Conversations, action: any) => {
  switch (action.type) {
    case "INIT_MESSAGE":
      return {
        conversations: action.payload,
      };
    // case "SENT_MESSAGE":
    //   return {
    //     conversations: [...state.conversations, action.payload],
    //   };

    default:
      return state;
  }
};

const INITIAL_STATE: Conversations = {
  conversations: [],
};

interface ChatContextType {
  chatContextData: Conversations;
  dispatch: React.Dispatch<any>;
}
