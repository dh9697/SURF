import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { apiGetMyExamHistory, apiGetMyExamResult } from "../../RestApi";
import { AuthContext } from "../../../AuthContext";

const Container = styled.div``;

export function MyAnswerNote() {
  const { user } = useContext(AuthContext);
  const [examResults, setExamResults] = useState([]);
  const [examHistories, setExamHistories] = useState([]);
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

  return (
    <>
      <Container>어떻게 구성할지</Container>
    </>
  );
}
