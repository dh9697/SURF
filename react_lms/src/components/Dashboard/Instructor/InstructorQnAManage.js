import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthContext";
import {
  apiGetQnABoardsByCourse,
  apiGetQnARepliesByQnABoardId,
  apiCreateQnAReply,
} from "../../RestApi";

const Container = styled.div`
  width: 100%; //inner? 그걸로 해결하면 좋을 듯
`;
const NumBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

const NumWrap = styled.div`
  display: flex;
  &.before {
    background-color: lightgoldenrodyellow;
  }
  &.after {
    background-color: lightseagreen;
  }
`;

const NumTitle = styled.div``;
const CountNum = styled.div``;
const QnABox = styled.div`
  background-color: lightblue;
`;
const SingleQnA = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid darkgray;
`;
const QnAwrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Textwrap = styled.div`
  background-color: lightsteelblue;
`;
const QnATitle = styled.div``;
const QnAText = styled.div`
  margin-left: 20px; //들여쓰기 느낌
`;
const AnswerStatus = styled.div`
  background-color: blueviolet;
`;
const ReplyBox = styled.div`
  display: flex;
`;
const ReplyText = styled.input.attrs({ type: "text" })`
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const ReplyButton = styled.button``;

export function InstructorQnAManage() {
  const { user } = useContext(AuthContext);
  const courses = user.teachingCourses;
  const [qnas, setQnas] = useState([]);
  const [replyTexts, setReplyTexts] = useState({});

  useEffect(() => {
    const fetchQnas = async () => {
      const allQnas = [];
      for (const course of courses) {
        const response = await apiGetQnABoardsByCourse(course.courseId);
        const fetchedQnas = response.data.data;
        for (const qna of fetchedQnas) {
          qna.courseName = course.courseName; // 강의명 추가
          qna.courseId = course.courseId; // 강의 ID 추가
          const response = await apiGetQnARepliesByQnABoardId(qna.qnaId);
          if (response.data.data.length > 0) {
            qna.replyId = response.data.data[0].replyId;
          }
        }
        allQnas.push(...fetchedQnas);
      }
      setQnas(allQnas);
    };
    fetchQnas();
  }, [courses]);

  const handleReplyChange = (qnaId, text) => {
    setReplyTexts({ ...replyTexts, [qnaId]: text });
  };

  const handleReplySubmit = async (qnaId) => {
    console.log(`Submitting reply for qnaId ${qnaId}`); // qnaId 출력
    console.log(`Member ID: ${user.memberId}`); // memberId 출력
    await apiCreateQnAReply(
      replyTexts[qnaId], // replyTexts[qnaId]를 그대로 보냅니다.
      user.memberId,
      qnaId
    );
    // 갱신된 QnA 목록을 다시 불러옵니다.
    window.location.reload();
  };

  return (
    <>
      <Container>
        <p>Q&A 관리</p>
        <NumBox>
          <NumWrap className="after">
            <NumTitle>수강 문의</NumTitle>
            <CountNum>{qnas.length}</CountNum>
          </NumWrap>
        </NumBox>
        <QnABox>
          <p>QnA 남겨요</p>
          {qnas.map((qna) => (
            <SingleQnA key={qna.qnaId}>
              <QnAwrap>
                <Textwrap>
                  <QnATitle>강의명: {qna.courseName}</QnATitle>
                  <QnAText>{qna.questionText}</QnAText>
                </Textwrap>
                {qna.replyId ? (
                  <AnswerStatus>답변 완료</AnswerStatus>
                ) : (
                  <ReplyBox>
                    <ReplyText
                      value={replyTexts[qna.qnaId] || ""}
                      onChange={(e) =>
                        handleReplyChange(qna.qnaId, e.target.value)
                      }
                      placeholder="답변을 입력해 주세요"
                    />
                    <ReplyButton
                      onClick={() => handleReplySubmit(qna.qnaId, qna.courseId)}
                    >
                      {" "}
                      등록
                    </ReplyButton>
                  </ReplyBox>
                )}
              </QnAwrap>
            </SingleQnA>
          ))}
        </QnABox>
      </Container>
    </>
  );
}
