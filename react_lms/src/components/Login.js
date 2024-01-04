import styled from "styled-components";
import github_png from "./image/github_png.png";

const Container = styled.div`
  width: 100vw;
  height: 80vh;
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
const JoinBtn = styled.button``;
const BtnContainer = styled.div``;
const ImgBtn = styled.button`
  background-image: src =("github_png");
  width: 30px;
  height: 30px;
`;

export function Login() {
  // const [showPassword, setShowPassword] = useState(false);
  // const togglePasswordVisible = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <>
      <Container>
        <LoginContainer>
          <Title>Log in to Surf</Title>
          <Input type="text" placeholder="아이디 입력" name="loginId"></Input>
          <Input
            type="text"
            placeholder="비밀번호 입력"
            name="password"
          ></Input>
          <LoginSolution>로그인 문제 해결</LoginSolution>
          <LoginBtn>로그인</LoginBtn>
          <JoinBtn>회원가입</JoinBtn>
          <div className="divider-container">
            <div className="divider" />
            <div className="divider-text">OR</div>
          </div>
          <BtnContainer>
            <ImgBtn src={github_png} alt="githubLogin" />
          </BtnContainer>
        </LoginContainer>
      </Container>
    </>
  );
}
