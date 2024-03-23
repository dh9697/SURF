import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthContext";
import {
  apiGetQnABoardsByCourse,
  apiGetQnARepliesByQnABoardId,
  apiCreateQnAReply,
} from "../../RestApi";
import { formatDateTime } from "../../Util/util";

const Container = styled.div`
  color: #454545;
  & .qnaCount {
    font-size: 14px;
    color: darkgray;
    padding-left: 0.5rem;
  }
  & .qnaReplyCount {
    padding: 1rem;
    & span {
      color: #3182f6;
    }
  }
`;

const SingleQnA = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 1rem 0;
`;
const QnAwrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;
const Textwrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;
const Text = styled.p`
  padding: 0 1rem;
  &.time {
    text-align: end;
    font-size: 12px;
  }
`;

const ReplyText = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
const ReplyButton = styled.button`
  width: 50px;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #3182f6;
  color: #f3f3f3;
  border-radius: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;

export function InstructorQnAManage() {
  const { user } = useContext(AuthContext);
  const courses = user.teachingCourses;
  const [qnas, setQnas] = useState([]);
  const [replyTexts, setReplyTexts] = useState({});
  console.log(replyTexts);

  useEffect(() => {
    const fetchQnas = async () => {
      const allQnas = [];
      for (const course of courses) {
        const response = await apiGetQnABoardsByCourse(course.courseId);
        const fetchedQnas = response.data.data;
        console.log(fetchedQnas);
        for (const qna of fetchedQnas) {
          qna.courseName = course.courseName;
          qna.courseId = course.courseId;
          const response = await apiGetQnARepliesByQnABoardId(qna.qnaId);
          if (response.data.data.length > 0) {
            qna.replyId = response.data.data[0].replyId;
            qna.replyText = response.data.data[0].replyText;
          }
        }
        allQnas.push(...fetchedQnas);
      }
      setQnas(allQnas);
      console.log(allQnas);
    };
    fetchQnas();
  }, [courses]);

  const handleReplyChange = (qnaId, text) => {
    setReplyTexts({ ...replyTexts, [qnaId]: text });
  };

  const handleReplySubmit = async (qnaId) => {
    await apiCreateQnAReply(replyTexts[qnaId], user.memberId, qnaId);
    window.location.reload();
  };

  const totalRepliesCount = qnas.reduce((acc, cur) => {
    if (cur.replyId) {
      return acc + 1;
    }
    return acc;
  }, 0);
  console.log(totalRepliesCount);

  return (
    <>
      <Container>
        <h2>
          Q&A 관리<span className="qnaCount">총 수강 문의 {qnas.length}</span>
        </h2>
        <h3 className="qnaReplyCount">
          <span>{qnas.length - totalRepliesCount}</span>
          개의 질문에 답변해주세요!
        </h3>
        {qnas.map((qna) => (
          <SingleQnA key={qna.qnaId}>
            <QnAwrap>
              <Textwrap>
                <h4>{qna.member.name}님의 질문</h4>
                <Text>{qna.questionText}</Text>
                <Text className="time">{formatDateTime(qna.createdAt)}</Text>
              </Textwrap>
              {qna.replyId ? (
                <>
                  <Textwrap>
                    <h4>답변 완료</h4>
                    <Textwrap>
                      <Text>{qna.replyText}</Text>
                    </Textwrap>
                  </Textwrap>
                </>
              ) : (
                <Textwrap>
                  <ReplyText
                    type="text"
                    value={replyTexts[qna.qnaId] || ""}
                    onChange={(e) =>
                      handleReplyChange(qna.qnaId, e.target.value)
                    }
                    placeholder="답변을 입력해 주세요"
                  />
                  <ReplyButton
                    onClick={() => handleReplySubmit(qna.qnaId, qna.courseId)}
                  >
                    등록
                  </ReplyButton>
                </Textwrap>
              )}
            </QnAwrap>
          </SingleQnA>
        ))}
      </Container>
    </>
  );
}
