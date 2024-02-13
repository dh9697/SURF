import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;
const QuestTitle = styled.div`
  background-color: lightblue;
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
  margin-bottom: 20px;
`;
const ResultBox = styled.div``;
const IncorrectBox = styled.div`
  background-color: white;
  border-radius: 8px; /* 둥근 네모 박스 */
  border: 2px solid red;
  padding: 10px;
  margin: 4px;
`;
const CorrectBox = styled.div`
  background-color: white;
  border-radius: 8px; /* 둥근 네모 박스 */
  border: 2px solid #3182f6;
  padding: 10px;
  margin: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
`;

export function ExamAnswer() {
  return (
    <>
      <Container>
        <QuestTitle>
          <div>문제</div>
        </QuestTitle>
        <ResultBox>
          {/* 틀렸으면 IncorrectBox, correctBox를, 맞히면 correctbox를 보여 줄 수 있으려나 */}
          <IncorrectBox>
            <div> correctOptionIndex (your answer)</div>
            <div>과제 wrongAnsExpl</div>
          </IncorrectBox>
          <CorrectBox>
            <div> correctOptionIndex</div>
            <div>과제 wrongAnsExpl</div>
          </CorrectBox>
        </ResultBox>
        <Button>확인</Button>
      </Container>
    </>
  );
}
