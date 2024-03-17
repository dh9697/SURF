import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../AuthContext";
import {
  apiGetAllSubject,
  apiGetAllCourseReviews,
  apiGetAllQnABoards,
  apiGetQnARepliesByQnABoardId,
  apiGetAllSurfers,
} from "../../RestApi";
import { formatDateTime } from "../../Util/util";
import React from "react";
import { TotalSales } from "./Make/TotalSales";
import { LearningStatistics } from "./Make/LearningStatistics";

const QnAs = styled.table``;
const QnA = styled.tr``;
const Container = styled.div``;

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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

const TotalMem = styled.h3`
  font-weight: 400;
  color: black;
`;

export function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const [highestReview, setHighestReviews] = useState([]);
  const [qnaBoards, setQnaBoards] = useState([]);
  const [qnaReplies, setQnaReplies] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [courseReviews, setCourseReviews] = useState([]);
  const [surfers, setSurfers] = useState([]);
  const [surfersCount, setSurfersCount] = useState(0);
  const [surferUsers, setSurferUsers] = useState([]);
  const [surferMembers, setSurferMembers] = useState([]);
  const [surferInstructors, setSurferInstructors] = useState([]);

  useEffect(() => {
    fetchSurfers();
  }, []);

  const fetchSurfers = () => {
    apiGetAllSurfers().then((response) => {
      setSurfers(response.data.data);
      setSurfersCount(response.data.data.length);
      setSurferUsers([]);
      setSurferMembers([]);
      setSurferInstructors([]);
    });
  };

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
        const highestReview = sortedReviews.slice(0, 5);

        setHighestReviews(highestReview);
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
      <h2>Dashboard</h2>
      <Body>
        <Content>
          <TotalSales />
        </Content>
        <Content>
          <LearningStatistics />
        </Content>
        <Content>
          <NavLink
            to={`/dashboard/${user.loginId}/post_manage`}
            style={{ textDecoration: "none" }}
          >
            <Columntitle>QnA 관리</Columntitle>
            <p>qna가 많은 course</p>
            <p>qna member, user 비율</p>
            <p>답변률?</p>
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
                    {/* <td className="name">{qna.member.name}</td>
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
                    </td>*/}
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
          <QnAs>
            <colgroup>
              <col style={{ width: "130px" }} />
              <col style={{ width: "300px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "130px" }} />
            </colgroup>
            {highestReview
              .slice(0)
              .reverse()
              .map((review, index) => (
                <React.Fragment key={index}>
                  <QnA>
                    <td className="name">{review.member.name}</td>
                    <td className="reviewText">{review.comment}</td>
                    <td className="time">
                      {formatDateTime(review.reviewDate)}
                    </td>
                  </QnA>
                </React.Fragment>
              ))}
          </QnAs>
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
