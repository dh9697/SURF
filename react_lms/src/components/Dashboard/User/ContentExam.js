import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  apiGetContentByContent,
  apiGetContentByCourse,
  apiGetExamByContent,
  apiGetMyExamHistory,
  apiGetMyExamResult,
  apiPostExamResult,
} from "../../RestApi";
import { AuthContext } from "../../../AuthContext";
import { Icon } from "@iconify/react";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const ExamWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
  & .question {
    padding: 1rem 0;
    & p {
      padding: 1rem 2rem;
    }
    & .check {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
  & .option {
    padding: 0 2rem;
    display: flex;
    gap: 5px;
    & input {
      background-color: red;
    }
  }
  & .submitButton {
    margin: 2rem 2rem;
    padding: 5px 10px;
    background-color: transparent;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export function ContentExam() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;
  const { contentId } = useParams();
  const [contents, setContents] = useState([]);
  const [exams, setExams] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [examHistories, setExamHistories] = useState([]);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [userSubmittedAnswer, setUserSubmittedAnswer] = useState({});

  // contentId에 따라 content 조회
  useEffect(() => {
    apiGetContentByContent(contentId)
      .then((response) => {
        setContents(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log("컨텐츠 불러 오기 오류: ", err);
      });
  }, [contentId]);
  // contentId에 따라 exam 조회
  useEffect(() => {
    apiGetExamByContent(contentId)
      .then((response) => {
        setExams(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("시험 불러 오기 오류: ", error);
      });
  }, [contentId]);

  // 로그인 유저와 contentId에 따라 examResult 조회
  useEffect(() => {
    apiGetMyExamResult(memberId)
      .then((response) => {
        const filteredExamResultByContent = response.data.data.filter(
          (examResult) => examResult.exam.contentId === Number(contentId)
        );
        setExamResults(filteredExamResultByContent);
        console.log(filteredExamResultByContent);
      })
      .catch((err) => {
        console.log("시험 결과 조회 실패 ", err);
      });
  }, [memberId, contentId]);

  // 유저의 examHistory 조회
  useEffect(() => {
    apiGetMyExamHistory(memberId)
      .then((response) => {
        const filtererdExamHistoryByContent = response.data.data.filter(
          (examHistory) => examHistory.exam.contentId === Number(contentId)
        );
        setExamHistories(filtererdExamHistoryByContent);
        console.log(filtererdExamHistoryByContent);
      })
      .catch((err) => {
        console.log("시험 이력 조회 실패 ", err);
      });
  }, [memberId]);

  const handleOptionChange = (questionId, optionIndex) => {
    setSubmittedAnswers({
      ...submittedAnswers,
      [questionId]: optionIndex,
    });
  };

  const submitAnswer = async (
    examId,
    memberId,
    questionId,
    submittedAnswer
  ) => {
    try {
      const response = await apiPostExamResult(examId, memberId, questionId, {
        submittedAnswer: submittedAnswer,
      });
      setUserSubmittedAnswer({
        ...userSubmittedAnswer,
        [questionId]: submittedAnswer,
      });
    } catch (error) {
      console.log("답안 제출 중 오류 발생: ", error);
    }
  };

  return (
    <>
      <Container>
        <ExamWrapper>
          {exams.length > 0 ? (
            exams.map((exam, index) => (
              <div key={exam.examId}>
                {contents.map((content) => (
                  <div key={content.contentId}>
                    <h2>[ {content.course.courseName} ]</h2>
                    <h3 style={{ marginTop: "1rem" }}>
                      {content.contentId}강 {content.contentTitle}
                    </h3>
                  </div>
                ))}
                {exam.examQuestions.map((question, index) => (
                  <div key={question.examQuestionId}>
                    <div className="question">
                      <h3>0{index + 1}.</h3>
                      <p>{question.questionText}</p>
                    </div>
                    {question.options.map((option, index) => (
                      <div className="option" key={index}>
                        <input
                          type="radio"
                          name={`question-${question.examQuestionId}`}
                          value={index + 1}
                          onChange={() =>
                            handleOptionChange(
                              question.examQuestionId,
                              index + 1
                            )
                          }
                        />
                        <label>{option}</label>
                      </div>
                    ))}
                    <button
                      className="submitButton"
                      onClick={() => {
                        const alreadyAnswered = examResults.some(
                          (examResult) =>
                            examResult.examQuestionId ===
                            question.examQuestionId
                        );

                        if (alreadyAnswered) {
                          alert("해당 시험 문제를 풀었습니다.");
                        } else {
                          if (
                            submittedAnswers[question.examQuestionId] == null
                          ) {
                            alert("정답을 체크해주세요.");
                          } else {
                            submitAnswer(
                              exam.examId,
                              memberId,
                              question.examQuestionId,
                              submittedAnswers[question.examQuestionId]
                            );
                          }
                        }
                      }}
                    >
                      제출
                    </button>
                    {userSubmittedAnswer[question.examQuestionId] && (
                      <p style={{ margin: "0 2rem" }}>
                        {userSubmittedAnswer[question.examQuestionId]}번 답안을
                        제출하였습니다.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            // 수정 필요
            <p>시험 정보를 불러오는 중...</p>
          )}
        </ExamWrapper>
        <ExamWrapper>
          <h2>오답 확인</h2>
          {examHistories.map((examHistory) =>
            examHistory.exam.contentId === Number(contentId) &&
            examHistory.examCompletionStatus === true ? (
              examResults
                .sort((a, b) => a.examQuestionId - b.examQuestionId)
                .map((examResult, index) => (
                  <div className="question" key={examResult.examResultId}>
                    <div className="check">
                      <h3>0{index + 1}. </h3>
                      <Icon
                        icon={"streamline:check-solid"}
                        style={{ color: examResult.correct ? "green" : "red" }}
                      ></Icon>
                    </div>
                    <p>제출 답안: {examResult.submittedAnswer}</p>
                    {!examResult.correct && (
                      <p>정답: {examResult.correctOptionIndex}</p>
                    )}
                    <p>문제 해설: {examResult.wrongAnsExpl}</p>
                  </div>
                ))
            ) : (
              <p>시험을 모두 풀어주세요. </p>
            )
          )}
        </ExamWrapper>
      </Container>
    </>
  );
}
