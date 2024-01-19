import { createContext, useEffect, useState } from "react";
import {
  apiGetCurrentUserInfo,
  apiLoginByAxiosPost,
} from "./components/RestApi";

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

  // const handleLogin = async (loginId, password) => {
  //   try {
  //     const response = await apiLoginByAxiosPost(loginId, password);
  //     if (response.data.resultCode === "SUCCESS") {
  //       localStorage.setItem("Token", response.data.data.token);
  //       window.alert("로그인이 성공적으로 이루어졌습니다.");
  //     } else {
  //       console.log(response.data.message);
  //     }
  //   } catch (err) {
  //     console.log("로그인 오류", err);
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
