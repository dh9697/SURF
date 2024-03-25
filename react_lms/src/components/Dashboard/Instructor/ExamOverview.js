import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../AuthContext";
import { apiGetContentByCourse, apiGetExamByContent } from "../../RestApi";

const Container = styled.div`
  & .examWrapper {
    padding: 0 1rem;
    margin-top: 1rem;
  }
`;
const ExamInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 0.5rem 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  & p {
    text-align: center;
    & span {
      color: #3182f6;
      font-size: 1rem;
      font-weight: 900;
    }
  }
`;

const ExamQuestionInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 0.5rem 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

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
        console.log("콘텐츠 또는 시험 조회 실패: ", err);
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
          <div className="examWrapper" key={course.courseId}>
            <h3>{course.courseName} 시험 관리</h3>
            <ExamInfo>
              <p>
                <span>{contents.length || 0}</span>개의 강의
              </p>
              <p>
                <span>{exams.filter((exam) => exam !== null).length || 0}</span>
                개의 시험 생성
              </p>
              <p>
                <span>{activeInactiveCounts.active || 0}</span>개의 시험 활성화
              </p>
            </ExamInfo>
            <h4>문제 수 현황</h4>
            <ExamQuestionInfo>
              {exams.map(
                (exam, index) =>
                  exam && (
                    <div key={exam.examId}>
                      <p>
                        {index + 1}강-{" "}
                        <strong>{exam.examQuestions.length || 0}개</strong>
                      </p>
                    </div>
                  )
              )}
            </ExamQuestionInfo>
          </div>
        ))}
      </Container>
    </>
  );
}
