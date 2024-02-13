import styled from "styled-components";
import { TestWave } from "../TestWave";

const Container = styled.div`
  position: relative;
  height: 50px; /* TestWave의 높이와 일치해야 합니다. */
`;

const StyledTestWave = styled(TestWave)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  gap: 100px;
`;

const HallOfFameContent = styled.div`
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column; /* 내부 요소들을 세로로 정렬하기 위해 추가 */
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const SubTitle = styled.div``;

export function HallofFame() {
  return (
    <Container>
      <StyledTestWave />
      <Wrapper>
        <HallOfFameContent>
          <Title>명예의 전당</Title>
          <SubTitle>최다 수강자</SubTitle>
        </HallOfFameContent>
        <HallOfFameContent>
          <Title>명예의 전당</Title>
          <SubTitle>최다 문의자</SubTitle>
        </HallOfFameContent>
        <HallOfFameContent>
          <Title>명예의 전당</Title>
          <SubTitle>열공생</SubTitle>
        </HallOfFameContent>
      </Wrapper>
    </Container>
  );
}
