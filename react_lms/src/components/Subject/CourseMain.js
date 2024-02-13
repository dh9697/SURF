import React, { useEffect, useState } from "react";
import { apiGetAllCourses, apiGetCourseBySubject } from "../RestApi";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import thumbnailSample from "../image/surf_logo.png";
import { formatPrice } from "../Util/util";
import { Icon } from "@iconify/react";

const Container = styled.div`
  width: 100%;
  & .innerWrapper {
    padding: 2rem 0;
  }
`;
const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  align-items: center;
  justify-content: center;
  & .gridItem {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    & .courseText {
      display: flex;
      flex-direction: column;
      gap: 5px;
      & .courseName {
        font-size: 1.5rem;
        color: #454545;
      }
      & .subjectName {
        padding-top: 10px;
      }
      & .instructorNames {
      }
      & .price {
        color: #3182f6;
        font-size: 1rem;
        font-weight: 900;
      }
    }
  }
`;

const HoverInfo = styled(NavLink)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  text-decoration: none;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all linear 0.2s;
  .gridItem:hover & {
    opacity: 1;
  }
  & h3 {
    font-size: 1.5rem;
    padding-bottom: 1rem;
  }
  & .click {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
  }
  & .hoverItem {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const ImgBox = styled.div`
  width: 300px;
  height: 200px;
  background-color: gray;
  & img {
    width: 100%;
  }
`;

const TitleNavLink = styled(NavLink)`
  text-decoration: none;
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
          console.log(response.data.data);
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
            <div className="gridItem" key={course.courseId}>
              <HoverInfo to={`/course/${course.courseId}`}>
                <h3>{course.courseName}</h3>
                <div className="hoverItem">
                  <Icon icon="fontisto:folder"></Icon>
                  {course.subject && <p>{course.subject.subjectName}</p>}
                </div>
                <div className="hoverItem">
                  <Icon icon="carbon:skill-level-advanced"></Icon>
                  <p>{course.contentLevel}</p>
                </div>
                <div className="hoverItem">
                  <Icon icon="zondicons:time"></Icon>
                  <p>{course.durationMins} 분</p>
                </div>
                <p className="click">강의 상세 보기</p>
              </HoverInfo>
              <ImgBox>
                <img src={thumbnailSample} alt="sample" />
              </ImgBox>
              <div className="courseText">
                {course.subject && <p>{course.subject.subjectName}</p>}
                <h2 className="courseName">{course.courseName}</h2>
                <p className="instructorNames">{course.instructorNames}</p>
                <p className="price">{formatPrice(course.price)}</p>
              </div>
            </div>
          ))}
        </CoursesGrid>
      </div>
    </Container>
  );
}
