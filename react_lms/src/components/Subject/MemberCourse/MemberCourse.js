import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {
  apiGetCourse,
  apiGetContentByCourse,
  apiGetQnABoardsByMember,
  apiGetQnARepliesByQnABoardId,
  apiGetMyExamHistory,
  apiGetMyContentHistory,
} from '../../RestApi';
import { AuthContext } from '../../../AuthContext';
import { ProgressBar, formatDateTime } from '../../Util/util';
import { Icon } from '@iconify/react';
import { CourseCurriculem } from '../CourseCurriculum';

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: #454545;
`;

const DashboardWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 2rem;
  & .question {
    grid-row: span 3;
  }
  & .contents {
    grid-column: span 2;
  }
  & .mylearning {
    grid-row: span 2;
  }
`;

const Section = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  &.announcement {
    & div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding-top: 1.5rem;
    }
  }
  &.mylearning {
    display: flex;
    flex-direction: column;
  }
  &.contents {
    padding: 0;
  }
`;

const StyledIcon = styled(Icon)`
  color: #3182f6;
  font-size: 1rem;
`;
const ProgressBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & .progressTitle {
    display: flex;
    gap: 1rem;
    & .highlight {
      color: #3182f6;
    }
  }
`;
const QnAs = styled.div`
  max-height: 336px;
  overflow: auto;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & .myQna {
    padding-right: 1rem;
  }
`;
const QnA = styled.div`
  border: 1px solid #f3f3f3;
  background-color: #f3f3f3;
  border-radius: 10px;
  padding: 0.5rem;
  &.reply {
    margin-top: 1rem;
    background-color: #ddd;
  }
  & .qnaInfo {
    padding-top: 1rem;
    font-size: 12px;
    text-align: end;
    & button {
      background-color: inherit;
      font-size: 12px;
      color: #3182f6;
      border: none;
      padding: 1px 2px;
      border-radius: 2px;
      cursor: pointer;
    }
  }
`;

export function MemberCourse() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;
  const location = useLocation();
  const courseId = location.pathname.split('/')[2];
  const [course, setCourse] = useState(null);
  const [contents, setContents] = useState([]);
  const [contentHistories, setContentHistories] = useState([]);
  const [examHistories, setExamHistories] = useState([]);
  const [qnas, setQnas] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState({});
  const [completedContentCount, setCompletedContentCount] = useState(0);
  const [completedExamCount, setCompletedExamCount] = useState(0);

  // 해당 코스, 컨텐츠 조회
  useEffect(() => {
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error('코스 정보 불러오기 오류: ', error);
      });

    apiGetContentByCourse(courseId)
      .then((response) => {
        setContents(response.data.data);
      })
      .catch((err) => {
        console.log('해당 코스 컨텐츠 조회 실패 ', err);
      });
  }, [courseId]);

  // 로그인 유저의 contentHistory 조회 및 해당 contnet의 examHistory 조회
  useEffect(() => {
    apiGetMyContentHistory()
      .then((response) => {
        const filteredContentHistories = response.data.data.filter(
          (contentHistory) =>
            contentHistory.content.course.courseId === Number(courseId)
        );
        setContentHistories(filteredContentHistories);
        console.log(filteredContentHistories);

        // completedContentCount 계산
        const totalCompletedContentCount = filteredContentHistories.filter(
          (contentHistory) => contentHistory.isCompleted
        ).length;
        setCompletedContentCount(totalCompletedContentCount);

        apiGetMyExamHistory(memberId)
          .then((response) => {
            const filteredExamHistories = response.data.data.filter(
              (examHistory) =>
                filteredContentHistories.some(
                  (contentHistory) =>
                    contentHistory.content.contentId ===
                    examHistory.exam.contentId
                )
            );
            setExamHistories(filteredExamHistories);
            console.log(filteredExamHistories);

            // completedExamCount 계산
            const totalCompletedExamCount = filteredExamHistories.filter(
              (examHistory) => examHistory.examCompletionStatus
            ).length;
            setCompletedExamCount(totalCompletedExamCount);
          })
          .catch((err) => {
            console.log('유저의 시험 이력 조회 실패 ', err);
          });
      })
      .catch((err) => {
        console.log('유저의 컨텐츠 이력 조회 실패 ', err);
      });
  }, [memberId, courseId, contents.length]);

  // 로그인 유저의 질문 댓글 조회
  useEffect(() => {
    apiGetQnABoardsByMember(memberId).then(async (response) => {
      const filteredQnas = response.data.data.filter(
        (qna) => qna.course.courseId === Number(courseId)
      );

      await Promise.all(
        filteredQnas.map((qna) => {
          return apiGetQnARepliesByQnABoardId(qna.qnaId).then((response) => {
            if (response.data.data.length > 0) {
              setReplies((prevReplies) => ({
                ...prevReplies,
                [qna.qnaId]: response.data.data,
              }));
            }
          });
        })
      );
      setQnas(filteredQnas);
    });
  }, [memberId, courseId]);

  function handleLoadReplies(qnaId) {
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
        }));
        setShowReplies((prevShowReplies) => ({
          ...prevShowReplies,
          [qnaId]: true,
        }));
      })
      .catch((error) => {
        console.error('답변 조회 실패: ', error);
      });
  }

  return (
    <>
      <Container>
        <DashboardWrap>
          <Section className="announcement">
            <h2 className="title">강의 공지</h2>
            <div>
              <StyledIcon icon={'mingcute:announcement-line'}></StyledIcon>
              {course && course.announcement && (
                <p className="announcementText">{course.announcement}</p>
              )}
            </div>
          </Section>
          <Section className="question">
            <h2 className="title">내가 최근에 한 질문</h2>
            <QnAs>
              {qnas.length > 0 ? (
                qnas
                  .slice()
                  .reverse()
                  .map((qna, index) => (
                    <div className="myQna" key={index}>
                      <QnA>
                        <p className="reviewText">{qna.questionText}</p>
                        <div className="qnaInfo">
                          <p>{formatDateTime(qna.createdAt)}</p>
                          {replies[qna.qnaId] &&
                          replies[qna.qnaId].length > 0 ? (
                            <button
                              onClick={() => handleLoadReplies(qna.qnaId)}
                            >
                              {showReplies[qna.qnaId]
                                ? '답변 닫기'
                                : '답변 보기'}
                            </button>
                          ) : (
                            <p>답변 기다리는 중</p>
                          )}
                        </div>
                      </QnA>
                      {showReplies[qna.qnaId] && (
                        <QnA className="reply">
                          <p>
                            {replies[qna.qnaId] &&
                              replies[qna.qnaId].map((reply) => (
                                <p key={reply.replyId}>{reply.replyText}</p>
                              ))}
                          </p>
                        </QnA>
                      )}
                    </div>
                  ))
              ) : (
                <p>해당 강좌에 질문한 내역이 없습니다.</p>
              )}
            </QnAs>
          </Section>
          <Section className="mylearning">
            <h2 className="title">{user.name}님 학습 상황</h2>
            <ProgressBox>
              <div className="progressTitle">
                <p>수강 진행률</p>
                <h2>
                  <span className="highlight">{completedContentCount}</span>/
                  {contents?.length}
                </h2>
              </div>
              <ProgressBar
                completed={(completedContentCount / contents?.length) * 100}
              />
            </ProgressBox>
            <ProgressBox>
              <div className="progressTitle">
                <p>과제 진행률</p>
                <h2>
                  <span className="highlight">{completedExamCount}</span>/
                  {contents?.length}
                </h2>
              </div>
              <ProgressBar
                completed={(completedExamCount / contents?.length) * 100}
              />
            </ProgressBox>
          </Section>
          <Section className="contents">
            <CourseCurriculem />
          </Section>
        </DashboardWrap>
      </Container>
    </>
  );
}
