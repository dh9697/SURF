import { createContext, useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { apiLoginByAxiosPost } from "./RestApi";

// Context
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (loginId, password) => {
    try {
      const response = await apiLoginByAxiosPost(loginId, password);
      if (response.data.resultCode === "SUCCESS") {
        window.alert("로그인이 성공적으로 이루어졌습니다.");
        setIsLoggedIn(true);
        setLoginId(loginId);
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log("로그인 오류", err);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLoginId("");
  };

  const value = {
    loginId,
    login,
    logout,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}
