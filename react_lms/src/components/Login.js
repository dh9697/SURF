import styled from "styled-components";
import google from "./image/google.png";
import naver from "./image/naver.png";
import kakao from "./image/kakao.png";
import { useContext, useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { TestWave } from "./TestWave";
import { apiLoginByAxiosPost } from "./RestApi";
import { AuthContext } from "../AuthContext";
import { Icon } from "@iconify/react";

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 400px;
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
  position: relative;
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
const StyledIcon = styled(Icon)`
  position: absolute;
  top: 75px;
  right: 1rem;
  font-size: 1rem;
  color: #454545;
`;
const ValidationMessage = styled.p`
  color: #3182f6;
  font-size: 12px;
  padding: 0.5rem 0;
`;
export function Login() {
  const { user, fetchUser } = useContext(AuthContext);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiLoginByAxiosPost(loginId, password);
      if (response.data.resultCode === "SUCCESS") {
        sessionStorage.setItem("Token", response.data.data.token);
        sessionStorage.setItem("LoginId", loginId);
        fetchUser();
        navigate("/");
      }
    } catch (err) {
      console.log("로그인 오류", err);
      window.alert("아이디나 비밀번호가 일치하지 않습니다.");
    }
  };

  // enter 로그인
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin(e);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (regex.test(password)) {
      setPasswordValidationMessage("사용가능한 비밀번호입니다.");
    } else {
      setPasswordValidationMessage(
        "영문, 숫자, 특수문자를 포함하여 8~20자리로 입력해주세요."
      );
    }
  };

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
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              autoComplete="off"
              onKeyPress={handleKeyPress}
            />
            {password && (
              <ValidationMessage>{passwordValidationMessage}</ValidationMessage>
            )}
            <StyledIcon
              icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"}
              onClick={togglePasswordVisible}
            ></StyledIcon>
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
