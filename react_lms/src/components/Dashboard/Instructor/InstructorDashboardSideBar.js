import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../../AuthContext';

const Container = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
`;
const NavBar = styled.div`
  display: none !important;
  width: 200px;
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

export function InstructorDashboardSideBar() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Container>
        <NavBar>
          <StyledNavLink
            className="dashboard"
            to={`/dashboard/${user.loginId}`}
          >
            {user.name} 선생님
          </StyledNavLink>
          <StyledNavLink to={`/dashboard/${user.loginId}/students_manage`}>
            학생 관리
          </StyledNavLink>
          <StyledNavLink to={`/dashboard/${user.loginId}/exam_manage`}>
            시험 관리
          </StyledNavLink>
          <StyledNavLink to={`/dashboard/${user.loginId}/qna_manage`}>
            Q&A 관리
          </StyledNavLink>
          <StyledNavLink to={`/dashboard/${user.loginId}/coursereview_manage`}>
            수강평 관리
          </StyledNavLink>
          <StyledNavLink to={`/dashboard/${user.loginId}/coursenotice_manage`}>
            강의 공지사항 관리
          </StyledNavLink>
        </NavBar>
        <DashboardMain>
          <Outlet />
        </DashboardMain>
      </Container>
    </>
  );
}
