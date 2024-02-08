import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import { useState, useEffect, useContext } from "react";
import {
  apiGetCourse,
  apiGetQnABoardsByCourse,
  apiCreateQnABoard,
} from "../../RestApi";
import { formatDateTime } from "../../Util/util";

const Container = styled.div``;
const InputBox = styled.form``;
const Input = styled.input``;
const QnAs = styled.table``;
const QnA = styled.tr``;

export function AfterInquiries() {
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [qnas, setQnas] = useState([]);
  const [questionText, setQuestionText] = useState("");

  // 해당 강의 조회
  useEffect(() => {
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("코스 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  // 해당 강의 질문 조회
  useEffect(() => {
    apiGetQnABoardsByCourse(courseId).then((response) => {
      setQnas(response.data.data);
    });
  }, [courseId]);

  // 질문 작성
  const handleSubmit = (e) => {
    e.preventDefault();
    apiCreateQnABoard({
      memberId: user.memberId,
      courseId: courseId,
      questionText,
    })
      .then(() => {
        setQuestionText("");
        apiGetQnABoardsByCourse(courseId).then((response) => {
          setQnas(response.data.data);
        });
      })
      .catch((error) => {
        console.error("질문 등록 실패: ", error);
      });
  };

  return (
    <>
      <Container>
        <p>수강 문의.</p>
        <InputBox onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="강의에 대한 질문을 남겨 주세요."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <button type="submit">등록</button>
        </InputBox>
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
            </QnA>
          ))}
        </QnAs>
      </Container>
    </>
  );
}
