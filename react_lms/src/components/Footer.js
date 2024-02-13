import styled from "styled-components";
import surfLogo from "./image/surf_logo.png";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  background-color: rgb(59 130 246/0.3);
  text-shadow: #0000;
`;

const FooterBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const Left = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.7fr;
`;

const LogoImgBox = styled.div`
  width: 100px;
`;
const LogoImg = styled.img`
  width: 100%;
`;

const LeftTop = styled.div`
  padding-left: 23rem;
  font-size: 15px;
  line-height: 25px;
`;

const LeftBot = styled.div`
  padding-top: 2.5rem;
  padding-left: 23rem;
  font-size: 15px;
`;

const Right = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const RightTop = styled.div`
  padding-top: 2rem;
  font-size: 23px;
  font-weight: bolder;
`;

const RightBot = styled.div``;

export function Footer() {
  const location = useLocation();
  if (location.pathname.includes('/content/')) {
    return null;
  }
  return (
    <>
      <Container>
        <FooterBox>
          <Left>
            <LeftTop>
              <LogoImgBox>
                <LogoImg src={surfLogo} alt="Logo Image" />
              </LogoImgBox>
              <br />
              ㈜ 서프에듀케이션&nbsp;&nbsp;대표이사 윤지희 김다혜 고채영
              <br />
              사업자등록번호: 000-00-00000&nbsp;&nbsp;학원설립운영등록번호:
              제0000호
              <br />
              서프에듀원격학원&nbsp;&nbsp;통신판매번호: 제0000-대전광역시-0000호
              <br />
            </LeftTop>
            <LeftBot>ⓒ Copyright SURFEDUCATION All rights reserved</LeftBot>
          </Left>
          <Right>
            <RightTop>
              고객센터
              <br />
              042-000-0000
            </RightTop>
            <RightBot>
              평일: 09:00 ~ 19:00
              <br />
              토요일: 09:00 ~ 14:00
              <br />
              휴게시간: 12:00 ~ 13:00
              <br /> 휴무일: 일요일 및 공휴일 휴무
            </RightBot>
          </Right>
        </FooterBox>
      </Container>
    </>
  );
}
