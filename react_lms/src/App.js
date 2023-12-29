import { createGlobalStyle } from "styled-components";
import { Lms } from "./components/Lms";

const GlobalStyle = createGlobalStyle`
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html, body{
  width: 100%;
  height: 100%;
}
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Lms />
    </>
  );
}
