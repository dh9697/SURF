import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  margin-top: 100px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 30px;
`;

const StartBtn = styled(NavLink)`
  display: inline-block;
  padding: 12px 24px;
  font-size: 20px;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SubTitle = styled.h2`
  font-size: 28px;
  margin-top: 100px;
  margin-bottom: 20px;
`;

const SubDescription = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
`;

const FindCourseBtn = styled.button`
  padding: 12px 24px;
  font-size: 20px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

export function LevelTestMain() {
  return (
    <Container>
      <Title>LEVEL TEST</Title>
      <Description>
        SURF만의 기술로 정확한 당신의 영어 레벨을
        <br /> 읽기, 듣기, 쓰기의 세 가지 영역으로 진단해 드립니다.
      </Description>
      <StartBtn to={"/level_test_start"}>무료 레벨 테스트 시작</StartBtn>
      <SubTitle>나에게 맞는 진짜 영어를 찾아보세요</SubTitle>
      <SubDescription>
        내 영어 실력은 물론, 나에게 맞는 상품과 맞춤 강의를 제공합니다.
      </SubDescription>
      <FindCourseBtn>나에게 맞는 강의 찾기</FindCourseBtn>
    </Container>
  );
}
