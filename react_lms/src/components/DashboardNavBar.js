import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../AuthContext";
import { Icon } from "@iconify/react";

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

export function DashboardNavBar() {
  const { user } = useContext(AuthContext);
  const [daysSinceJoin, setDaysSinceJoin] = useState(0);

  useEffect(() => {
    const joinDate = new Date(user.joinDate);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - joinDate.getTime());
    const daySinceJoin = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysSinceJoin(daySinceJoin);
  }, [user.joinDate]);

  return (
    <>
      <Container>
        <div className="innerWrapper">
          <NavBar>
            <StyledNavLink
              className="dashboard"
              to={`/dashboard/${user.loginId}`}
            >
              대시보드
            </StyledNavLink>
            <StyledNavLink to={`/dashboard/${user.loginId}/courses`}>
              내 학습
            </StyledNavLink>
            <StyledNavLink to={"/"}>작성한 게시글</StyledNavLink>
            <StyledNavLink to={"/"}>수강 바구니</StyledNavLink>
            <StyledNavLink to={"/"}>수료증</StyledNavLink>
            <StyledNavLink to={"/"}>구매내역</StyledNavLink>
            <StyledNavLink to={`/dashboard/${user.loginId}/account_info`}>
              계정 정보
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
