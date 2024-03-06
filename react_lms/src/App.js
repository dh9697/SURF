import { createGlobalStyle } from "styled-components";
import { Surf } from "./components/Surf";
import { AuthProvider } from "./AuthContext";

const GlobalStyle = createGlobalStyle`
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  user-select: none;
  font-family: 'Pretendard-Regular';
}
html, body{
  width: 100%;
  height: 100%;
}
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
`;
export default function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Surf />
      </AuthProvider>
    </>
  );
}
