import { createContext, useEffect, useState } from "react";
import { apiGetCurrentUserInfo } from "./components/RestApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setIsLoggedIn(token);

    if (token) {
      setIsLoggedIn(true);

      apiGetCurrentUserInfo()
        .then((response) => {
          const userData = response.data.data;
          setUser(userData);
        })
        .catch((err) => {
          console.error("사용자 정보를 가져오는 중 오류 발생: ", err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
