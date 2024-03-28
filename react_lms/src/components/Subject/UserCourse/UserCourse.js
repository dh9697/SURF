import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { apiGetCourse, apiGetContentByCourse } from '../../RestApi';
import { AuthContext } from '../../../AuthContext';
import { CourseCurriculem } from '../CourseCurriculum';
import { CourseDescription } from '../MemberCourse/CourseDescription';

const Container = styled.div`
  width: 100%;
`;

const Section = styled.div`
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-top: 1rem;
`;

export function UserCourse() {
  const { user } = useContext(AuthContext);
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [content, setContent] = useState([]);

  // courseId로 course 조회
  useEffect(() => {
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error('강의 정보 불러오기 오류: ', error);
      });
  }, [courseId]);

  // courseId로 content 조회
  useEffect(() => {
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContent(response.data.data);
      })
      .catch((error) => {
        console.error('컨텐츠 정보 불러오기 오류: ', error);
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
          <Container>
            <CourseDescription />
            <Section>
              <CourseCurriculem />
            </Section>
          </Container>
        </>
      )}
    </>
  );
}
