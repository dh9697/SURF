import styled from "styled-components";
import { NavLink } from "react-router-dom";
import ad from "./image/ad.jpg";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Container = styled.div`
  width: 100vw;
  /* height: calc(1000px - 70px); */
  /* overflow-x: hidden; */
  overflow-y: hidden;
  /* background-color: black; */
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
`;

const Advertise = styled.div`
  width: 100%;
  height: 1000px;
  /* background-color: #3182f6; */
  background: linear-gradient(to top, #3182f6, #a6c8ff);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 30px;
  /* margin-top: -19%; */
  clip-path: polygon(0 35%, 100% 0%, 100% 100%, 0 100%);
  /* position: relative; 상대 위치 설정 */
  padding-top: 20rem;
`;

const AdBox = styled.div`
  width: 1500px;
  height: 480px;
  border: 3px solid #8bbafc; // border shorthand를 사용하여 테두리 스타일링
  border-radius: 10px;
  /* padding-top: 20rem; */
`;

const WhySlogan = styled.p`
  padding-top: 10rem;
  font-size: 70px;
  font-weight: bold;
  color: white;
`;

const Why = styled.p`
  padding-top: 3rem;
  font-size: 18px;
  color: white;
`;

// const HowSlogan = styled.p`
//   padding-top: 10rem;
//   font-size: 70px;
//   font-weight: bold;
//   color: white;
// `;

// const How = styled.p`
//   padding-top: 3rem;
//   font-size: 18px;
//   color: white;
//   padding-bottom: 10rem;
// `;

const Package = styled.div`
  width: 100%;
  display: flex;
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
  justify-content: center;
  align-items: center;
`;

const ReviewContents = styled.p`
  font-size: 100px;
  color: white;
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
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e0ecff;
  border: 3px solid #8bbafc; // border shorthand를 사용하여 테두리 스타일링
  border-radius: 10px;
  padding-bottom: 10rem;
`;

const InputBox = styled.div`
  width: 400px;
  height: 70px;
  padding: 50px 5px;
  display: flex;
  align-items: left;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.p`
  padding-top: 5rem;
  font-weight: bold;
  font-size: 16px;
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

export function Main() {
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
          <StartBtn to={"/login"}>START</StartBtn>
        </Slogan>
        <Advertise>
          <AdBox>
            <WhySlogan>Why Choose SURF?</WhySlogan>
            <Why>
              SURF는 단순한 영어 학습 플랫폼을 넘어서, 사용자들에게 새로운
              경험과 동기를 제공합니다.
              <br />
              우리의 주요 목표는 학습자들이 영어 학습의 장벽을 뛰어넘고,
              자신만의 속도와 방식으로 언어를 습득할 수 있도록 돕는 것입니다.
              <br />
              SURF와 함께라면, 영어 학습이 단순한 과제에서 벗어나 즐거운
              여행으로 변모합니다.
            </Why>
            {/* <HowSlogan>How Does SURF Work?</HowSlogan>
            <How>
              SURF의 핵심 기능은 개인화된 학습 경험을 제공하는 것입니다.
              <br />
              우리의 플랫폼은 사용자의 학습 스타일, 관심사, 그리고 목표에 따라
              맞춤화된 콘텐츠와 도구를 제공합니다.
              <br />
              실시간 피드백, 인터랙티브한 학습 모듈, 그리고 다양한 리소스를
              활용하여 학습자들이 자신의 영어 학습 여정을 효과적으로 관리하고
              발전시킬 수 있습니다.
              <br />
              SURF와 함께라면, 언어 학습이 더욱 효과적이고 즐거운 경험이 될
              것입니다.
            </How> */}
          </AdBox>
        </Advertise>
        <Package>
          <PackageImg src={ad} alt="Package Image" />
        </Package>
        <Review>
          <ReviewContents>리뷰 넣는 곳</ReviewContents>
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
                name="name"
              ></Input>
            </InputBox>
            <InputBox>
              <Text>휴대폰 번호</Text>
              <Input
                type="text"
                placeholder="휴대폰 번호를 입력해 주세요"
                name="phoneNum"
              ></Input>
            </InputBox>
          </ContactBox>
        </Contact>
      </Container>
    </>
  );
}
