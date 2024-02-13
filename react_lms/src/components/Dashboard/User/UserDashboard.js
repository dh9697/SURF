import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../AuthContext";
import { Icon } from "@iconify/react";
import { TodoList } from "./TodoList";
import {
  apiGetMyCourseHistroies,
  apiGetQnABoardsByMember,
  apiGetAllContentHistories,
} from "../../RestApi";

const Container = styled.div`
  padding: 0 20px;
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
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    color: #6b7280;
  }

  &.toDoList {
    grid-column: span 4;
    grid-row: span 4;
  }
  &.recentCourses {
    grid-column: span 3;
    grid-row: span 2;
  }

  &.incorrectAnswersNote {
    grid-column: span 3;
    grid-row: span 2;
  }

  &.certificates {
    grid-column: span 3;
    grid-row: span 2;
  }

  &.courseReviews {
    grid-column: span 3;
    grid-row: span 2;
  }
`;

export function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [daysSinceJoin, setDaysSinceJoin] = useState(0);
  const [courseHistoryDtos, setCourseHistoryDtos] = useState([]);
  const [qnas, setQnas] = useState([]);

  useEffect(() => {
    const joinDate = new Date(user.joinDate);
    joinDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - joinDate.getTime());
    const daysSinceJoin = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysSinceJoin(daysSinceJoin);
  }, [user.joinDate]);

  // 로그인 유저의 courseHistory 조회
  useEffect(() => {
    if (user) {
      apiGetMyCourseHistroies(user.memberId)
        .then((response) => {
          setCourseHistoryDtos(response.data.data);
        })
        .catch((error) => {
          console.error("코스 히스토리 불러오기 오류: ", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      apiGetQnABoardsByMember(user.memberId)
        .then((response) => {
          setQnas(response.data.data);
        })
        .catch((error) => {
          console.error("Q&A 게시판 데이터 불러오기 오류: ", error);
        });
    }
  }, [user]);

  return (
    <>
      <Container>
        <Header>
          <div>
            <h2>{user.name} 님</h2>
            <BellIcon icon="akar-icons:bell" />
          </div>
          <p>
            열심히 공부하기
            <span className="textHighlight"> {daysSinceJoin} </span>일째
          </p>
        </Header>
        <Body>
          <Content className="toDoList">
            <TodoList />
          </Content>
          <Content className="recentCourses">
            <div>최근 강의 내역</div>
            {courseHistoryDtos.length === 0 ? (
              <p>최근에 등록된 강의가 없습니다.</p>
            ) : (
              courseHistoryDtos.map((course, index) => (
                <div key={index}>
                  <p>강의명: {course.courseHistory.course.courseName}</p>
                  <p>
                    수료상태:{" "}
                    {course.courseHistory.contentStatus ? "수료완료" : "미수료"}
                  </p>
                  <p>
                    진행상황: {course.completedContents}/{course.totalContents}
                  </p>
                </div>
              ))
            )}
          </Content>
          <Content className="incorrectAnswersNote">나의 오답 노트</Content>
          <Content className="certificates">보유중인 수료증</Content>
          <Content className="courseReviews">
            <div>작성한 QnA</div>
            {qnas.length === 0 ? (
              <p>작성한 QnA가 없습니다.</p>
            ) : (
              qnas.map((qna, index) => (
                <div key={index}>
                  <p>{qna.questionText}</p>
                </div>
              ))
            )}
          </Content>
        </Body>
      </Container>
    </>
  );
}
