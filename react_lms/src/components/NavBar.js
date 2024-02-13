import styled from "styled-components";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import surfLogo from "./image/surf_logo.png";
import { useContext, useEffect, useState } from "react";
import { apiGetAllSubject, apiGetCurrentUserInfo } from "./RestApi";
import { AuthContext } from "../AuthContext";

const Container = styled.div`
  width: 100%;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  & .innerWrapper {
    display: grid;
    grid-template-columns: 6fr 4fr;
  }
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
  white-space: nowrap;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  position: relative; // 추가
  &.join,
  &.dashboard {
    background-color: #3182f6;
    border-radius: 5px;
    color: white;
    padding: 8px 32px;
  }
`;

// hover했을 때 메뉴바 수정 필요
const SubMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  padding: 8px 0;
  display: none;
  gap: 8px;
  /* border: 1px solid black; */
  background-color: white;
  z-index: 10;
`;

const SubMenuItem = styled(NavLink)`
  text-decoration: none;
  color: #6b7280;
  white-space: nowrap;
  padding: 8px;
  &:hover {
    color: #3182f6;
  }
`;

const HoverableNavItem = styled.div`
  position: relative;
  &:hover ${SubMenu} {
    position: absolute;
    display: flex;
  }
`;

export function NavBar() {
  const { user, setUser } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetAllSubject();
        setSubjects(response.data.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("Token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <Container>
        <div className="innerWrapper">
          <Section>
            <Logo to={"/"}>
              <LogoImg src={surfLogo} alt="Logo Image" />
            </Logo>
            <NavSection>
              <NavSectionItem className="about" to={"/about"}>
                About
              </NavSectionItem>
              <HoverableNavItem>
                <NavSectionItem className="course" to={"/course"}>
                  Courses
                </NavSectionItem>
                <SubMenu>
                  {subjects.map((subject) => (
                    <SubMenuItem
                      key={subject.subjectId}
                      to={`course/subject/${subject.subjectId}`}
                    >
                      {subject.subjectName}
                    </SubMenuItem>
                  ))}
                </SubMenu>
              </HoverableNavItem>
              <NavSectionItem className="levelTest" to={"/level_test"}>
                Level Test
              </NavSectionItem>
              <HoverableNavItem>
                <NavSectionItem className="community" to={"/community"}>
                  Community
                </NavSectionItem>
                <SubMenu>
                  <SubMenuItem to={"/todayResolutions"}>
                    오늘의 각오
                  </SubMenuItem>
                  <SubMenuItem to={"/halloffame"}>명예의 전당</SubMenuItem>
                  <SubMenuItem to={"/coursereview"}>수강평</SubMenuItem>
                </SubMenu>
              </HoverableNavItem>
              <NavSectionItem className="event" to={"/event"}>
                Event
              </NavSectionItem>
              <NavSectionItem className="contact" to={"/faq"}>
                Contact
              </NavSectionItem>
            </NavSection>
          </Section>
          {user ? (
            <Section>
              <NavSectionItem
                className="logout"
                to={"/"}
                onClick={handleLogout}
              >
                {user.name}님 로그아웃
              </NavSectionItem>
              <NavSectionItem
                className="dashboard"
                to={`/dashboard/${user.loginId}`}
              >
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
        </div>
      </Container>
      <Outlet />
    </>
  );
}
