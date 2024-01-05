import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 70px);
  /* overflow-x: hidden;
  overflow-y: auto; */
  /* background-color: #3182f6; */
`;

const Slogan = styled.div`
  width: 100%;
  height: calc(40vh - 70px);
  top: 13%;
  /* background-color: transparent; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* 부모 요소에 대해 상대 위치 설정 */
  /* 사선 효과를 주는 clip-path 속성 */
  /* 첫 번째 자식 요소를 제외한 모든 자식 요소에 margin-top을 적용 */
  > :not(:first-child) {
    margin-top: 40px;
  }
`;

const Tagline = styled.p`
  /* top: 100%; */
  text-align: center;
  font-size: 50px;
  font-weight: bold;
`;

const Catchphrase = styled.p`
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  line-height: 25px;
`;

const StartBtn = styled(NavLink)`
  width: 80px;
  height: 35px;
  border: 2px solid #3182f6; // border shorthand를 사용하여 테두리 스타일링
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none; // NavLink의 기본 스타일링 제거
  color: inherit;
`;

const Advertise = styled.div`
  width: 100%;
  height: 110vh;
  background-color: #3182f6;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: -19%; */
  clip-path: polygon(0 45%, 100% 0, 100% 100%, 0 100%);
  position: relative; /* 상대 위치 설정 */
`;

const AdSlogan = styled.p`
  color: white;
  font-size: 100px;
  padding-top: 20%;
`;

const Package = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 이름은 packageImg이긴 한데 이미지 넣을지 글씨 넣을지 몰라서 일단 p로 해 뒀음 나중에 이미지면 태그 수정하기
const PackageImg = styled.p`
  font-size: 100px;
`;

const Review = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3182f6;
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
  justify-content: center;
  align-items: center;
`;

const ContactInfo = styled.p`
  font-size: 100px;
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
          <AdSlogan>광고 넣는 곳</AdSlogan>
        </Advertise>
        <Package>
          <PackageImg>패키지 광고 넣는 곳</PackageImg>
        </Package>
        <Review>
          <ReviewContents>리뷰 넣는 곳</ReviewContents>
        </Review>
        <Contact>
          <ContactInfo>상담 신청 넣는 곳</ContactInfo>
        </Contact>
      </Container>
    </>
  );
}
