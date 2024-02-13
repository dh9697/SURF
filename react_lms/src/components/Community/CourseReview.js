import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
`;

const Title = styled.h2`
  margin-top: 70px;
  color: black;
  margin-bottom: 30px;
  text-align: center;
  font-size: 28px;
`;

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Review = styled.div`
  flex: 1;
  width: 700px;
  padding: 20px;
  border: 2px solid #3182f6;
  border-radius: 15px;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
  color: #3182f6;
`;

const Text = styled.div`
  margin-bottom: 10px;
`;

const CourseName = styled.div`
  font-style: italic;
  color: #666;
`;

export function CourseReview() {
  return (
    <Container>
      <ReviewWrapper>
        <Title>" 수강생들의 100% 솔직한 찐 후기 "</Title>
        <Review>
          <Name>윤*희</Name>
          <Text>
            선생님이 재미있어서 강의 들을 때 지루하지 않아요. 추천합니당.
          </Text>
          <CourseName>토익</CourseName>
        </Review>
        <Review>
          <Name>카*란</Name>
          <Text>외국인인 제가 듣기에도 좋은 강의네요. 추천.</Text>
          <CourseName>토익</CourseName>
        </Review>
        <Review>
          <Name>류*홍</Name>
          <Text>
            강의 재미있네요. ^^ 다들 한 번씩 들어 보시길 추천합니다. ^^7
          </Text>
          <CourseName>토익</CourseName>
        </Review>
      </ReviewWrapper>
    </Container>
  );
}
