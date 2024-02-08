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
import { formatDateTime } from "../../Util/util";

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
  &.announcement {
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
const QnAs = styled.table``;
const QnA = styled.tr``;

export function MemberCourse() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;
  const location = useLocation();
  const courseId = location.pathname.split("/")[2]; // Extract courseId from the URL
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [courseHistoryDtos, setCourseHistoryDtos] = useState([]);
  const [qnas, setQnas] = useState([]);
  const [replies, setReplies] = useState([]);

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
  useEffect(() => {
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContent(response.data.data);
      })
      .catch((error) => {
        console.error("컨텐츠 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

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
    apiGetQnABoardsByMember(memberId).then((response) => {
      setQnas(response.data.data);
    });
  }, []);

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

  return (
    <>
      <Container>
        <DashboardWrap>
          <Section className="announcement">
            <p>강의 공지</p>
            {course && course.announcement && <p>{course.announcement}</p>}
          </Section>
          <Section className="question">
            <p>내가 최근에 한 질문</p>
            <QnAs>
              <colgroup>
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 300 + "px" }} />
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 130 + "px" }} />
              </colgroup>
              {qnas.map((qna, index) => (
                <QnA key={index}>
                  <td className="name">{qna.member.name}</td>
                  <td className="reviewText">{qna.questionText}</td>
                  <td className="time">{formatDateTime(qna.createdAt)}</td>
                  <td>
                    <button onClick={() => handleLoadReplies(qna.qnaId)}>
                      답변 보기
                    </button>
                  </td>
                  {replies[qna.qnaId] && (
                    <td>
                      {replies[qna.qnaId].map((reply) => (
                        <div key={reply.replyId}>{reply.replyText}</div>
                      ))}
                    </td>
                  )}
                </QnA>
              ))}
            </QnAs>
          </Section>
          {courseHistoryDtos.map((courseHistoryDto, index) => (
            <Section key={index} className="mylearning">
              <h3>{user.name}님 학습 상황</h3>
              <h2>
                {courseHistoryDto.completedContents} /{" "}
                {courseHistoryDto.totalContents}
              </h2>
            </Section>
          ))}
          <Section className="contents">
            <p>커리큘럼</p>
            {content.map((item, index) => (
              <div key={index}>
                <NavLink to={`/content/${item.contentId}`}>
                  contentDuration추가 수강 듣기
                </NavLink>
                {/* restApi 추가 후 index 진행 */}
                <div>
                  contentId - examID - examquestionId "과제 index+1"
                  <NavLink to={`/content/${item.contentId}`}>풀기</NavLink>
                </div>
              </div>
            ))}
          </Section>
        </DashboardWrap>
      </Container>
    </>
  );
}
