import styled from "styled-components";

const Container = styled.div`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const AnswerBox = styled.div`
  width: 100%;
  background-color: gray;
  padding: 50px;
`;

export function MyAnswerNote({ isVisible }) {
  return (
    <>
      <Container isVisible={isVisible}>
        <h1>나의 오답 노트</h1>
        <AnswerBox>문제를 어떻게 표현할지 고민</AnswerBox>
      </Container>
    </>
  );
}
