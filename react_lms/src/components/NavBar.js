import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 70px;
  /* background-color: #3182f6; */
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
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
  width: 132px;
  height: 64px;
  background-color: gold;
  margin-left: 32px;
`;
const LogoImg = styled.img`
  width: 100%;
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
  font-size: 14px;
  font-weight: 900;
  &.join {
    background-color: #3182f6;
    border-radius: 5px;
    color: white;
    padding: 8px 32px;
  }
`;
export function NavBar() {
  return (
    <>
      <Container>
        <Section>
          <Logo to={"/"}>{/* <LogoImg src={} alt="Logo Image" /> */}</Logo>
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
        <Section>
          <NavSectionItem className="login" to={"/login"}>
            Login
          </NavSectionItem>
          <NavSectionItem className="join" to={"/register"}>
            Join
          </NavSectionItem>
        </Section>
      </Container>
      <Outlet />
    </>
  );
}
