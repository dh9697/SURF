import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { apiGetMyExamHistory, apiGetMyExamResult } from "../../RestApi";
import { AuthContext } from "../../../AuthContext";

const Container = styled.div``;

export function MyAnswerNote() {
  const { user } = useContext(AuthContext);
  const [examResults, setExamResults] = useState([]);
  const [examHistories, setExamHistories] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

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

  return (
    <>
      <Container>
        {filteredResults.map((result) => (
          <div key={result.examReultId}>
            {result.correct ? <p>Content ID: {result.exam.contentId}</p> : null}
          </div>
        ))}
      </Container>
    </>
  );
}
