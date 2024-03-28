import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';
import { useState, useEffect, useContext } from 'react';
import {
  apiGetCourse,
  apiGetQnABoardsByCourse,
  apiCreateQnABoard,
} from '../../RestApi';
import { formatDateTime } from '../../Util/util';

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: #454545;
  padding-bottom: 1rem;
`;
const InputBox = styled.form`
  display: flex;
  gap: 1rem;
  margin: 0.5rem;
  & input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  & button {
    border: none;
    background-color: #3182f6;
    color: #f3f3f3;
    padding: 5px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const QnAs = styled.table``;
const QnA = styled.tr`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  padding: 10px;
  & .date {
    text-align: end;
  }
`;

export function AfterInquiries() {
  const location = useLocation();
  const courseId = location.pathname.split('/')[2];
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [qnas, setQnas] = useState([]);
  const [questionText, setQuestionText] = useState('');

  // 해당 강의 조회
  useEffect(() => {
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error('코스 정보 불러오기 오류: ', error);
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
        setQuestionText('');
        apiGetQnABoardsByCourse(courseId).then((response) => {
          setQnas(response.data.data);
        });
      })
      .catch((error) => {
        console.error('질문 등록 실패: ', error);
      });
  };

  return (
    <>
      <Container>
        <Title>질의응답</Title>
        <InputBox onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="강의에 대한 질문을 남겨 주세요."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <button type="submit">등록</button>
        </InputBox>
        <QnAs>
          {qnas.map((qna, index) => (
            <QnA key={index}>
              <td>
                <strong>{qna.member.name}</strong>
              </td>
              <td>{qna.questionText}</td>
              <td className="date">{formatDateTime(qna.createdAt)}</td>
            </QnA>
          ))}
        </QnAs>
      </Container>
    </>
  );
}
