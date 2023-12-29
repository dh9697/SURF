import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Home } from "./Home";

export function Lms() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
