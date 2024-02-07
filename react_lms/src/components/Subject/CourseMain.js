import React, { useEffect, useState } from "react";
import { apiGetAllCourses, apiGetCourseBySubject } from "../RestApi";
import styled from "styled-components";
import { NavLink, useLocation, useParams } from "react-router-dom";
// import { thumbnailSample } from "../image/귀찮네.webp";

const Container = styled.div`
  width: 100%;
`;
const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  list-style: none;
`;
export function CourseMain() {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const subjectId = location.pathname.split("/")[3];

  useEffect(() => {
    if (location.pathname.includes("subject")) {
      // '/course/subject/:subjectId' 경로에서 렌더링되는 경우
      apiGetCourseBySubject(subjectId)
        .then((response) => {
          setCourses(response.data.data);
        })
        .catch((error) => {
          console.log("서브젝트 코스 불러오기 오류: ", error);
        });
    } else {
      // '/course' 경로에서 렌더링되는 경우
      apiGetAllCourses()
        .then((response) => {
          setCourses(response.data.data);
        })
        .catch((error) => {
          console.error("코스 불러오기 오류: ", error);
        });
    }
  }, [location, subjectId]);

  return (
    <Container>
      <div className="innerWrapper">
        <CoursesGrid>
          {courses.map((course) => (
            <div key={course.courseId}>
              <strong>
                <NavLink to={`/course/${course.courseId}`}>
                  {course.courseName}
                </NavLink>
              </strong>
              {/* <img src={thumbnailSample} alt="sample" /> */}
              <p>설명: {course.description}</p>
              <p>수업 시간: {course.durationMins} 분</p>
              <p>콘텐츠 레벨: {course.contentLevel}</p>
              <p>가격: {course.price} 원</p>
              <p>선생님: {course.instructorNames}</p>
            </div>
          ))}
        </CoursesGrid>
      </div>
    </Container>
  );
}
