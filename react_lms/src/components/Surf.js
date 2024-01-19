import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Main } from "./Main";
import { About } from "./About";
import { LevelTest } from "./LevelTest";
import { Community } from "./Community";
import { Event } from "./Event";
import { Login } from "./Login";
import { Register } from "./Register";
import { Footer } from "./Footer";
import styled from "styled-components";
import { DashboardNavBar } from "./DashboardNavBar";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { AccountInfo } from "./AccountInfo";
import { Dashboard } from "./Dashboard";
import { MyCourse } from "./MyCourse";
import { Course } from "./Course";
import { Contact } from "./Contact";
import { TestQuestion } from "./TestQuestion";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainContent = styled.div`
  flex: 1;
`;

export function Surf() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <ContentWrapper>
            <MainContent>
              <Routes>
                <Route path="/" element={<NavBar />}>
                  <Route index element={<Main />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/course" element={<Course />} />
                  <Route path="/level_test" element={<LevelTest />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/event" element={<Event />} />
                  <Route path="/contact" element={<Contact />} />
                  {isLoggedIn && (
                    <Route
                      path={`/dashboard/${user.loginId}`}
                      element={<DashboardNavBar />}
                    >
                      <Route index element={<Dashboard />} />
                      <Route
                        path={`/dashboard/${user.loginId}/courses`}
                        element={<MyCourse />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/account_info`}
                        element={<AccountInfo />}
                      />
                    </Route>
                  )}
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/test" element={<TestQuestion />} />
              </Routes>
            </MainContent>
            <Footer />
          </ContentWrapper>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}
