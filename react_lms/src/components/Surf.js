import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Main } from "./Main";
import { About } from "./About";
import { LevelTest } from "./LevelTest";
import { Community } from "./Community";
import { Event } from "./Event";
import { Login } from "./Login";

export function Surf() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Main />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/course" element={<Course />} /> */}
            <Route path="/level_test" element={<LevelTest />} />
            <Route path="/community" element={<Community />} />
            <Route path="/event" element={<Event />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
