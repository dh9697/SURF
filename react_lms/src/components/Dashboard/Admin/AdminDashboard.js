import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../AuthContext";
import {
  apiGetAllSubject,
  apiGetAllCourseReviews,
  apiGetAllQnABoards,
  apiGetQnARepliesByQnABoardId,
} from "../../RestApi";
import { formatDateTime } from "../../Util/util";
import React from "react";

const QnAs = styled.table``;
const QnA = styled.tr``;
const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #212529;
  margin-bottom: 30px;
  font-size: 40px;
  font-weight: bold;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 30px;
`;

const Content = styled.div`
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const Columntitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #3182f6;
`;

const Columncontent = styled.div`
  font-size: 1.2rem;
`;

export function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const [highestReview, setHighestReviews] = useState(null);
  const [qnaBoards, setQnaBoards] = useState([]);
  const [qnaReplies, setQnaReplies] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [courseReviews, setCourseReviews] = useState([]);

  //모든 과목 가지고 오기
  useEffect(() => {
    apiGetAllSubject()
      .then((response) => {
        setSubjects(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 모든 수강평 가져오기
        const reviewsResponse = await apiGetAllCourseReviews();
        const courseReviewsData = reviewsResponse.data.data;

        // reviewid가 가장 높은 수강평들 찾기
        const sortedReviews = courseReviewsData.sort(
          (a, b) => b.reviewid - a.reviewid
        );
        const highestReviews = sortedReviews.slice(0, 5);

        setHighestReviews(highestReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    apiGetAllQnABoards()
      .then((response) => {
        setQnaBoards(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching QnA boards:", error);
      });
  }, []);

  useEffect(() => {
    if (qnaBoards.length > 0) {
      qnaBoards.forEach((qnaBoard) => {
        apiGetQnARepliesByQnABoardId(qnaBoard.qnaId)
          .then((response) => {
            setQnaReplies((prevReplies) => ({
              ...prevReplies,
              [qnaBoard.qnaId]: response.data.data,
            }));
          })
          .catch((error) => {
            console.error(
              `Error fetching replies for QnA board ${qnaBoard.qnaId}:`,
              error
            );
          });
      });
    }
  }, [qnaBoards]);

  const handleLoadReplies = (qnaId) => {
    setShowReplies((prev) => ({ ...prev, [qnaId]: !prev[qnaId] }));
  };

  return (
    <Container>
      <Header>Dashboard</Header>
      <Body>
        <Content>
          <NavLink
            to={`/dashboard/${user.loginId}/course_manage`}
            style={{ textDecoration: "none" }}
          >
            <Columntitle>강의 관리</Columntitle>
          </NavLink>
          <ul>
            {subjects.map((subject) => (
              <li key={subject.id}>{subject.subjectName}</li>
            ))}
          </ul>
        </Content>
        <Content>
          <NavLink
            to={`/dashboard/${user.loginId}/user_manage`}
            style={{ textDecoration: "none" }}
          >
            <Columntitle>회원 관리</Columntitle>
          </NavLink>
        </Content>
        <Content>
          <NavLink
            to={`/dashboard/${user.loginId}/post_manage`}
            style={{ textDecoration: "none" }}
          >
            <Columntitle>QnA 관리</Columntitle>
          </NavLink>
          <QnAs>
            <colgroup>
              <col style={{ width: "130px" }} />
              <col style={{ width: "300px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "130px" }} />
            </colgroup>
            {qnaBoards
              .slice(0)
              .reverse()
              .map((qna, index) => (
                <React.Fragment key={index}>
                  <QnA>
                    <td className="name">{qna.member.name}</td>
                    <td className="reviewText">{qna.questionText}</td>
                    <td className="time">
                      {formatDateTime(qna.createdAt)}
                      {qnaReplies[qna.qnaId] &&
                      qnaReplies[qna.qnaId].length > 0 ? (
                        <button onClick={() => handleLoadReplies(qna.qnaId)}>
                          {showReplies[qna.qnaId] ? "답변 닫기" : "답변 보기"}
                        </button>
                      ) : (
                        <span>답변 기다리는 중</span>
                      )}
                    </td>
                  </QnA>
                  {showReplies[qna.qnaId] && (
                    <tr>
                      {qnaReplies[qna.qnaId] &&
                        qnaReplies[qna.qnaId].map((reply) => (
                          <td key={reply.replyId}>{reply.replyText}</td>
                        ))}
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </QnAs>
        </Content>
        <Content>
          <NavLink
            to={`/dashboard/${user.loginId}/post_manage`}
            style={{ textDecoration: "none" }}
          >
            <Columntitle>수강평 관리</Columntitle>
          </NavLink>
        </Content>
        <Content>
          <NavLink
            to={`/dashboard/${user.loginId}/leveltest_manage`}
            style={{ textDecoration: "none" }}
          >
            <Columntitle>레벨테스트 관리</Columntitle>
          </NavLink>
        </Content>
      </Body>
    </Container>
  );
}
