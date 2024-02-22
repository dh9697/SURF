import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  apiGetExamByContent,
  apiGetMyExamHistory,
  apiGetMyExamResult,
  apiPostExamResult,
} from "../../RestApi";
import { AuthContext } from "../../../AuthContext";

const Container = styled.div`
  width: 100%;
`;

const ExamWrapper = styled.div`
  background-color: #3182f6;
`;

export function ContentExam() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;
  const { contentId } = useParams();
  const [exams, setExams] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [examHistories, setExamHistories] = useState([]);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [userSubmittedAnswer, setUserSubmittedAnswer] = useState({});

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
      {/* examHistory가 존재하지 않을 때와 
      examHistory가 존재하지만 examHistory.examCompletionStatus가 false일 때 
      문제를 풀 수 있게 하고 만약 examHistory가 존재하고 examHistory.examCompletionStatus가
      true일 때 문제 결과를 보여지게  */}
      <Container>
        <h1>안 푼 문제 모아보기?</h1>
        <ExamWrapper>
          {exams.length > 0 ? (
            exams.map((exam, index) => (
              <div key={exam.examId}>
                <h2>Exam #{index + 1}</h2>
                {exam.examQuestions.map((question, index) => (
                  <div key={question.examQuestionId}>
                    <p>문제: {question.questionText}</p>
                    <p>선택지:</p>
                    {question.options.map((option, index) => (
                      <div key={index}>
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
                      onClick={() =>
                        submitAnswer(
                          exam.examId,
                          memberId,
                          question.examQuestionId,
                          submittedAnswers[question.examQuestionId]
                        )
                      }
                    >
                      제출
                    </button>
                    {userSubmittedAnswer[question.examQuestionId] && (
                      <p>
                        제출한 답안:
                        {userSubmittedAnswer[question.examQuestionId]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>시험 정보를 불러오는 중...</p>
          )}
        </ExamWrapper>
      </Container>
    </>
  );
}
