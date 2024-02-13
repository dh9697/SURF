import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: 36px;
  margin-bottom: 20px;
`;

const Score = styled.p`
  font-size: 36px;
  margin-bottom: 30px;
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 18px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CourseInfo = styled.div`
  margin-top: 20px;
`;

const CourseTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const CourseDescription = styled.div`
  font-size: 20px;
  margin-top: 20px;
`;

const CourseLink = styled.a`
  display: block;
  margin-top: 20px;
  font-size: 20px;
  text-decoration: none;
  color: #007bff;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

export function LevelTestResult() {
  return (
    <Container>
      <p>LEVEL TEST RESULTS</p>
      <Title>레벨 테스트 결과</Title>
      <Score>12.5점</Score>
      <Message>
        노력이 많이 필요한 수준입니다.
        <br />
        Surf와 함께 영어 실력을
        <br />
        향상해 보세요.
      </Message>
      <Button>Review your answer</Button>
      <CourseInfo>
        <CourseTitle>추천 레벨 수업: Lv. 1</CourseTitle>
        <CourseDescription>강의 추천 내용</CourseDescription>
        <CourseLink href="#">강의 시청하러 가기</CourseLink>
      </CourseInfo>
    </Container>
  );
}
