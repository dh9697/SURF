import { useEffect, useState } from 'react';
import {
  apiDeleteQuestionsForExam,
  apiGetQuestionsForExam,
  apiPostQuestionsForExam,
  apiPutQuestionsForExam,
} from '../../RestApi';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  color: #454545;
`;

const QuestionForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
  & label {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    font-size: 14px;
    font-weight: 900;
    & select {
      width: 200px;
      padding: 0.5rem;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: #fff;
      cursor: pointer;
    }
    & input {
      border: 1px solid #ddd;
      padding: 0.5rem;
      border-radius: 5px;
    }
    & .optionWrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, auto));
      gap: 1rem;
    }
  }
`;

const Button = styled.button`
  border: none;
  color: #f3f3f3;
  background-color: #3182f6;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  &.submitButton {
    margin: 2rem auto;
    padding: 10px 5rem;
  }
`;

const Question = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
  & .lists {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1rem;
    & .question {
      padding: 1rem 0;
      & p {
        padding: 1rem 2rem;
      }
    }
    & .option {
      padding: 0 2rem;
      display: flex;
      gap: 5px;
    }
    & .buttonBox {
      display: flex;
      justify-content: center;
      gap: 3rem;
      padding: 1rem;
    }
  }
`;

const Alert = styled.h3`
  color: #3182f6;
  text-align: center;
  margin-bottom: 5rem;
`;

export function InstructorExamQuestion() {
  const { examId } = useParams();
  const [questParagraph, setQuestParagraph] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(1);
  const [wrongAnsExpl, setWrongAnsExpl] = useState('');
  const [editQuestParagraph, setEidtQuestParagraph] = useState('');
  const [editQuestionText, setEditQuestionText] = useState('');
  const [editOptions, setEditOptions] = useState(['', '', '', '']);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editExpl, setEditExpl] = useState('');
  const [examQuestionId, setExamQuestionId] = useState(null);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // examId로 문제 불러오기
  useEffect(() => {
    loadExamQuestions();
    cancelEditMode();
  }, [examId]);

  const loadExamQuestions = () => {
    apiGetQuestionsForExam(examId)
      .then((response) => {
        setExamQuestions(response.data.data);
      })
      .catch((error) => {
        console.error('시험 문제 불러오기 오류: ', error);
      });
  };

  // 문제 입력
  const handleSubmit = (e) => {
    e.preventDefault();

    apiPostQuestionsForExam(
      examId,
      questParagraph,
      questionText,
      options,
      correctOptionIndex,
      wrongAnsExpl
    )
      .then((response) => {
        console.log('시험 문제 입력 성공: ', response);
        setFormSubmitted(true);
        setQuestParagraph(['']);
        setQuestionText(['']);
        setOptions(['', '', '', '']);
        setCorrectOptionIndex(1);
        setWrongAnsExpl('');
        loadExamQuestions();
      })
      .catch((err) => {
        console.error('시험 문제 입력 오류: ', err);
        setFormSubmitted(false);
      });
  };

  // 문제 삭제
  const handleDelete = (examQuestionId) => {
    const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
    if (isConfirmed) {
      apiDeleteQuestionsForExam(examQuestionId)
        .then((response) => {
          console.log('시험 문제 삭제 성공: ', response);
          loadExamQuestions();
        })
        .catch((err) => {
          console.log('시험 문제 삭제 오류: ', err);
        });
    }
  };

  // 문제 수정 모드로 전환
  const enterEditMode = (
    examQuestionId,
    questParagraph,
    questionText,
    options,
    correctOptionIndex,
    wrongAnsExpl,
    index
  ) => {
    setEditMode(true);
    setExamQuestionId(examQuestionId);
    setEidtQuestParagraph(questParagraph);
    setEditQuestionText(questionText);
    if (typeof options === 'string') {
      const splittedOptions = options.split(',').map((option) => option.trim());
      setEditOptions(splittedOptions);
    } else if (Array.isArray(options)) {
      setEditOptions(options);
    }
    setCorrectOptionIndex(correctOptionIndex);
    setEditExpl(wrongAnsExpl);
    console.log('wrongAnsExpl:', wrongAnsExpl);
    setEditingIndex(index);
  };

  // 문제 수정 취소
  const cancelEditMode = () => {
    setEditMode(false);
    setExamQuestionId(null);
    setQuestParagraph('');
    setEditQuestionText('');
    setEditOptions([...editOptions]);
    setCorrectOptionIndex(1);
    setEditExpl('');
  };

  // 문제 수정
  const handleEdit = () => {
    apiPutQuestionsForExam(
      examQuestionId,
      examId,
      editQuestParagraph,
      editQuestionText,
      editOptions,
      correctOptionIndex,
      editExpl
    )
      .then((response) => {
        console.log('시험 문제 수정 성공: ', response);
        loadExamQuestions();
        cancelEditMode();
      })
      .catch((err) => {
        console.error('시험 문제 수정 오류: ', err);
      });
  };

  return (
    <>
      <Container>
        <h2>시험 문제 관리</h2>
        <QuestionForm>
          <label>
            본문
            <input
              type="text"
              value={questParagraph}
              onChange={(e) => setQuestParagraph(e.target.value)}
              placeholder="본문은 필수 입력 사항이 아닙니다."
            />
          </label>
          <label>
            문제
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="필수 입력 사항입니다. 255자 내외로 입력해주세요."
            />
          </label>
          <label>
            선택지
            <div className="optionWrapper">
              {options.map((option, index) => (
                <input
                  className="optionInput"
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  placeholder="필수 입력 사항입니다."
                />
              ))}
            </div>
          </label>
          <label>
            정답 선택
            <select
              value={correctOptionIndex}
              onChange={(e) => setCorrectOptionIndex(Number(e.target.value))}
            >
              {options.map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </label>
          <label>
            문제 해설
            <input
              type="text"
              value={wrongAnsExpl}
              onChange={(e) => setWrongAnsExpl(e.target.value)}
              placeholder=" 필수 입력 사항입니다. 500자 내외로 입력해주세요."
            />
          </label>
          <Button className="submitButton" type="submit" onClick={handleSubmit}>
            문제 추가
          </Button>
        </QuestionForm>
        {isFormSubmitted && <Alert>시험 문제를 저장하였습니다.</Alert>}
        <h2>등록된 시험 문제 목록</h2>
        <div>
          {examQuestions &&
            examQuestions.map((examQuestion, index) => (
              <Question key={examQuestion.examQuestionId}>
                <div className="lists">
                  <div className="question">
                    <h3>0{index + 1}.</h3>
                    <p>{examQuestion.questParagraph}</p>
                    <p>{examQuestion.questionText}</p>
                  </div>
                  {examQuestion.options.map((option, index) => (
                    <div className="option" key={index}>
                      <input type="radio" />
                      <label>{option}</label>
                    </div>
                  ))}
                  <div className="question">
                    <h4>답안</h4>
                    <p>{examQuestion.correctOptionIndex}</p>
                  </div>
                  <div className="question">
                    <h4>문제해설</h4>
                    <p>{examQuestion.wrongAnsExpl}</p>
                  </div>
                  <div className="buttonBox">
                    <Button
                      onClick={() =>
                        enterEditMode(
                          examQuestion.examQuestionId,
                          examQuestion.questionParagraph,
                          examQuestion.questionText,
                          examQuestion.options,
                          examQuestion.correctOptionIndex,
                          examQuestion.wrongAnsExpl,
                          index
                        )
                      }
                    >
                      수정
                    </Button>
                    <Button
                      onClick={() => handleDelete(examQuestion.examQuestionId)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
                {editMode && editingIndex === index && (
                  <div className="lists">
                    <h3>문제 수정</h3>
                    <QuestionForm>
                      <label>
                        본문
                        <input
                          type="text"
                          value={editQuestParagraph}
                          onChange={(e) =>
                            setEidtQuestParagraph(e.target.value)
                          }
                        />
                      </label>
                      <label>
                        문제
                        <input
                          type="text"
                          value={editQuestionText}
                          onChange={(e) => setEditQuestionText(e.target.value)}
                        />
                      </label>
                      {editOptions.map((editOption, index) => (
                        <div key={index}>
                          <label>
                            선택지 {index + 1}
                            <input
                              value={editOption}
                              onChange={(e) => {
                                const newEditOptions = [...editOptions];
                                newEditOptions[index] = e.target.value;
                                setEditOptions(newEditOptions);
                              }}
                            />
                          </label>
                        </div>
                      ))}
                      <label>
                        정답 선택
                        <select
                          value={correctOptionIndex}
                          onChange={(e) =>
                            setCorrectOptionIndex(Number(e.target.value))
                          }
                        >
                          {options.map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        문제 해설
                        <input
                          type="text"
                          value={editExpl}
                          onChange={(e) => {
                            setEditExpl(e.target.value);
                            console.log('editExpl 변경:', e.target.value);
                          }}
                        />
                      </label>
                      <div className="buttonBox">
                        <Button onClick={handleEdit}>수정 완료</Button>
                        <Button onClick={cancelEditMode}>취소</Button>
                      </div>
                    </QuestionForm>
                  </div>
                )}
              </Question>
            ))}
        </div>
      </Container>
    </>
  );
}
