import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  apiGetCourse,
  apiGetContentByCourse,
  apiGetMyCourseHistroies,
  apiGetQnABoardsByMember,
  apiGetQnARepliesByQnABoardId,
} from "../../RestApi";
import { NavLink } from "react-router-dom";
import { CourseTitle } from "../CourseTitle";
import { AuthContext } from "../../../AuthContext";
import { formatDateTime, fo, formatTime } from "../../Util/util";
import { Icon } from "@iconify/react";
import { ProgressBar } from "react-bootstrap";
import { CourseCurriculem } from "../CourseCurriculum";

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: #454545;
`;

const DashboardWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2rem;
  & .question {
    grid-row: span 2;
  }
  & .contents {
    grid-column: span 2;
  }
`;

const Section = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  &.announcement {
    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding-top: 1rem;
    }
  }
  &.mylearning {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    div {
      display: flex;
      gap: 1rem;
      & .highlight {
        color: #3182f6;
      }
    }
  }
  &.contents {
    & .content {
      display: flex;
      padding: 1rem;
    }
    & .title {
      font-size: 18px;
      position: relative;
      & .contentInfo {
        position: absolute;
        bottom: 5px;
        left: 5rem;
        font-size: 12px;
        font-weight: 400;
      }
    }
    & .announcementText {
    }
  }
`;

const StyledIcon = styled(Icon)`
  color: #3182f6;
  font-size: 1rem;
`;
const DescriptionWrap = styled.div``;
const QnAs = styled.div``;
const QnA = styled.div`
  display: flex;
  gap: 1rem;
`;

export function MemberCourse() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;
  const location = useLocation();
  const courseId = location.pathname.split("/")[2]; // Extract courseId from the URL
  const [course, setCourse] = useState(null);
  const [courseHistoryDtos, setCourseHistoryDtos] = useState([]);
  const [qnas, setQnas] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState({});

  // 해당 코스 조회
  useEffect(() => {
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("코스 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  // 해당 코스 컨텐츠 조회

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

  // 로그인 유저의 질문 댓글 조회
  useEffect(() => {
    apiGetQnABoardsByMember(memberId).then(async (response) => {
      const fetchedQnas = response.data.data;
      await Promise.all(
        fetchedQnas.map((qna) => {
          return apiGetQnARepliesByQnABoardId(qna.qnaId).then((response) => {
            if (response.data.data.length > 0) {
              setReplies((prevReplies) => ({
                ...prevReplies,
                [qna.qnaId]: response.data.data,
              })); // 답변 데이터를 상태에 저장
            }
          });
        })
      );
      setQnas(fetchedQnas);
    });
  }, []);

  // QnAId에 해당하는 답변 조회
  function handleLoadReplies(qnaId) {
    apiGetQnARepliesByQnABoardId(qnaId)
      .then((response) => {
        setReplies((prevReplies) => ({
          ...prevReplies,
          [qnaId]: response.data.data,
        })); // 답변 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("답변 조회 실패: ", error);
      });
  }

  function handleLoadReplies(qnaId) {
    // 답변이 이미 불러와져 있고, 답변을 보여주는 상태라면 답변을 숨김
    if (showReplies[qnaId]) {
      setShowReplies((prevShowReplies) => ({
        ...prevShowReplies,
        [qnaId]: false,
      }));
      return;
    }

    // 답변 불러오기
    apiGetQnARepliesByQnABoardId(qnaId)
      .then((response) => {
        setReplies((prevReplies) => ({
          ...prevReplies,
          [qnaId]: response.data.data,
        })); // 답변 데이터를 상태에 저장
        setShowReplies((prevShowReplies) => ({
          ...prevShowReplies,
          [qnaId]: true,
        })); // 답변을 보여주는 상태를 true로 설정
      })
      .catch((error) => {
        console.error("답변 조회 실패: ", error);
      });
  }

  return (
    <>
      <Container>
        <DashboardWrap>
          <Section className="announcement">
            <h2 className="title">강의 공지</h2>
            <div>
              <StyledIcon icon={"mingcute:announcement-line"}></StyledIcon>
              {course && course.announcement && (
                <p className="announcementText">{course.announcement}</p>
              )}
            </div>
          </Section>
          <Section className="question">
            <h2 className="title">내가 최근에 한 질문</h2>
            <QnAs>
              {qnas
                .slice()
                .reverse()
                .map((qna, index) => (
                  <React.Fragment key={index}>
                    <QnA>
                      <p className="reviewText">{qna.questionText}</p>
                      <p className="time">{formatDateTime(qna.createdAt)}</p>
                      {replies[qna.qnaId] && replies[qna.qnaId].length > 0 ? (
                        <button onClick={() => handleLoadReplies(qna.qnaId)}>
                          {showReplies[qna.qnaId] ? "답변 닫기" : "답변 보기"}
                        </button>
                      ) : (
                        <p>답변 기다리는 중</p>
                      )}
                    </QnA>
                    {showReplies[qna.qnaId] && (
                      <QnA>
                        {replies[qna.qnaId] &&
                          replies[qna.qnaId].map((reply) => (
                            <p key={reply.replyId}>{reply.replyText}</p>
                          ))}
                      </QnA>
                    )}
                  </React.Fragment>
                ))}
            </QnAs>
          </Section>
          {courseHistoryDtos
            .filter((courseHistoryDto) => {
              return (
                courseHistoryDto.courseHistory.course.courseId ===
                  Number(courseId) &&
                courseHistoryDto.courseHistory.member.memberId === user.memberId
              );
            })
            .map((courseHistoryDto, index) => (
              <Section key={index} className="mylearning">
                <h2 className="title">{user.name}님 학습 상황</h2>
                <div>
                  <p>수업진행률</p>
                  <h2>
                    <span className="highlight">
                      {courseHistoryDto.completedContents}
                    </span>{" "}
                    / {courseHistoryDto.totalContents}
                  </h2>
                </div>
                <div
                  style={{
                    backgroundColor: "#f3f3f3",
                    height: "20px",
                    width: "100%",
                    borderRadius: "5px",
                  }}
                >
                  <ProgressBar
                    now={courseHistoryDto.completedContents}
                    max={courseHistoryDto.totalContents}
                    variant="success"
                    style={{ height: "100%", borderRadius: "5px" }}
                  />
                </div>
              </Section>
            ))}
          <Section className="contents">
            <CourseCurriculem />
          </Section>
        </DashboardWrap>
      </Container>
    </>
  );
}
