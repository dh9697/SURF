import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  apiGetContentByCourse,
  apiGetExamByContent,
  apiGetQuestionsForExam,
  apiGetAllExamQuestions,
  apiGetCompletedContentHistories,
} from "../RestApi";
import { formatTime } from "../Util/util";
import { useEffect, useState } from "react";

const Container = styled.div`
  .content.completed {
    background-color: #f3f3f3;
    & .text {
      color: #3182f6;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #454545;
  cursor: pointer;
`;

const TaskWrapper = styled.div`
  margin-top: 8px;
  font-size: 14px;
`;

export function CourseCurriculem() {
  const { courseId } = useParams();
  const [content, setContent] = useState([]);
  const [completedContents, setCompletedContents] = useState([]);
  const [exams, setExams] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);

  // 해당 코스 컨텐츠 조회
  useEffect(() => {
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContent(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("컨텐츠 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  // 완료된 컨텐츠 히스토리 조회
  useEffect(() => {
    apiGetCompletedContentHistories()
      .then((response) => {
        setCompletedContents(response.data.data);
      })
      .catch((error) => {
        console.error("완료된 학습 이력 조회 오류: ", error);
      });
  }, []);

  // 컨텐츠당 exam 조회
  // useEffect(() => {
  //   apiGetExamByContent(content.contentId)
  //     .then((response) => {
  //       setExams(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log("컨텐츠당 시험 조회 실패", error);
  //     });
  // });

  useEffect(() => {
    const fetchExams = async () => {
      const examsTemp = [];
      for (let item of content) {
        try {
          const response = await apiGetExamByContent(item.contentId);
          examsTemp.push(response.data.data);
        } catch (error) {
          console.error("시험 조회 오류: ", error);
        }
      }
      setExams(examsTemp);
    };

    fetchExams();
  }, [content]);

  return (
    <>
      <Container>
        <h2 className="title">
          커리큘럼
          <span className="contentInfo">
            총 {content?.length || 0}개,{" "}
            {formatTime(
              content?.reduce(
                (acc, cur) => acc + (cur.course.durationMins || 0),
                0
              ) || 0
            )}
            의 수업
          </span>
        </h2>
        {content?.map((item, index) => {
          const isCompleted = completedContents.find(
            (history) => history.content.contentId === item.contentId
          );
          const exam = exams.find((exam) => exam?.contentId === item.contentId);
          console.log();
          return (
            <div
              className={`content ${isCompleted ? "completed" : ""}`}
              key={index}
            >
              <p>{item.contentTitle}</p>
              <p>진행률{item.contentDuration}</p>
              <p>컨텐츠상태{item.contentStatus}</p>
              <StyledNavLink
                className="text"
                to={`/course/${courseId}/content/${item.contentId}`}
              >
                {isCompleted ? "서핑 완료" : "서핑하기"}
              </StyledNavLink>
              {exam && !exam.examIsActive && (
                <button disabled>시험 생성 중</button>
              )}
              {exam?.examIsActive && (
                <StyledNavLink to={`/exam/${exam.examId}`}>
                  시험 보러 가기
                </StyledNavLink>
              )}
              {exam?.examQuestions && (
                <button disabled>시험 문제 생성 중</button>
              )}
              <TaskWrapper>
                <span>{item.contentId}-1 과제</span>
                <StyledNavLink to="/testexam2">풀기</StyledNavLink>
              </TaskWrapper>
            </div>
          );
        })}
      </Container>
    </>
  );
}
