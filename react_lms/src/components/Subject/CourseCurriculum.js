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
  const [exam, setExam] = useState([]);
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
