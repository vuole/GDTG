import { createContext, useReducer } from "react";
import { User } from "../types/type";

export const AuthContext = createContext<UserContextType>(
  {} as UserContextType
);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ auth: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const authReducer = (state: Auth, action: any) => {
  switch (action.type) {
    case "LOGGED":
      return {
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

const INITIAL_STATE: Auth = {
  currentUser: {},
};

interface Auth {
  currentUser: User;
}

interface UserContextType {
  auth: Auth;
  dispatch: React.Dispatch<any>;
}
