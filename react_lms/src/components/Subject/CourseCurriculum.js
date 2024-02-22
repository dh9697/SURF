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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";

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

export function CourseCurriculem() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;
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
      })
      .catch((error) => {
        console.error("컨텐츠 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  // 유저의 완료된 컨텐츠 히스토리 조회
  useEffect(() => {
    if (memberId) {
      apiGetCompletedContentHistories(memberId)
        .then((response) => {
          setCompletedContents(response.data.data);
        })
        .catch((error) => {
          console.error("완료된 학습 이력 조회 오류: ", error);
        });
    }
  }, [memberId]);

  // 컨텐츠당 exam 조회
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await Promise.all(
          content.map((item) => apiGetExamByContent(item.contentId))
        );
        const examsTemp = response.map((res) => res.data.data);
        setExams(examsTemp);
      } catch (error) {
        console.error("시험 조회 오류: ", error);
      }
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
          const exam = exams
            .flat()
            .find((exam) => exam?.contentId === item.contentId);
          return (
            <div
              className={`content ${isCompleted ? "completed" : ""}`}
              key={index}
            >
              <p>
                {index + 1}. {item.contentTitle}
              </p>
              <p>진행률{item.contentDuration}</p>
              <p>컨텐츠상태{item.contentStatus}</p>
              <StyledNavLink
                className="text"
                to={`/course/${courseId}/content/${item.contentId}`}
              >
                {isCompleted ? "서핑 완료" : "서핑하기"}
              </StyledNavLink>
              {isCompleted && (
                <>
                  {exam && exam.examIsActive && (
                    <div>
                      <StyledNavLink
                        // to={`/course/${courseId}/content/${item.contentId}/exam/${exam.examId}`}
                        to={`/dashboard/${user.loginId}/exams/${item.contentId}`}
                      >
                        과제 풀기
                      </StyledNavLink>
                    </div>
                  )}
                  {exam && !exam.examIsActive && (
                    <div>
                      <button disabled>과제 생성 중</button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </Container>
    </>
  );
}
