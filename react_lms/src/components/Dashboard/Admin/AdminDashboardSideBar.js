import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../AuthContext";
import SearchBar from "../../SearchBar";

const Container = styled.div`
  width: 100%;
  padding: 32px;
  & .innerWrapper {
    display: flex;
    flex: 1 1 0px;
    gap: 2rem;
  }
`;
const NavBar = styled.div`
  width: 17%;
  display: flex;
  flex-direction: column;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 900;
  color: #495057;
  padding: 8px 12px;

  &.dashboard {
    color: #00abff;
    background-color: #d9f2ff;
    border-radius: 5px;
    &:hover {
      background-color: #d9f2ff;
    }
  }
  &:hover {
    color: #00abff;
    background-color: #f8f9fa;
    border-radius: 5px;
  }
`;
const DashboardMain = styled.div`
  width: 100%;
  height: 100%;
`;

export function AdminDashboardSideBar() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Container>
        <div className="innerWrapper">
          <NavBar>
            <StyledNavLink
              className="dashboard"
              to={`/dashboard/admin/${user.loginId}`}
            >
              관리자 님
            </StyledNavLink>
            <SearchBar />
            <StyledNavLink
              to={`/dashboard/admin/${user.loginId}/course_manage`}
            >
              코스 및 강의 관리
            </StyledNavLink>
            <StyledNavLink to={`/dashboard/admin/${user.loginId}/user_manage`}>
              회원 정보
            </StyledNavLink>
            <StyledNavLink
              to={`/dashboard/admin/${user.loginId}/leveltest_manage`}
            >
              레벨테스트 관리
            </StyledNavLink>
            <StyledNavLink to={`/dashboard/admin/${user.loginId}/post_manage`}>
              게시물 관리
            </StyledNavLink>
            <StyledNavLink
              to={`/dashboard/admin/${user.loginId}/notice_manage`}
            >
              공지사항 관리
            </StyledNavLink>
            <StyledNavLink to={`/dashboard/admin/${user.loginId}/stats_manage`}>
              통계
            </StyledNavLink>
            <StyledNavLink
              to={`/dashboard/admin/${user.loginId}/promotion_manage`}
            >
              프로모션 관리
            </StyledNavLink>
          </NavBar>
          <DashboardMain>
            <Outlet />
          </DashboardMain>
        </div>
      </Container>
    </>
  );
}
