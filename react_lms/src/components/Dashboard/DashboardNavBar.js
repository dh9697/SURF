import styled from "styled-components";
import { useEffect, useState } from "react";
import { apiGetCurrentUserInfo } from "../RestApi";
import { UserDashboardNavBar } from "./User/UserDashboardNavBar";
import { AdminDashboardNavBar } from "./Admin/AdminDashboardNavBar";
import { InstructorDashboardSideBar } from "./Instructor/InstructorDashboardSideBar";

const Container = styled.div``;
const NavBar = styled.div``;

export function DashboardNavBar() {
  const [userRoles, setUserRole] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    fetchUserInfo(token);
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await apiGetCurrentUserInfo(token);
      const { authorityDtoSet } = response.data.data;
      const roles = authorityDtoSet.map((authority) => authority.authorityName);

      setUserRole(roles);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <Container>
      <div className="innerWrapper">
        <NavBar>
          {userRoles.includes("ROLE_ADMIN") ? (
            <AdminDashboardNavBar />
          ) : userRoles.includes("ROLE_INSTRUCTOR") ? (
            <InstructorDashboardSideBar />
          ) : userRoles.some(
              (role) => role === "ROLE_USER" || role === "ROLE_MEMBER"
            ) ? (
            <UserDashboardNavBar />
          ) : null}
        </NavBar>
      </div>
    </Container>
  );
}
