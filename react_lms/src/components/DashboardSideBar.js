import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../AuthContext";

const Container = styled.div`
  width: 100%;
  background-color: blanchedalmond;
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

export function DashboardSideBar() {
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
            <StyledNavLink to={"/"}>회원 정보</StyledNavLink>
            <StyledNavLink to={"/"}>수업/결제</StyledNavLink>
            <StyledNavLink to={"/"}>레벨테스트 관리</StyledNavLink>
            <StyledNavLink to={"/"}>프로모션</StyledNavLink>
            <StyledNavLink to={`/dashboard/admin/${user.loginId}/manageboard`}>
              게시판 관리
            </StyledNavLink>
            <StyledNavLink to={"/"}>공지사항</StyledNavLink>
            <StyledNavLink to={"/"}>통계</StyledNavLink>
          </NavBar>
          <DashboardMain>
            <Outlet />
          </DashboardMain>
        </div>
      </Container>
    </>
  );
}
