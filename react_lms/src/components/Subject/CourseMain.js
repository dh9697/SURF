import React, { useEffect, useState } from "react";
import { apiGetAllCourses } from "./RestApi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

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

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    apiGetAllCourses()
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error("코스 불러오기 오류: ", error);
      });
  };

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
              <p>코스 썸네일 올려야함</p>
              <p>설명: {course.description}</p>
              <p>수업 시간: {course.durationMins} 분</p>
              <p>콘텐츠 레벨: {course.contentLevel}</p>
              <p>가격: {course.price} 원</p>
              <p>공지사항: {course.announcement}</p>
              <p>선생님: {course.instructorNames}</p>
            </div>
          ))}
        </CoursesGrid>
      </div>
    </Container>
  );
}
