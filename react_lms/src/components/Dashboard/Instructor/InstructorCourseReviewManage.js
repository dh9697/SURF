import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;
const ReviewBox = styled.div`
  padding: 30px;
`;
const SingleReview = styled.div`
  background-color: lightblue;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  gap: 10px; /* 자식 요소 간의 상하 간격 설정 */
`;
const Author = styled.div``;
const ReviewText = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
`;

export function InstructorCourseReviewManage() {
  return (
    <>
      <Container>
        <p>코스 리뷰</p>
        <select>
          <option value="0">강의 선택</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <ReviewBox>
          <SingleReview>
            <Author>리뷰 쓴 사람</Author>
            <ReviewText>리뷰 불러오기</ReviewText>
          </SingleReview>
        </ReviewBox>
      </Container>
    </>
  );
}
