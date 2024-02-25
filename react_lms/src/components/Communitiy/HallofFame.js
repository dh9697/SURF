import styled from 'styled-components';
import { TestWave } from '../TestWave';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledTestWave = styled(TestWave)``;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
`;

const HallOfFameContent = styled.div`
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
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
