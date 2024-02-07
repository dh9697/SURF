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
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
`;
const Content = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
`;
const Columntitle = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
`;

const Contents = styled.div``;
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
            <Contents>강의 1</Contents>
            <Contents>강의 2</Contents>
          </Content>
          <Content className="questionsnanswers">
            <Columntitle>학생 관리</Columntitle>
            <Contents>학생 1</Contents>
            <Contents>학생 2</Contents>
          </Content>
          <Content className="assignmentpart">
            <Columntitle>과제 리스트</Columntitle>
            <Contents>과제 1</Contents>
            <Contents>과제 2</Contents>
          </Content>
          <Content className="totalgrade">
            <Columntitle>QnA</Columntitle>
            <Contents>qna 1</Contents>
            <Contents>qna 2</Contents>
          </Content>
        </Body>
      </Container>
    </>
  );
}
//path={`/dashboard/instructor/${user.loginId}/studenets_manage`}
