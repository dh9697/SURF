import styled from "styled-components";
import { useState } from "react";

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
            ></Input>
          </InputBox>
          <InputBox>
            <Text>비밀번호 입력</Text>
            <Input
              type="text"
              placeholder="영문, 숫자, 특수문자 모두 포함 8~20자"
              name="passwordId"
            ></Input>
          </InputBox>
          <InputBox>
            <Text>이름 입력</Text>
            <Input
              type="text"
              placeholder="실명을 입력하세요"
              name="nameId"
            ></Input>
          </InputBox>
          <InputBox>
            <Text>생년월일</Text>
            <Input
              type="text"
              placeholder="ex) 19980105"
              name="birthId"
            ></Input>
          </InputBox>
          <InputBox>
            <Text>성별/국적</Text>
            <Input
              type="text"
              placeholder="설명을 뭐라고 적어야 할까요?"
              name="genderId"
            ></Input>
          </InputBox>
          <InputBox>
            <Text>휴대폰 번호</Text>
            <Input
              type="text"
              placeholder="(-) 제외한 번호를 입력해 주세요"
              name="phoneNumId"
            ></Input>
          </InputBox>
          <InputBox>
            <Text>Email 입력</Text>
            <Input
              type="text"
              placeholder="정확히 입력해 주세요"
              name="emailId"
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

          <RegiserBtn>회원가입</RegiserBtn>
        </RegisterContainer>
      </Container>
    </>
  );
}
