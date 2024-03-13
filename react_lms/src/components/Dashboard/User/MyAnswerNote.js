import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  apiGetExamByContent,
  apiGetMyExamHistory,
  apiGetMyExamResult,
} from '../../RestApi';
import { AuthContext } from '../../../AuthContext';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
`;
const Exams = styled.div`
  text-align: start;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &.emptyResults {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }
  & .index {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  & .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export function MyAnswerNote(props) {
  const { user } = useContext(AuthContext);
  const [examResults, setExamResults] = useState([]);
  const [examHistories, setExamHistories] = useState([]);
  const [recentedResults, setRecentedResults] = useState([]);
  const [exam, setExam] = useState([]);

  // 유저의 시험 결과 조회
  useEffect(() => {
    apiGetMyExamResult(user.memberId)
      .then((response) => {
        setExamResults(response.data.data);
      })
      .catch((err) => {
        console.log('유저의 시험 결과 조회 실패: ', err);
      });
  }, [user.memberId]);

  // 유저의 시험 이력 조회
  useEffect(() => {
    apiGetMyExamHistory(user.memberId)
      .then((response) => {
        setExamHistories(response.data.data);
      })
      .catch((err) => {
        console.log('유저의 시험 이력 조회 실패: ', err);
      });
  }, [user.memberId]);

  // 최신 이력의 시험 결과 조회
  useEffect(() => {
    if (examResults.length > 0 && examHistories.length > 0) {
      let latestHistory = null;
      for (let i = examHistories.length - 1; i >= 0; i--) {
        if (examHistories[i].examCompletionStatus) {
          latestHistory = examHistories[i];
          break;
        }
      }

      if (latestHistory !== null) {
        const matchingResults = examResults.filter(
          (result) => result.exam.contentId === latestHistory.exam.contentId
        );
        setRecentedResults(matchingResults);
        console.log(matchingResults);
      }
    }
  }, [examResults, examHistories]);

  // contentId에 따라 exam 조회
  useEffect(() => {
    if (recentedResults.length > 0) {
      const contentId = recentedResults[0].exam.contentId;
      // 부모 컴포넌트에 contentId 전달
      props.onContentIdUpdate(contentId);

      apiGetExamByContent(contentId)
        .then((response) => {
          setExam(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log('시험 불러 오기 오류: ', error);
        });
    }
  }, [recentedResults]);

  return (
    <>
      <Container>
        {exam.length > 0 ? (
          exam[0].examQuestions.map((question, index) => {
            const recentResult = recentedResults.find(
              (rr) => rr.examQuestionId === question.examQuestionId
            );
            const isCorrect = recentResult ? recentResult.correct : false;
            const correctOptionIndex = question.options.findIndex(
              (option, idx) => idx === recentResult?.correctOptionIndex - 1
            );
            const submittedAnswerIndex = recentResult
              ? recentResult.submittedAnswer - 1
              : -1;
            return (
              <Exams key={question.examQuestionId}>
                <div className="index">
                  <p>0{index + 1}.</p>
                  <Icon
                    icon={'streamline:check-solid'}
                    color={isCorrect ? 'green' : 'red'}
                  ></Icon>
                </div>
                <p>{question.questionText}</p>
                <div className="options">
                  {question.options.map((option, idx) => (
                    <p
                      key={idx}
                      style={{
                        color:
                          idx === correctOptionIndex
                            ? 'green'
                            : idx === submittedAnswerIndex
                            ? 'red'
                            : 'inherit',
                      }}
                    >
                      {`(${String.fromCharCode(65 + idx)})${option}`}
                    </p>
                  ))}
                </div>
              </Exams>
            );
          })
        ) : (
          <Exams className="emptyResults">
            <p>시험 기록이 없습니다.</p>
          </Exams>
        )}
      </Container>
    </>
  );
}
