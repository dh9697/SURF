import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #212529;
  margin-bottom: 1rem;
  font-size: 40px;
  font-weight: bolder;
`;
const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 16px;
`;
const Content = styled.div`
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  &.coursetable {
    grid-column: span 7;
    grid-row: span 2;
  }
  &.questionsnanswers {
    grid-column: span 4;
    grid-row: span 3;
  }
  &.coursenotice {
    grid-column: span 3;
    grid-row: span 3;
  }
  &.assignmentpart {
    grid-column: span 3;
    grid-row: span 3;
  }
  &.totalgrade {
    grid-column: span 4;
    grid-row: span 3;
  }
`;
const Columntitle = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
`;
// const Columncontent = styled.div`
//   font-size: 1.2rem;
//   font-weight: 900;
// `;

export function InstructorDashboard() {
  return (
    <>
      <Container>
        <Header>Dashboard</Header>
        <Body>
          <Content className="coursetable">
            <Columntitle>과정명</Columntitle>
          </Content>
          <Content className="questionsnanswers">
            <Columntitle>Q&A 문의 내역</Columntitle>
          </Content>
          <Content className="coursenotice">
            <Columntitle>강의 공지사항</Columntitle>
          </Content>
          <Content className="assignmentpart">
            <Columntitle>과제 참여율</Columntitle>
          </Content>
          <Content className="totalgrade">
            <Columntitle>종합 점수</Columntitle>
          </Content>
        </Body>
      </Container>
    </>
  );
}
