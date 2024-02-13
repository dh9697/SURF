import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* 화면 높이의 80%만큼 컨테이너를 차지하도록 설정 */
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 요소들을 배치 */
  gap: 30px; /* 박스들 사이의 간격 */
`;

const Box = styled.div`
  width: 200px;
  height: 300px; /* 박스의 높이를 크게 설정 */
  border: 2px solid #333;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

export function AboutProcess() {
  return (
    <>
      <h1>강의 과정 소개</h1>
      <Container>
        <BoxWrapper>
          <Box>퀘스트 구역</Box>
          <Box>완강/수료</Box>
        </BoxWrapper>
      </Container>
    </>
  );
}
