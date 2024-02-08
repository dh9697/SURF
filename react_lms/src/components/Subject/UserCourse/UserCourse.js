import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  apiGetCourse,
  apiGetContentByCourse,
  apiCreateCart,
  apiAddCourseToCart,
  apiGetMyCourseHistroies,
} from "../../RestApi";
import { AuthContext } from "../../../AuthContext";

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
  const { user } = useContext(AuthContext);
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [content, setContent] = useState([]);
  const [courseHistory, setCourseHistory] = useState([]);

  // courseId로 course 조회
  useEffect(() => {
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("강의 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  // courseId로 content 조회
  useEffect(() => {
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContent(response.data.data);
      })
      .catch((error) => {
        console.error("컨텐츠 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

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
              <Section id="description">
                <h1>강의 소개</h1>
                <p>{course.description}</p>
              </Section>
              <Section id="content">
                <h1>커리큘럼</h1>
                {content.map((item, index) => (
                  <p key={index}>{`${index + 1}. ${item.contentTitle}`}</p>
                ))}
              </Section>
              <Section id="review">
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
