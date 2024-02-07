import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiGetCourse, apiGetContentByCourse } from "../../RestApi";
import { NavLink } from "react-router-dom";
import { CourseTitle } from "../CourseTitle";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const DashboardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
`;

//얘네 왜 이러는 거예요.....?
const Section = styled.div`
  border: 2px solid gray;
  padding: 20px;
  &.announcement {
    grid-column: span 5;
    grid-row: span 1;
  }
  &.question {
    grid-column: span 5;
    grid-row: span 1;
  }
  &.mylearning {
    grid-column: span 3;
    grid-row: span 2;
  }
  &.contents {
    grid-column: span 8;
    grid-row: span 3;
  }
`;

const DescriptionWrap = styled.div``;

export function MemberCourse() {
  const location = useLocation();
  const courseId = location.pathname.split("/")[2]; // Extract courseId from the URL
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    // Fetch course details based on courseId
    apiGetCourse(courseId)
      .then((response) => {
        console.log(response.data.data);
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("코스 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  useEffect(() => {
    // courseId를 사용하여 강의 정보를 불러옴
    apiGetContentByCourse(courseId)
      .then((response) => {
        console.log(response.data.data);
        setContent(response.data.data); // 불러온 강의 정보를 상태에 저장
      })
      .catch((error) => {
        console.error("컨텐츠 정보 불러오기 오류: ", error);
      });
  }, [courseId]); // courseId가 변경될 때마다 useEffect를 다시 실행

  console.log(content.map((item) => item.contentTitle));

  return (
    <>
      <Container>
        <DashboardWrap>
          <Section className="announcement">
            <p>강의 공지</p>
            {course && course.announcement && <p>{course.announcement}</p>}
          </Section>
          <Section className="question">
            <p>내가 최근에 한 질문</p>
          </Section>
          <Section className="mylearning">
            <p>내 학습 같은 것(완료 수업 총 학습 시간)</p>
          </Section>
          <Section className="contents">
            <p>커리큘럼</p>
            {content.map((item, index) => (
              <div key={index}>
                {`${index + 1}. ${item.contentTitle}`}
                <NavLink to={`/content/${index + 1}`}>
                  contentDuration추가 수강 듣기
                </NavLink>
                {/* restApi 추가 후 index 진행 */}
                <div>
                  contentId - examID - examquestionId "과제 index+1"
                  <button>풀기</button>
                </div>
              </div>
            ))}
          </Section>
        </DashboardWrap>
      </Container>
    </>
  );
}
