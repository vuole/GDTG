import { createContext, useEffect, useState } from "react";
import { User } from "../types/type";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  useEffect(() => {
    
    return () => {
    };
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};