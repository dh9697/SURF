import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  apiGetExamByContent,
  apiGetMyExamHistory,
  apiGetMyExamResult,
} from "../../RestApi";
import { AuthContext } from "../../../AuthContext";

const Container = styled.div``;

export function MyAnswerNote() {
  const { user } = useContext(AuthContext);
  const [examResults, setExamResults] = useState([]);
  const [examHistories, setExamHistories] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [exam, setExam] = useState([]);

  // 유저의 시험 결과 조회
  useEffect(() => {
    apiGetMyExamResult(user.memberId)
      .then((response) => {
        setExamResults(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log("유저의 시험 결과 조회 실패: ", err);
      });
  }, [user.memberId]);

  // 유저의 시험 이력 조회
  useEffect(() => {
    apiGetMyExamHistory(user.memberId)
      .then((response) => {
        setExamHistories(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log("유저의 시험 이력 조회 실패: ", err);
      });
  }, [user.memberId]);

  // 최신 이력의 시험 결과 조회
  useEffect(() => {
    if (examResults.length > 0 && examHistories.length > 0) {
      const latestHistory = examHistories[examHistories.length - 1];

      const matchingResults = examResults.filter(
        (result) => result.exam.contentId === latestHistory.exam.contentId
      );
      setFilteredResults(matchingResults);
      console.log(matchingResults);
    }
  }, [examResults, examHistories]);

  // contentId에 따라 exam 조회
  useEffect(() => {
    if (filteredResults.length > 0) {
      const contentId = filteredResults[0].exam.contentId;
      apiGetExamByContent(contentId)
        .then((response) => {
          setExam(response.data.data);
          console.log(response.data.data);
          const incorrectExamResults = filteredResults.filter(
            (result) => !result.correct
          );

          console.log(incorrectExamResults);
        })
        .catch((error) => {
          console.log("시험 불러 오기 오류: ", error);
        });
    }
  }, [filteredResults]);

  return (
    <>
      <Container>
        {exam &&
        exam[0] &&
        exam[0].examQuestions &&
        exam[0].examQuestions.length > 0 ? (
          exam[0].examQuestions.map((question, index) => (
            <div key={question.examQuestionId}>
              <p style={{ fontSize: "12px", textAlign: "start" }}>
                0{index + 1}. {question.questionText}
              </p>
              <p>
                {question.options[0]},{question.options[1]},
                {question.options[2]},{question.options[3]}
              </p>
            </div>
          ))
        ) : (
          <p>시험 기록이 없습니다.</p>
        )}
      </Container>
    </>
  );
}
