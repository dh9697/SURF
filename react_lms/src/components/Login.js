import styled from "styled-components";
import google from "./image/google.png";
import naver from "./image/naver.png";
import kakao from "./image/kakao.png";
import { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { TestWave } from "./TestWave";

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 400px;
  /* 구분선 스타일 */
  .divider-container {
    width: 100%;
    margin: 3rem 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .divider {
    flex: 1;
    border-top: 1px solid #6b7280;
  }

  /* 텍스트 스타일 */
  .divider-text {
    position: absolute;
    color: #6b7280;
    background-color: #fff;
    padding: 0 10px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const Input = styled.input`
  border: 1px solid rgb(221, 221, 221);
  background-color: rgb(250, 250, 250);
  color: #6b7280;
  padding: 15px;
  width: 100%;
  font-size: 14px;
  border-radius: 5px;
  &:focus {
    outline-color: #3182f6;
  }
`;

const LoginSolution = styled.p`
  width: 100%;
  text-align: right;
  color: #6b7280;
  font-weight: bold;
  margin-bottom: 10px;
`;
const LoginBtn = styled.button`
  width: 100%;
  border: none;
  background-color: #3182f6;
  color: white;
  padding: 15px 0;
  border-radius: 5px;
  font-weight: 900;
  cursor: pointer;
`;
const JoinBtn = styled(NavLink)`
  text-decoration: none;
  text-align: center;
  color: #3182f6;
  width: 100%;
  border: 2px solid #3182f6;
  padding: 15px 0;
  border-radius: 5px;
  font-weight: 900;
`;
const SocialContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const SocialBtn = styled.div``;
const Img = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
`;

export function Login() {
  // 로그인 성공 시 이전 페이지나 "/"로 기능 추가 하기

  const { login, isloggedIn } = useAuth();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // loginId,password가 바뀔 때 호출 하는 방식이면 useEffect 고려
  const handleLogin = (e) => {
    e.preventDefault();
    login(loginId, password);
    navigate("/");
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
          <LoginForm>
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
          </LoginForm>
          <BtnContainer>
            <div className="divider-container">
              <div className="divider" />
              <div className="divider-text">OR</div>
            </div>
            <SocialContainer>
              <SocialBtn>
                <Img src={google} alt="gogleLogin" />
              </SocialBtn>
              <SocialBtn>
                <Img src={naver} alt="naverLogin" />
              </SocialBtn>
              <SocialBtn>
                <Img src={kakao} alt="kakaoLogin" />
              </SocialBtn>
            </SocialContainer>
          </BtnContainer>
        </LoginContainer>
      </Container>
    </>
  );
}
