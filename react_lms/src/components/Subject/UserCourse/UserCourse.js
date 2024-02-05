import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  apiGetCourse,
  apiGetContentByCourse,
  apiCreateCart,
  apiAddCourseToCart,
} from "../../RestApi";

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
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

export function UserCourse() {
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
  //핸들러 이용해서 버튼 누를 때마다 위치 조정
  return (
    <>
      {course && content && (
        <>
          <ContentWrap>
            <ContentBox>
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
            </ContentBox>
          </ContentWrap>
        </>
      )}
    </>
  );
}
