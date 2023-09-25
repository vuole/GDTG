import { createContext, useEffect, useReducer, useState } from "react";
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
  console.log("vao day");
  
  
  switch (action.type) {
    case "LOGGED":
      console.log(action.payload);
      return {
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

const INITIAL_STATE: Auth = {
  currentUser: null,
};

interface Auth {
  currentUser: User | null;
}

interface UserContextType {
  auth: Auth;
  dispatch: React.Dispatch<any>;
}
