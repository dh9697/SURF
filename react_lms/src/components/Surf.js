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

const Wrapper = styled.div`
  /* height: 520vh; */
  height: 100vh;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainContent = styled.div`
  flex: 1;
`;
const NoFooterRoutes = ["/login", "/register"];

export function Surf() {
  // 로그인 회원가입 창에서는 footer 안 보이게
  const RenderFooter = () => {
    return !NoFooterRoutes.includes(window.location.pathname);
  };
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
                  </Route>
                </Routes>
              </MainContent>
              {RenderFooter() && <Footer />}
            </ContentWrapper>
          </BrowserRouter>
        </Wrapper>
      </AuthProvider>
    </>
  );
}
