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
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 16px;
`;
const Content = styled.div`
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  &.leveltestperson {
    grid-column: span 2;
    grid-row: span 2;
  }
  &.applicantcourse {
    grid-column: span 2;
    grid-row: span 2;
  }
  &.newmember {
    grid-column: span 2;
    grid-row: span 2;
  }
  &.visitor {
    grid-column: span 2;
    grid-row: span 2;
  }
  &.joinresult {
    grid-column: span 5;
    grid-row: span 3;
  }
  &.resultview {
    grid-column: span 3;
    grid-row: span 3;
  }
  &.directchat {
    grid-column: span 5;
    grid-row: span 3;
  }
  &.clearaccount {
    grid-column: span 3;
    grid-row: span 3;
  }
`;
const Columntitle = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
`;
const Columncontent = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
`;

export function AdminDashboard() {
  return (
    <>
      <Container>
        <Header>Dashboard</Header>
        <Body>
          <Content className="leveltestperson">
            <Columncontent>163 명</Columncontent>
            <Columntitle>레벨 테스트 신청자</Columntitle>
          </Content>
          <Content className="applicantcourse">
            <Columncontent>163 명</Columncontent>
            <Columntitle>수강 신청자</Columntitle>
          </Content>
          <Content className="newmember">
            <Columncontent>163 명</Columncontent>
            <Columntitle>신규 가입자</Columntitle>
          </Content>
          <Content className="visitor">
            <Columncontent>163 명</Columncontent>
            <Columntitle>방문자</Columntitle>
          </Content>
          <Content className="joinresult">가입 실적</Content>
          <Content className="resultview">실적별 보기</Content>
          <Content className="directchat">Direct Chat</Content>
          <Content className="clearaccount">처리할 결제</Content>
        </Body>
      </Container>
    </>
  );
}
