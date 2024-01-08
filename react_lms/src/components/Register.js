import styled from "styled-components";
import { useState } from "react";
import { apiSignupByAxiosPost } from "./RestApi";

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterContainer = styled.div`
  width: 30vw;
  height: 80vh;
  background-color: lightgray;
  margin-top: 5%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.p``;
// const Input = styled.input`
//   background-color: transparent;
//   /* border: none; */
//   border: 1px solid #3182f6;
//   /* outline: none; */
//   color: #fff;
//   padding: 15px;
//   width: 60%;
//   font-size: 16px;
//   margin-bottom: 20px;
// `;
const InputBox = styled.div`
  width: 400px;
  height: 70px;
  background-color: gray;
  margin-bottom: 5px;
  padding: 20px 5px;
  display: flex;
  align-items: left;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  background-color: transparent;
  border-color: transparent;
  padding: 10px 5px;
  width: 100%;
  color: #d9d9d9;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 0px;
`;

const Text = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: #acacac;
`;

const CheckBox = styled.div`
  display: flex;
`;

const RegiserBtn = styled.button``;

export function Register() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const handleRegister = async () => {
    try {
      const response = await apiSignupByAxiosPost(
        loginId,
        password,
        name,
        birthDate,
        gender,
        nationality,
        email,
        phoneNum
      );
      if (response.data.resultCode === "SUCCESS") {
        window.alert("회원가입이 성공적으로 처리되었습니다.");
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log("회원가입 오류", err);
    }
  };

  return (
    <>
      <Container>
        <RegisterContainer>
          <Title>Join Surf</Title>
          <InputBox>
            <Text>아이디 입력</Text>
            <Input
              type="text"
              placeholder="하품 소리 개치고 싶다"
              name="loginId"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            ></Input>
          </InputBox>
          <InputBox>
            <Text>비밀번호 입력</Text>
            <Input
              type="text"
              placeholder="영문, 숫자, 특수문자 모두 포함 8~20자"
              name="passwordId"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </InputBox>
          <InputBox>
            <Text>이름 입력</Text>
            <Input
              type="text"
              placeholder="실명을 입력하세요"
              name="nameId"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </InputBox>
          <InputBox>
            <Text>생년월일</Text>
            <Input
              type="text"
              placeholder="ex) 19980105"
              name="birthId"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            ></Input>
          </InputBox>
          <InputBox>
            <Text>성별/국적</Text>
            <Input
              type="text"
              placeholder="설명을 뭐라고 적어야 할까요?"
              name="genderId"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="설명을 뭐라고 적어야 할까요?"
              name="nationalityId"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            ></Input>
          </InputBox>
          <InputBox>
            <Text>휴대폰 번호</Text>
            <Input
              type="text"
              placeholder="(-) 제외한 번호를 입력해 주세요"
              name="phoneNumId"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            ></Input>
          </InputBox>
          <InputBox>
            <Text>Email 입력</Text>
            <Input
              type="text"
              placeholder="정확히 입력해 주세요"
              name="emailId"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </InputBox>
          <CheckBox>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label>이용약관 및 개인정보 처리방침에 동의합니다.</label>
          </CheckBox>
          <CheckBox>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label>(선택) 이메일 마케팅 정책에 동의합니다.</label>
          </CheckBox>

          <RegiserBtn onClick={handleRegister}>회원가입</RegiserBtn>
        </RegisterContainer>
      </Container>
    </>
  );
}
