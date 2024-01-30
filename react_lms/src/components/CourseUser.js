import styled from "styled-components";
import { CourseTitle } from "./CourseTitle";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiGetCourse, apiGetContentByCourse } from "./RestApi";

const ContentWrap = styled.div`
  width: 100%;
`;
const ContentBox = styled.div`
  width: 100%;
  display: flex;
  padding-top: 30px;
`;
const ContentRight = styled.div`
  display: block;
  max-width: 800px;
  padding: 0 20px;
`;
const ContentLeft = styled.div`
  position: sticky;
  top: 75px;
  margin: 0 34px 20px auto;
  width: 332px;
  border: 1px solid darkblue;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  padding: 32px 24px 32px 16px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  background-color: #fff;
`;

const Button = styled.div`
  text-decoration: none;
  text-align: center;
  color: #3182f6;
  width: 100%;
  border: 2px solid #3182f6;
  padding: 15px 0;
  border-radius: 5px;
  font-weight: 900;
`;

export function CourseUser() {
  const { courseId } = useParams(); //동적 경로를 위함
  const [course, setCourse] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    // courseId를 사용하여 강의 정보를 불러옴
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data); // 불러온 강의 정보를 상태에 저장
      })
      .catch((error) => {
        console.error("강의 정보 불러오기 오류: ", error);
      });
  }, [courseId]); // courseId가 변경될 때마다 useEffect를 다시 실행

  useEffect(() => {
    console.log(course);
  }, [course]);

  useEffect(() => {
    // courseId를 사용하여 강의 정보를 불러옴
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContent(response.data.data); // 불러온 강의 정보를 상태에 저장
      })
      .catch((error) => {
        console.error("컨텐츠 정보 불러오기 오류: ", error);
      });
  }, [courseId]); // courseId가 변경될 때마다 useEffect를 다시 실행

  console.log(content.map((item) => item.contentTitle));

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {course && content && (
        <>
          <CourseTitle />
          <ContentWrap>
            <ContentBox>
              <ContentRight>
                <Section>
                  <h1>강의 소개</h1>
                  <p>{course.description}</p>
                </Section>
                <Section>
                  <h1>커리큘럼</h1>
                  {content.map((item, index) => (
                    <p key={index}>{`${index + 1}. ${item.contentTitle}`}</p>
                  ))}
                </Section>
                <Section>
                  <h1>수강평</h1>
                  <p>{course.description}</p>
                </Section>
              </ContentRight>
              <ContentLeft>
                <div>
                  <p>선생님: {course.instructorNames}</p>
                  <p>총 강의 개수: {content.length}</p>
                  <p>수료증: </p>
                  <p>가격: {course.price}</p>
                </div>
                <Button>수강 신청하러 가기</Button>
                <Button>카트에 담기</Button>
              </ContentLeft>
            </ContentBox>
          </ContentWrap>
        </>
      )}
    </>
  );
}
