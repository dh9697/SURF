import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../AuthContext";
import { Icon } from "@iconify/react";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #212529;
  margin-bottom: 1rem;
  & div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  & p {
    & .textHighlight {
      color: #00abff;
      font-weight: 900;
    }
  }
`;
const BellIcon = styled(Icon)`
  font-size: 1.5rem;
  color: #00abff;
`;
const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 16px;
`;
const Content = styled.div`
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  &.toDoList {
    grid-column: span 4;
    grid-row: span 4;
  }
  &.examSchedule {
    grid-column: span 6;
  }
  &.recentCourses {
    grid-column: span 3;
    grid-row: span 3;
  }
  &.incorrectAnswersNote {
    grid-column: span 3;
    grid-row: span 3;
  }
  &.certificates {
    grid-column: span 2;
  }
  &.coupons {
    grid-column: span 2;
  }
  &.courseReviews {
    grid-column: span 4;
  }
  &.questAverageScore {
    grid-column: span 6;
    grid-row: span 3;
  }
`;
export function Dashboard() {
  const { user } = useContext(AuthContext);
  const [daysSinceJoin, setDaysSinceJoin] = useState(0);

  useEffect(() => {
    const joinDate = new Date(user.joinDate);
    joinDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - joinDate.getTime());
    const daysSinceJoin = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysSinceJoin(daysSinceJoin);
  }, [user.joinDate]);

  return (
    <>
      <Container>
        <Header>
          <div>
            <h2>{user.name}님</h2>
            <BellIcon icon="akar-icons:bell" />
          </div>
          <p>
            열심히 공부하기
            <span className="textHighlight"> {daysSinceJoin} </span>일째
          </p>
        </Header>
        <Body>
          <Content className="toDoList">to-do-list 가능?</Content>
          <Content className="examSchedule">시험 일정</Content>
          <Content className="recentCourses">최근 강의 내역</Content>
          <Content className="incorrectAnswersNote">나의 오답 노트</Content>
          <Content className="certificates">보유중인 수료증</Content>
          <Content className="coupons">보유중인 쿠폰</Content>
          <Content className="questAverageScore">
            퀘스트 평균점수 혹은 그래프
          </Content>
          <Content className="courseReviews">작성한 수강평</Content>
        </Body>
      </Container>
    </>
  );
}
