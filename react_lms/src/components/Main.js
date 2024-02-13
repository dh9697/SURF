import styled from "styled-components";
import { NavLink } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { TestSwiper } from "./TestSwiper";
import surfboard2_black from "./image/surfboard2_black.png";
import surfboard2_color from "./image/surfboard2_color.png";
import surfboard_black from "./image/surfboard_black.png";
import surfboard_color from "./image/surfboard_color.png";
import wave_black from "./image/wave_black.png";
import wave_color from "./image/wave_color.png";
// import { Wave } from "./Wave";
import ad from "./image/ad.jpg";
import image from "./image/image.png";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Container = styled.div`
  width: 100%;
`;

const Slogan = styled.div`
  width: 100%;
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  /* 첫 번째 자식 요소를 제외한 모든 자식 요소에 margin-top을 적용 */
  > :not(:first-child) {
    margin-top: 40px;
  }
`;

const Tagline = styled.p`
  /* margin-top: 2%; */
  padding-top: 3rem;
  text-align: center;
  font-size: 65px;
  font-weight: bold;
  /* color: rgb(59 130 246/0.5); */
  /* text-shadow: #0000; */
`;

const Catchphrase = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: normal;
  line-height: 25px;
`;

const StartBtn = styled(NavLink)`
  width: 110px;
  height: 55px;
  border: 2.5px solid #3182f6; // border shorthand를 사용하여 테두리 스타일링
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none; // NavLink의 기본 스타일링 제거
  color: inherit;
  margin-bottom: 8rem;
`;

// const AdBox = styled.div`
//   background: linear-gradient(to top, #3182f6, #a6c8ff);
// `;

const Square = styled.div`
  width: 100%;
  height: 280px;
  background-color: transparent;
  background-color: #3182f6;
  /* background: linear-gradient(to top, #3182f6, #a6c8ff); */
  transform: skewY(-7deg);
`;

const Advertise = styled.div`
  width: 100%;
  height: 700px;
  background-color: transparent;
  background-color: #3182f6;
  /* background: linear-gradient(to top, #3182f6, #a6c8ff); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 30px;
  margin-top: -8.5rem;
`;

const AdTitle = styled.p`
  font-size: 55px;
  color: white;
  z-index: 10;
  margin-bottom: 4rem;
`;

const Package = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PackageImg = styled.img`
  width: 100%;
`;

const Review = styled.div`
  width: 100%;
  background: linear-gradient(to top, #3182f6, #a6c8ff);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const ReviewTitle = styled.p`
  color: white;
  font-size: 60px;
`;

const ReviewExpain = styled.p`
  color: white;
  font-size: 20px;
`;

const ReviewBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  text-align: center;
  line-height: 40px;
  padding: 55px 40px;
  color: white;
`;

const ReviewNum = styled.p`
  font-size: 40px;
`;

const ReviewTxt = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const ReviewContBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px; /* 요소들 사이의 간격 설정 */
  place-items: center;
  padding: 50px 40px;
`;

const ReviewContents = styled.div`
  width: 500px;
  height: 200px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.2);
  }
`;

const Contact = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: white;
  padding-bottom: 15rem;
`;

const ContactTitle = styled.p`
  padding-top: 5rem;
  font-size: 20px;
  font-weight: bold;
`;

const ContactDescript = styled.p`
  font-size: 60px;
  font-weight: bold;
  padding-bottom: 5rem;
`;

const ContactBox = styled.div`
  width: 900px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e0ecff;
  border: 3px solid #8bbafc; // border shorthand를 사용하여 테두리 스타일링
  border-radius: 40px;
  padding-bottom: 10rem;
`;

const InputBox = styled.div`
  width: 100%;
  padding: 10px 250px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

const Text = styled.p`
  padding-top: 50px;
  font-weight: bold;
  font-size: 18px;
  color: black;
`;

const Input = styled.input`
  background-color: transparent;
  border: none; /* 기존의 border 속성 제거 */
  border-bottom: 2px solid #d9d9d9; /* 아래쪽 보더 추가 */
  padding: 10px 5px;
  width: 100%;
  color: #3182f6;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  outline: none; /* 포커스시 외곽선 제거 */
  transition: border-bottom-color 0.3s ease; /* 보더 색상 변경시 애니메이션 효과 */
  &:focus {
    border-bottom-color: #3182f6; /* 포커스시 아래쪽 보더 색상 변경 */
  }
`;

const CallBox = styled.div`
  width: 100%;
  margin-top: 10px;
  border: 3px solid #8bbafc;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CallTxt = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  white-space: nowrap;
`;

const CallHr = styled.p`
  font-size: 16px;
  padding: 20px;
`;

const HrSelect = styled.select`
  background-color: transparent;
  font-size: 20px;
  padding: 20px;
  width: 100%;
  height: 73px;
  border: 3px solid #8bbafc;
  border-top: none;
  font-weight: bold;
  font-size: 20px;
  outline: none; /* 포커스시 외곽선 제거 */
`;

const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 13px;
`;

const CheckItem = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid #3182f6;
  outline: none;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: #3182f6;
  }

  /* 체크박스가 체크될 때 가상 요소 사용 */
  &:checked::before {
    content: "";
    position: absolute;
    width: 6px; /* 체크 표시의 너비 */
    height: 12px; /* 체크 표시의 높이 */
    border: solid white; /* 흰색 체크 표시 */
    border-width: 0 2px 2px 0; /* 대각선 모양 만들기 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg); /* 대각선 회전 */
  }
`;

// !!!나중에 할 것!!!
// 상담 신청 버튼이라 버튼 눌렀을 때 상담 신청이 완료되었습니다 같은 모달/팝업창 뜨도록
const CallBtn = styled.button`
  width: 305px;
  height: 75px;
  margin: 45px;
  padding: 20px;
  color: white;
  font-weight: 600;
  font-size: 20px;
  background: #3182f6;
  border: 2px solid #3182f6;
  border-radius: 2000em;
  display: block;
  cursor: pointer;
`;

const Starthiddn = styled.div`
  width: 110px;
  height: 55px;
  border: 2.5px solid transparent; // border shorthand를 사용하여 테두리 스타일링
  margin-bottom: 8rem;
`;

const Topline = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
`;

const ReviewText = styled.div`
  font-weight: bold;
  color: #333;
  margin-top: 10px;
  text-align: center;
`;

// 아바타 링크
// "https://source.boringavatars.com/beam/60/zzZ?colors=E0EFF1,D4ECFD,ABDBFF,BBD6F9,8BC0E5",
// 60/zzZ? 이 링크의 zzZ 부분의 사용자의 닉네임 혹은 아이디가 들어가야 함

export function Main() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isBtnEnabled, setIsBtnEnabled] = useState(false);
  // const [postCheckMap, setPostCheckMap] = useState({}); /* 아바타 - 1 차 archive.js 참고하기*/

  useEffect(() => {
    if (name.trim() !== "" && phoneNum.trim() !== "" && isConsentChecked) {
      setIsBtnEnabled(true);
    } else {
      setIsBtnEnabled(false);
    }
  }, [name, phoneNum, isConsentChecked]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumChange = (event) => {
    setPhoneNum(event.target.value);
  };

  const handleConsentCheckChange = (event) => {
    setIsConsentChecked(event.target.checked);
  };

  const handleRequest = () => {
    alert("상담 신청이 완료되었습니다");
  };

  // 상담 가능 시간 옵션
  const consultationTimes = [
    "아무때나",
    "10:00 ~ 10:30",
    "11:00 ~ 11:30",
    "11:30 ~ 12:00",
    "12:00 ~ 12:30",
    "13:30 ~ 14:00",
    "14:00 ~ 14:30",
    "14:30 ~ 15:00",
    "15:00 ~ 15:30",
    "15:30 ~ 16:00",
    "16:30 ~ 17:00",
    "17:30 ~ 17:30",
    "17:30 ~ 18:00",
  ];

  return (
    <>
      <Container>
        <Slogan>
          <Tagline>
            Surf through English
            <br />
            Your Wave to Success Starts Here
          </Tagline>
          <Catchphrase>
            영어를 향한 파도를 타다
            <br />
            SURF와 함께라면 가능합니다
          </Catchphrase>
          {user ? (
            <Starthiddn></Starthiddn>
          ) : (
            <StartBtn to={"/login"}>START</StartBtn>
          )}
        </Slogan>
        {/* <AdBox> */}
        <Square></Square>
        <Advertise>
          <AdTitle>Introduce SURF</AdTitle>
          <TestSwiper />
        </Advertise>
        {/* </AdBox> */}
        <Package>
          <PackageImg src={ad} alt="Package Image" />
          <PackageImg src={image} alt="Package Image" />
        </Package>
        <Review>
          <ReviewTitle>Meet Our Students</ReviewTitle>
          <ReviewExpain>학생들의 평가가 증명하는 SURF</ReviewExpain>
          <ReviewBox>
            <ReviewNum>
              2023
              <ReviewTxt>검증된 압도적 강의력</ReviewTxt>
            </ReviewNum>
            <ReviewNum>
              10만+
              <ReviewTxt>누적 수강생</ReviewTxt>
            </ReviewNum>
            <ReviewNum>
              96%
              <ReviewTxt>자격증 시험 합격률</ReviewTxt>
            </ReviewNum>
            <ReviewNum>
              200+
              <ReviewTxt>강의당 평균 영상 개수</ReviewTxt>
            </ReviewNum>
          </ReviewBox>
          <ReviewContBox>
            <ReviewContents>
              <Topline>
                <Img src={surfboard2_black} alt="surfboard2" />
              </Topline>
              <ReviewText>
                선생님이 재미있어서 강의 들을 때 지루하지 않아요. 추천합니당.
              </ReviewText>
            </ReviewContents>
            <ReviewContents>
              <Topline>
                <Img src={surfboard_black} alt="surfboard" />
              </Topline>
              <ReviewText>
                외국인인 제가 듣기에도 좋은 강의네요. 추천.
              </ReviewText>
            </ReviewContents>
            <ReviewContents>
              <Topline>
                <Img src={wave_black} alt="wave" />
              </Topline>
              <ReviewText>
                강의 재미있네요. ^^ 다들 한 번씩 들어 보시길 추천합니다. ^^7
              </ReviewText>
            </ReviewContents>
          </ReviewContBox>
        </Review>
        <Contact>
          <ContactTitle>SURF에 대해 궁금한 점이 있으신가요?</ContactTitle>
          <ContactDescript>전문가와 상담해 보세요</ContactDescript>
          <ContactBox>
            <InputBox>
              <Text>이름</Text>
              <Input
                type="text"
                placeholder="이름을 입력해 주세요"
                value={name}
                name="name"
                onChange={handleNameChange}
              ></Input>
            </InputBox>
            <InputBox>
              <Text>휴대폰 번호</Text>
              <Input
                type="text"
                placeholder="휴대폰 번호를 입력해 주세요"
                name="phoneNum"
                value={phoneNum}
                onChange={handlePhoneNumChange}
              ></Input>
            </InputBox>
            <InputBox>
              <Text>전화 상담</Text>
              <CallBox>
                <CallTxt>상담 가능 시간</CallTxt>
                <CallHr>평일: 10:00 ~ 18:00</CallHr>
              </CallBox>
              <HrSelect>
                {consultationTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </HrSelect>
            </InputBox>
            <CheckBox>
              <CheckItem>
                <CheckboxInput
                  type="checkbox"
                  checked={isConsentChecked}
                  onChange={handleConsentCheckChange}
                />
                [필수] 개인정보 수집·이용 동의
              </CheckItem>
              <CheckItem>
                <CheckboxInput type="checkbox" />
                [선택] SMS 광고 및 마케팅 이용 동의
              </CheckItem>
            </CheckBox>
            <CallBtn onClick={handleRequest} disabled={!isBtnEnabled}>
              상담 신청하기
            </CallBtn>
          </ContactBox>
        </Contact>
      </Container>
    </>
  );
}
