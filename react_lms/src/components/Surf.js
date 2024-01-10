import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { AuthProvider } from "./AuthContext";
import { Dashboard } from "../Dashboard";

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
  return (
    <>
      <AuthProvider>
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                </Routes>
              </MainContent>
              <Footer />
            </ContentWrapper>
          </BrowserRouter>
        </Wrapper>
      </AuthProvider>
    </>
  );
}
