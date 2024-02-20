import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { apiGetExamByContent, apiPostExamResult } from "../../RestApi";
import { AuthContext } from "../../../AuthContext";

const Container = styled.div`
   width: 100%;
`;

const ExamWrapper = styled.div`
   background-color: #3182f6;
`;

export function ContentExam() {
   const { user } = useContext(AuthContext);
   const memberId = user.memberId;
   const { contentId } = useParams();
   const [exams, setExams] = useState([]);
   const [submittedAnswers, setSubmittedAnswers] = useState({});
   const [userSubmittedAnswer, setUserSubmittedAnswer] = useState({});

   useEffect(() => {
      apiGetExamByContent(contentId)
         .then((response) => {
            setExams(response.data.data);
            console.log(response.data.data);
         })
         .catch((error) => {
            console.log("시험 불러 오기 오류: ", error);
         });
   }, [contentId]);

   const handleOptionChange = (questionId, optionIndex) => {
      setSubmittedAnswers({
         ...submittedAnswers,
         [questionId]: optionIndex,
      });
   };

   const submitAnswer = async (
      examId,
      memberId,
      questionId,
      submittedAnswer
   ) => {
      try {
         const response = await apiPostExamResult(
            examId,
            memberId,
            questionId,
            { submittedAnswer: submittedAnswer }
         );
         setUserSubmittedAnswer({
            ...userSubmittedAnswer,
            [questionId]: submittedAnswer,
         });
      } catch (error) {
         console.log("답안 제출 중 오류 발생: ", error);
      }
   };

   return (
      <>
         <Container>
            <ExamWrapper>
               {exams.length > 0 ? (
                  exams.map((exam, index) => (
                     <div key={exam.examId}>
                        <h2>Exam #{index + 1}</h2>
                        {exam.examQuestions.map((question, index) => (
                           <div key={question.examQuestionId}>
                              <p>문제: {question.questionText}</p>
                              <p>선택지:</p>
                              {question.options.map((option, index) => (
                                 <div key={index}>
                                    <input
                                       type="radio"
                                       name={`question-${question.examQuestionId}`}
                                       value={index + 1}
                                       onChange={() =>
                                          handleOptionChange(
                                             question.examQuestionId,
                                             index + 1
                                          )
                                       }
                                    />
                                    <label>{option}</label>
                                 </div>
                              ))}
                              <button
                                 onClick={() =>
                                    submitAnswer(
                                       exam.examId,
                                       memberId,
                                       question.examQuestionId,
                                       submittedAnswers[question.examQuestionId]
                                    )
                                 }
                              >
                                 제출
                              </button>
                              {userSubmittedAnswer[question.examQuestionId] && (
                                 <p>
                                    제출한 답안:
                                    {
                                       userSubmittedAnswer[
                                          question.examQuestionId
                                       ]
                                    }
                                 </p>
                              )}
                           </div>
                        ))}
                     </div>
                  ))
               ) : (
                  <p>시험 정보를 불러오는 중...</p>
               )}
            </ExamWrapper>
         </Container>
      </>
   );
}
