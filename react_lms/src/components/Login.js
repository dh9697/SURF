import styled from "styled-components";
import google from "./image/google.png";
import naver from "./image/naver.png";
import kakao from "./image/kakao.png";
import { useEffect, useState } from "react";
import { apiLoginByAxiosPost } from "./RestApi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Container = styled.div`
  width: 100vw;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 30vw;
  height: 70vh;
  background-color: lightgray;
  margin-top: 5%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  /* 구분선 스타일 */
  .divider-container {
    width: 80%;
    margin: 20px 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .divider {
    flex: 1; /* 추가: 구분선이 나머지 공간을 차지하도록 함 */
    border-top: 1px solid black;
  }

  /* 텍스트 스타일 */
  .divider-text {
    position: absolute; /*이걸 해 줘야 글자가 구분선 중앙으로 감*/
    background-color: lightgray;
    padding: 0 10px;
    color: #333;
  }
`;

const Title = styled.p`
  margin-bottom: 20px;
`;

const Input = styled.input`
  background-color: transparent;
  /* border: none; */
  border: 1px solid #3182f6;
  /* outline: none; */
  color: #fff;
  padding: 15px;
  width: 60%;
  font-size: 16px;
  margin-bottom: 20px;
`;

const LoginSolution = styled.p``;
const LoginBtn = styled.button``;
const JoinBtn = styled(NavLink)`
  text-decoration: none;
`;
const BtnContainer = styled.div`
  width: 300px;
  height: 60px;
`;
const ImgBtn = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
`;

export function Login() {
  // 로그인 성공 시 이전 페이지나 "/"로 기능 추가 하기

  const { login, isloggedIn } = useAuth();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  // loginId,password가 바뀔 때 호출 하는 방식이면 useEffect 고려
  const handleLogin = (e) => {
    e.preventDefault();
    login(loginId, password);
  };

  // enter 로그인
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };
  // const [showPassword, setShowPassword] = useState(false);
  // const togglePasswordVisible = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <>
      <Container>
        <LoginContainer>
          <Title>Log in to Surf</Title>
          <Input
            type="text"
            placeholder="아이디 입력"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <LoginSolution>로그인 문제 해결</LoginSolution>
          <LoginBtn type="submit" onClick={handleLogin}>
            로그인
          </LoginBtn>
          <JoinBtn to={"/register"}>회원가입</JoinBtn>
          <div className="divider-container">
            <div className="divider" />
            <div className="divider-text">OR</div>
          </div>
          <BtnContainer>
            <ImgBtn src={google} alt="gogleLogin" />
            <ImgBtn src={naver} alt="naverLogin" />
            <ImgBtn src={kakao} alt="kakaoLogin" />
          </BtnContainer>
        </LoginContainer>
      </Container>
    </>
  );
}
