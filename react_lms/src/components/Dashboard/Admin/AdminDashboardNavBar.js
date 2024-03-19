import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../../AuthContext';

const Container = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  gap: 2rem;
`;
const NavBar = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: sticky;
  max-height: 500px;
  top: 3%;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 900;
  color: #454545;
  padding: 8px 12px;
  &.dashboard {
    margin-bottom: 1rem;
    font-size: 20px;
  }
  &.active {
    color: #00abff;
    background-color: #d9f2ff;
    border-radius: 5px;
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

export function AdminDashboardNavBar() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Container>
        <NavBar>
          <StyledNavLink
            className="dashboard"
            to={`/dashboard/${user.loginId}`}
          >
            {user.name}님
          </StyledNavLink>
          <StyledNavLink
            activeClassName="active"
            to={`/dashboard/${user.loginId}/course_manage`}
          >
            강좌 관리
          </StyledNavLink>
          <StyledNavLink
            activeClassName="active"
            to={`/dashboard/${user.loginId}/content_manage`}
          >
            강의 관리
          </StyledNavLink>
          <StyledNavLink
            activeClassName="active"
            to={`/dashboard/${user.loginId}/user_manage`}
          >
            회원 관리
          </StyledNavLink>
          <StyledNavLink
            activeClassName="active"
            to={`/dashboard/${user.loginId}/post_manage`}
          >
            게시물 관리
          </StyledNavLink>
          <StyledNavLink
            activeClassName="active"
            to={`/dashboard/${user.loginId}/notice_manage`}
          >
            공지사항 관리
          </StyledNavLink>
          <StyledNavLink
            activeClassName="active"
            to={`/dashboard/${user.loginId}/leveltest_manage`}
          >
            레벨테스트 관리
          </StyledNavLink>
        </NavBar>
        <DashboardMain>
          <Outlet />
        </DashboardMain>
      </Container>
    </>
  );
}
