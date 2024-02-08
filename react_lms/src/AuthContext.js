import { createContext, useEffect, useState } from "react";
import { apiGetCurrentUserInfo } from "./components/RestApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await apiGetCurrentUserInfo();
      console.log(response);
      setUser(response.data.data);
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
