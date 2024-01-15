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
import { Dashboard } from "./Dashboard";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

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
  const { isLoggedIn, user, handleLogout } = useContext(AuthContext);

  return (
    <>
      <Wrapper>
        <BrowserRouter>
          <ContentWrapper>
            <MainContent>
              <Routes>
                <Route path="/" element={<NavBar />}>
                  <Route index element={<Main />} />
                  <Route path="/about" element={<About />} />
                  {/* <Route path="/course" element={<Course />} /> */}
                  <Route path="/level_test" element={<LevelTest />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/event" element={<Event />} />
                  {isLoggedIn && (
                    <Route
                      path={`/dashboard/${user.loginId}`}
                      element={<Dashboard />}
                    />
                  )}
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </MainContent>
            <Footer />
          </ContentWrapper>
        </BrowserRouter>
      </Wrapper>
    </>
  );
}
