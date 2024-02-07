import styled from "styled-components";
import surf_logo from "../image/surf_logo.png";
import { Outlet, useParams } from "react-router-dom";
import { CourseSidebar } from "./CourseSidebar";
import { CourseMenu } from "./CourseMenu";
import { useEffect, useState } from "react";
import { apiGetCourse } from "../RestApi";

const Container = styled.div`
  width: 100%;
  background-color: gray;
  padding: 30px;
  & .innerWrapper {
    display: grid;
    grid-template-columns: 2fr 3fr;
  }
`;

const ImgBox = styled.div`
  padding: 100px 0;
  background-color: darkgray;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const CourseInfo = styled.div`
  background-color: red;
`;

const ContentMain = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 20px;
`;

export function CourseTitle() {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("강의 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  return (
    <>
      <Container>
        <div className="innerWrapper">
          <ImgBox>
            <Img src={surf_logo} alt="Sample"></Img>
          </ImgBox>
          <CourseInfo>
            <h3>{course.subject && course.subject.subjectName}</h3>
            <h1>{course.courseName}</h1>
            <p>{course.instructorNames}</p>
            <span>화살표 아이콘</span>
            <span>700 +</span>
            <div className="star">별 다섯 개 (코스리뷰)</div>
          </CourseInfo>
        </div>
      </Container>
      <CourseMenu />
      <ContentMain>
        <Outlet />
        <CourseSidebar />
      </ContentMain>
    </>
  );
}
