import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const Instructor = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
`;
const InstructorInfo = styled.div`
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 15px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  &.profile1 {
    grid-column: span 1;
  }
  &.info1 {
    grid-column: span 2;
  }
  &.profile2 {
    grid-column: span 1;
  }
  &.info2 {
    grid-column: span 2;
  }
`;

export function AboutInstructor() {
  return (
    <>
      <Container>
        <h1>강사님 소개</h1>
        <Instructor>
          <InstructorInfo className="profile1">사진</InstructorInfo>
          <InstructorInfo className="info1">설명입니다</InstructorInfo>
        </Instructor>
        <Instructor>
          <InstructorInfo className="info2">설명입니다</InstructorInfo>
          <InstructorInfo className="profile2">사진</InstructorInfo>
        </Instructor>
      </Container>
    </>
  );
}
