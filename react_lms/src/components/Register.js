import styled from 'styled-components';
import { useState } from 'react';
import { apiGetIsLoginDuplicate, apiSignupByAxiosPost } from './RestApi';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterContainer = styled.div`
  width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & .inputContainer {
    width: 100%;
    position: relative;
    & .inputLabel {
      position: absolute;
      top: 15px;
      left: 15px;
      color: #6b7280;
      font-weight: 900;
    }
  }
  & .radioInputContainerWrapper {
    width: 100%;
    display: flex;
    gap: 10px;
  }
  & .radioInputContainer {
    width: 100%;
    border: 1px solid rgb(221, 221, 221);
    background-color: rgb(250, 250, 250);
    color: #6b7280;
    padding: 45px 15px 15px 15px;
    font-size: 14px;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    position: relative;
    & label {
      // radio 세로 정렬
      display: flex;
      align-items: center;
    }
    & .inputLabel {
      position: absolute;
      top: 15px;
      left: 15px;
      color: #6b7280;
      font-weight: 900;
    }
  }
`;

const Input = styled.input`
  border: 1px solid rgb(221, 221, 221);
  background-color: rgb(250, 250, 250);
  color: #6b7280;
  padding: 45px 15px 15px 15px;
  width: 100%;
  font-size: 14px;
  border-radius: 5px;
  &:focus {
    outline-color: #3182f6;
  }
`;

const RadioInput = styled.input`
  margin-left: 10px;
`;

const RegiserBtn = styled.button`
  width: 100%;
  border: none;
  background-color: #3182f6;
  color: white;
  padding: 15px 0;
  margin-top: 10px;
  border-radius: 5px;
  font-weight: 900;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 45px;
  right: 1rem;
  font-size: 1rem;
  color: #454545;
`;

const ValidationMsg = styled.p`
  font-size: 11px;
  padding: 2px;
`;

const DuplicateBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 50px;
  transform: translateY(-50%);
  padding: 5px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #6b7280;
`;

export function Register() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [duplicateMsg, setDuplicateMsg] = useState({ message: '', type: '' });

  // 입력 조건 확인
  const [idValidationMsg, setIdValidationMsg] = useState({
    message: '',
    type: '',
  });
  const [pwValidationMsg, setPwValidationMsg] = useState({
    message: '',
    type: '',
  });
  const [bdValidationMsg, setBdValidationMsg] = useState({
    message: '',
    type: '',
  });
  const [pnValidationMsg, setPnValidationMsg] = useState({
    message: '',
    type: '',
  });
  const [emailValidationMsg, setEmailValidationMsg] = useState({
    message: '',
    type: '',
  });

  const validateId = (loginId) => {
    const regex = /^[a-zA-Z0-9]{8,20}$/;
    if (regex.test(loginId)) {
      setIdValidationMsg({
        message: '올바른 형식의 ID입니다.',
        type: 'success',
      });
    } else {
      setIdValidationMsg({
        message: '영문, 숫자를 포함한 8~20자의 ID를 입력해 주세요.',
        type: 'error',
      });
    }
  };

  const validatePw = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (regex.test(password)) {
      setPwValidationMsg({
        message: '적합한 형식의 비밀번호입니다.',
        type: 'success',
      });
    } else {
      setPwValidationMsg({
        message:
          '영문, 숫자, 특수문자를 포함한 8~20자의 비밀번호를 입력해 주세요.',
        type: 'error',
      });
    }
  };

  const validateBd = (birthDate) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(birthDate)) {
      setBdValidationMsg({
        message: '생년월일 입력이 완료되었습니다.',
        type: 'success',
      });
    } else {
      setBdValidationMsg({
        message: 'yyyy-mm-dd 형식을 지켜 생년월일을 입력해 주세요.',
        type: 'error',
      });
    }
  };

  const validatePh = (phoneNum) => {
    const regex = /^\d{3}-\d{4}-\d{4}$/;
    if (regex.test(phoneNum)) {
      setPnValidationMsg({
        message: '휴대폰 번호 입력이 완료되었습니다.',
        type: 'success',
      });
    } else {
      setPnValidationMsg({
        message: '010-1234-5678 형식을 지켜 휴대폰 번호를 입력해 주세요.',
        type: 'error',
      });
    }
  };

  const validateEmail = (emailId) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(emailId)) {
      setEmailValidationMsg({
        message: '이메일 입력이 완료되었습니다.',
        type: 'success',
      });
    } else {
      setEmailValidationMsg({
        message: 'youremail@email.com 형식을 지켜 이메일 주소를 입력해 주세요.',
        type: 'error',
      });
    }
  };

  const handleClickGender = (e) => {
    setGender(e.target.value);
  };

  const handleClickNationality = (e) => {
    setNationality(e.target.value);
  };

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
      if (response.data.resultCode === 'SUCCESS') {
        window.alert('회원가입이 성공적으로 처리되었습니다.');
        navigate('/login');
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log('회원가입 오류', err);
    }
  };

  const handleDuplicate = async (e) => {
    try {
      e.preventDefault();
      const response = await apiGetIsLoginDuplicate(loginId);
      setDuplicateMsg({
        message: '사용 가능한 ID입니다.',
        type: 'success',
      });
    } catch (err) {
      setDuplicateMsg({
        message: '이미 존재하는 ID입니다.',
        type: 'error',
      });
      console.log('로그인 아이디 중복 조회 실패: ', err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Container>
        <RegisterContainer>
          <Title>Join Surf</Title>
          <RegisterForm>
            <div className="inputContainer">
              <span className="inputLabel">아이디</span>
              <Input
                type="text"
                placeholder="영문, 숫자 포함 8~20자"
                name="loginId"
                value={loginId}
                onChange={(e) => {
                  setLoginId(e.target.value);
                  validateId(e.target.value);
                }}
              />
              <ValidationMsg
                style={{
                  color: idValidationMsg.type === 'success' ? '#3182f6' : 'red',
                }}
              >
                {idValidationMsg.message}
              </ValidationMsg>
              {idValidationMsg.type === 'success' && (
                <>
                  <DuplicateBtn onClick={handleDuplicate}>
                    중복 확인
                  </DuplicateBtn>
                  <ValidationMsg
                    style={{
                      color:
                        duplicateMsg.type === 'success' ? '#3182f6' : 'red',
                    }}
                  >
                    {duplicateMsg.message}
                  </ValidationMsg>
                </>
              )}
            </div>
            <div className="inputContainer">
              <span className="inputLabel">비밀번호</span>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="영문, 숫자, 특수문자 모두 포함 8~20자"
                name="passwordId"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePw(e.target.value);
                }}
              />
              <StyledIcon
                icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                onClick={togglePasswordVisible}
              ></StyledIcon>
              <ValidationMsg
                style={{
                  color: pwValidationMsg.type === 'success' ? '#3182f6' : 'red',
                }}
              >
                {pwValidationMsg.message}
              </ValidationMsg>
            </div>
            <div className="inputContainer">
              <span className="inputLabel">이름</span>
              <Input
                type="text"
                placeholder="실명을 입력하세요."
                name="nameId"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <span className="inputLabel">생년월일</span>
              <Input
                type="text"
                placeholder="ex) 1997-01-19"
                name="birthId"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  validateBd(e.target.value);
                }}
              />
              <ValidationMsg
                style={{
                  color: bdValidationMsg.type === 'success' ? '#3182f6' : 'red',
                }}
              >
                {bdValidationMsg.message}
              </ValidationMsg>
            </div>
            <div className="radioInputContainerWrapper">
              <div className="radioInputContainer">
                <span className="inputLabel">성별</span>
                <label>
                  여성
                  <RadioInput
                    type="radio"
                    name="gender"
                    value="WOMAN"
                    checked={gender === 'WOMAN'}
                    onChange={handleClickGender}
                  />
                </label>
                <label>
                  남성
                  <RadioInput
                    type="radio"
                    name="gender"
                    value="MAN"
                    checked={gender === 'MAN'}
                    onChange={handleClickGender}
                  />
                </label>
              </div>
              <div className="radioInputContainer">
                <span className="inputLabel">국적</span>
                <label>
                  내국인
                  <RadioInput
                    type="radio"
                    name="nationality"
                    value="Domestic"
                    checked={nationality === 'Domestic'}
                    onChange={handleClickNationality}
                  />
                </label>
                <label>
                  외국인
                  <RadioInput
                    type="radio"
                    name="nationality"
                    value="Foreigner"
                    checked={nationality === 'Foreigner'}
                    onChange={handleClickNationality}
                  />
                </label>
              </div>
            </div>
            <div className="inputContainer">
              <span className="inputLabel">휴대폰 번호</span>
              <Input
                type="text"
                placeholder="ex) 010-1234-5678"
                name="phoneNumId"
                value={phoneNum}
                onChange={(e) => {
                  setPhoneNum(e.target.value);
                  validatePh(e.target.value);
                }}
              />
              <ValidationMsg
                style={{
                  color: pnValidationMsg.type === 'success' ? '#3182f6' : 'red',
                }}
              >
                {pnValidationMsg.message}
              </ValidationMsg>
            </div>
            <div className="inputContainer">
              <span className="inputLabel">Email</span>
              <Input
                type="text"
                placeholder="이메일 형식을 확인해주세요."
                name="emailId"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
              <ValidationMsg
                style={{
                  color:
                    emailValidationMsg.type === 'success' ? '#3182f6' : 'red',
                }}
              >
                {emailValidationMsg.message}
              </ValidationMsg>
            </div>
          </RegisterForm>
          <RegiserBtn onClick={handleRegister}>회원가입</RegiserBtn>
        </RegisterContainer>
      </Container>
    </>
  );
}
