import styled from "styled-components";
import surf_logo from "./image/surf_logo.png";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: gray;
  & header {
    padding: 40px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
`;

const Thumbnail = styled.div`
  padding: 8px 0;
`;
const InfoRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 32px;
`;

const Breadcrumb = styled.div``;
const Menu = styled.div`
  background-color: darkgray;
  display: flex;
  align-items: flex-end;
  height: 45px;
  overflow: auto;
`;

export function CourseTitle() {
  return (
    <>
      <Container>
        <Wrapper>
          <Thumbnail>
            <img src={surf_logo} alt="Sample" />
          </Thumbnail>
          <InfoRight>
            <Breadcrumb>
              <span>토익</span>
              <span>화살표 아이콘</span>
              <span>700 +</span>
            </Breadcrumb>
            <div className="header_title">강의 제목을 적어 보아요</div>
            <div className="star">별 다섯 개</div>
          </InfoRight>
        </Wrapper>
      </Container>
      <Menu>
        <div>강의 소개</div>
        <div>커리큘럼</div>
        <div>수강평</div>
        <div>수강 전 문의</div>
      </Menu>
    </>
  );
}
