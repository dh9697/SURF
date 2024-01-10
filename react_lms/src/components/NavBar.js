import styled from "styled-components";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import surfLogo from "./image/surf_logo.png";
import { useState } from "react";
import { useAuth } from "./AuthContext";

const Container = styled.div`
  width: 100%;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 8fr 2fr;
`;
const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;
const Logo = styled(NavLink)`
  width: 142px;
  height: 64px;
  margin-left: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoImg = styled.img`
  width: 100%;
  object-fit: cover;
`;
const NavSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;
  margin: 0 32px;
`;
const NavSectionItem = styled(NavLink)`
  text-decoration: none;
  color: #6b7280;
  margin-top: 0.7%;
  &.join,
  &.dashboard {
    background-color: #3182f6;
    border-radius: 5px;
    color: white;
    padding: 8px 32px;
  }
`;
export function NavBar() {
  const { isLoggedIn, logout, loginId } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Section>
          <Logo to={"/"}>
            <LogoImg src={surfLogo} alt="Logo Image" />
          </Logo>
          <NavSection>
            <NavSectionItem className="about" to={"/about"}>
              About
            </NavSectionItem>
            <NavSectionItem className="course" to={"/"}>
              Courses
            </NavSectionItem>
            <NavSectionItem className="levelTest" to={"/level_test"}>
              Level Test
            </NavSectionItem>
            <NavSectionItem className="community" to={"/community"}>
              Community
            </NavSectionItem>
            <NavSectionItem className="event" to={"/event"}>
              Event
            </NavSectionItem>
            <NavSectionItem className="contact" to={"/contact"}>
              Contact
            </NavSectionItem>
          </NavSection>
        </Section>
        {isLoggedIn ? (
          <Section>
            <NavSectionItem className="logout" to={"/"} onClick={logout}>
              {loginId}님 로그아웃
            </NavSectionItem>
            <NavSectionItem className="dashboard" to={"/dashboard"}>
              dashboard
            </NavSectionItem>
          </Section>
        ) : (
          <Section>
            <NavSectionItem className="login" to={"/login"}>
              Login
            </NavSectionItem>
            <NavSectionItem className="join" to={"/register"}>
              Join
            </NavSectionItem>
          </Section>
        )}
      </Container>
      <Outlet />
    </>
  );
}
