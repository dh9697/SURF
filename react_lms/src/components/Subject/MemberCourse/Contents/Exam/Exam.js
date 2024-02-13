import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  text-align: center;
`;
const QuestWrap = styled.div``;
const QuestTitle = styled.div`
  background-color: lightblue;
  font-size: 24px;
  font-weight: bold;
`;
const QuestBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightcoral;
`;
const OptionBox = styled.div``;
const SingleOption = styled.div`
  background-color: white; /* 투명으로 변경 예정*/
  border-radius: 8px; /* 둥근 네모 박스 */
  border: 2px solid gray;
  padding: 10px;
  margin: 4px;
  cursor: pointer;
  &:hover {
    border: 2px solid lightgreen;
  }
`;

export function Exam() {
  return (
    <>
      <Container>
        <QuestWrap>
          <QuestTitle>
            <div>questParagraph: 이게 뭔지 몰라서......</div>
            <div>questionText</div>
          </QuestTitle>
          <QuestBox>
            <OptionBox>
              <SingleOption>options</SingleOption>
              <SingleOption>options</SingleOption>
              <SingleOption>options</SingleOption>
              <SingleOption>options</SingleOption>
            </OptionBox>
          </QuestBox>
          <button>과제 제출</button>
        </QuestWrap>
      </Container>
    </>
  );
}
