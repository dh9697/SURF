import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../AuthContext';
import { apiGetContentByCourse, apiGetExamByContent } from '../../RestApi';

const Container = styled.div``;

export function ExamOverview() {
  const { user } = useContext(AuthContext);
  const courses = user.teachingCourses;
  const [contents, setContents] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchedContentsAndExams = async () => {
      try {
        // 모든 코스에 대한 콘텐츠 조회
        const contentsPromises = courses.map((course) =>
          apiGetContentByCourse(course.courseId)
        );
        const contentsResponses = await Promise.all(contentsPromises);
        const fetchedContents = contentsResponses.flatMap(
          (response) => response.data.data
        );
        setContents(fetchedContents);

        // 각 콘텐츠에 대한 시험 정보 조회
        const examsPromises = fetchedContents.map((content) =>
          apiGetExamByContent(content.contentId)
        );
        const examsResponses = await Promise.all(examsPromises);
        const fetchedExams = examsResponses.flatMap(
          (response) => response.data.data
        );
        setExams(fetchedExams);
        console.log(fetchedExams);
      } catch (err) {
        console.log('콘텐츠 또는 시험 조회 실패: ', err);
      }
    };
    fetchedContentsAndExams();
  }, [courses]);

  const activeInactiveCounts = exams.reduce(
    (acc, exam) => {
      if (exam && exam.examIsActive) {
        acc.active += 1;
      }
      return acc;
    },
    { active: 0 }
  );

  return (
    <>
      <Container>
        {courses.map((course) => (
          <p key={course.courseId}>{course.courseName} 시험 관리</p>
        ))}
        <p>시험 생성</p>
        <h3>
          {exams.length}/{contents.length}
        </h3>
        <p>
          {contents.length - exams.length === 0
            ? '모든 시험을 생성하였습니다.'
            : `${contents.length - exams.length}개의 시험을 생성해야 합니다.`}
        </p>
        <p>시험 활성화</p>
        <h3>
          {activeInactiveCounts.active}/{exams.length}
        </h3>
        <p>
          {exams.length - activeInactiveCounts.active === 0
            ? '모든 시험이 활성화되었습니다.'
            : `${
                exams.length - activeInactiveCounts.active
              }개의 시험을 활성화 해주세요.`}
        </p>
        <p>문제 등록 현황</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {exams.map(
            (exam, index) =>
              exam && (
                <div
                  key={exam.examId}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    width: '200px',
                    textAlign: 'center',
                  }}
                >
                  <h4>{index + 1}강 시험</h4>
                  <p>
                    문제 수: <strong>{exam.examQuestions.length || 0}개</strong>
                  </p>
                </div>
              )
          )}
        </div>
      </Container>
    </>
  );
}
