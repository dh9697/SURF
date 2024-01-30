import styled from "styled-components";
import surf_logo from "./image/surf_logo.png";
import { useState } from "react";
import { MyAnswerNote } from "./MyAnswerNote";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: beige;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
`;

export function MyCourse() {
  const [isAnswerNote, setAnswerNote] = useState(false); // 배열 비구조화 할당 사용

  const toggleAnswerNote = () => {
    setAnswerNote(!isAnswerNote);
  };

  return (
    <>
      <Container>
        <h1>내 학습</h1>
        <p>강의명: </p>
        <ContentBox>
          <img src={surf_logo} alt="Sample" />
          <div>
            <p>21 강 / 53 강</p>
            <p>수료증: 미수료</p>
            <p>수강평 남기러 가기</p>
          </div>
          <button onClick={toggleAnswerNote}>과제 오답 보기</button>
        </ContentBox>
      </Container>
      <MyAnswerNote isVisible={isAnswerNote} />
    </>
  );
}
