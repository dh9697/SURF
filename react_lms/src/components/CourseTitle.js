import styled from "styled-components";
import surf_logo from "./image/surf_logo.png";
import { Outlet, useParams, NavLink } from "react-router-dom";
import { CourseSidebar } from "./CourseSidebar";
import { CourseMenu } from "./CourseMenu";

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
  padding: 30px;
`;

const ImgBox = styled.img`
  width: 50%;
`;

const InfoRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 32px;
`;

const Breadcrumb = styled.div``;

const ContentMain = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 20px;
`;

export function CourseTitle() {
  const { courseId } = useParams();

  return (
    <>
      <Container>
        <Wrapper>
          <Thumbnail>
            <ImgBox src={surf_logo} alt="Sample"></ImgBox>
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
      <CourseMenu />
      <ContentMain>
        <Outlet />
        <CourseSidebar />
      </ContentMain>
    </>
  );
}
