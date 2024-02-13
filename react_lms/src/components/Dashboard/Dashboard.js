import { useEffect, useState } from "react";
import { AdminDashboard } from "./Admin/AdminDashboard";
import { UserDashboard } from "./User/UserDashboard";
import { apiGetCurrentUserInfo } from "../RestApi";
import { InstructorDashboard } from "./Instructor/InstructorDashboard";

export function Dashboard() {
  const [userRoles, setUserRole] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    fetchUserInfo(token);
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await apiGetCurrentUserInfo(token);
      //여기가 문제인 건가
      const { authorityDtoSet } = response.data.data;
      const roles = authorityDtoSet.map((authority) => authority.authorityName);

      setUserRole(roles);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <div>
      {userRoles.includes("ROLE_ADMIN") ? (
        <AdminDashboard />
      ) : userRoles.includes("ROLE_INSTRUCTOR") ? (
        <InstructorDashboard />
      ) : userRoles.some(
          (role) => role === "ROLE_USER" || role === "ROLE_MEMBER"
        ) ? (
        <UserDashboard />
      ) : null}
    </div>
  );
}
