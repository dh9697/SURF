import { createContext, useEffect, useState } from "react";
import {
  apiGetCurrentUserInfo,
  apiLoginByAxiosPost,
} from "./components/RestApi";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [courseId, setCourseId] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [qnaId, setQnaId] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await apiGetCurrentUserInfo();
      setUser(response.data.data);
      setCourseId(response.data.data.courseId);
      setMemberId(response.data.data.memberId);
      setQnaId(response.data.data.qnaId);
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
