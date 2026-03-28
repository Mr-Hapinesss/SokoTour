/*Without this code, if you wanted to show the logged-in user's name in the Header and the Profile page, 
you would have to pass the user data down through every single component like a bucket brigade.*/

import { createContext, useState } from "react";

export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  const logout = async () => {
    await fetch("http://localhost:3000/user/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo({});  // clear the user from context
  };

  return (
    <userContext.Provider value={{ userInfo, setUserInfo, logout }}>
      {children}
    </userContext.Provider>
  );
}