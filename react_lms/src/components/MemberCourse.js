import styled from "styled-components";
import { CourseTitle } from "./CourseTitle";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const DashboardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
`;

//얘네 왜 이러는 거예요.....?
const Section = styled.div`
  border: 2px solid gray;
  padding: 20px;
  &.notice {
    grid-column: span 5;
    grid-row: span 1;
  }
  &.question {
    grid-column: span 5;
    grid-row: span 1;
  }
  &.mylearning {
    grid-column: span 3;
    grid-row: span 2;
  }
  &.contents {
    grid-column: span 8;
    grid-row: span 3;
  }
`;

const DescriptionWrap = styled.div``;

export function MemberCourse() {
  return (
    <>
      <Container>
        <DashboardWrap>
          <Section className="notice">
            <p>강의 공지</p>
          </Section>
          <Section className="question">
            <p>내가 최근에 한 질문</p>
          </Section>
          <Section className="mylearning">
            <p>내 학습 같은 것</p>
          </Section>
          <Section className="contents">
            <p>커리큘럼</p>
          </Section>
        </DashboardWrap>
        <DescriptionWrap></DescriptionWrap>
      </Container>
    </>
  );
}
