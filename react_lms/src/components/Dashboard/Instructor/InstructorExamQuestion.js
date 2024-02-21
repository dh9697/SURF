import { useEffect, useState } from "react";
import {
  apiDeleteQuestionsForExam,
  apiGetQuestionsForExam,
  apiPostQuestionsForExam,
  apiPutQuestionsForExam,
} from "../../RestApi";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
`;

export function InstructorExamQuestion() {
  const { examId } = useParams();
  const [questParagraph, setQuestParagraph] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(1);
  const [wrongAnsExpl, setWrongAnsExpl] = useState("");
  const [editQuestParagraph, setEidtQuestParagraph] = useState("");
  const [editQuestionText, setEditQuestionText] = useState("");
  const [editOptions, setEditOptions] = useState(["", "", "", ""]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editExpl, setEditExpl] = useState("");
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
        console.error("시험 문제 불러오기 오류: ", error);
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
        console.log("시험 문제 입력 성공: ", response);
        setFormSubmitted(true);
        setQuestParagraph([""]);
        setQuestionText([""]);
        setOptions(["", "", "", ""]);
        setCorrectOptionIndex(1);
        setWrongAnsExpl("");
        loadExamQuestions();
      })
      .catch((err) => {
        console.error("시험 문제 입력 오류: ", err);
        setFormSubmitted(false);
      });
  };

  // 문제 삭제
  const handleDelete = (examQuestionId) => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (isConfirmed) {
      apiDeleteQuestionsForExam(examQuestionId)
        .then((response) => {
          console.log("시험 문제 삭제 성공: ", response);
          loadExamQuestions();
        })
        .catch((err) => {
          console.log("시험 문제 삭제 오류: ", err);
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
    if (typeof options === "string") {
      const splittedOptions = options.split(",").map((option) => option.trim());
      setEditOptions(splittedOptions);
    }
    setCorrectOptionIndex(correctOptionIndex);
    setWrongAnsExpl(wrongAnsExpl);
    setEditingIndex(index);
  };

  // 문제 수정 취소
  const cancelEditMode = () => {
    setEditMode(false);
    setExamQuestionId(null);
    setQuestParagraph("");
    setEditQuestionText("");
    setEditOptions(editOptions);
    setCorrectOptionIndex(1);
    setEditExpl("");
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
      wrongAnsExpl
    )
      .then((response) => {
        console.log("시험 문제 수정 성공: ", response);
        loadExamQuestions();
        cancelEditMode();
      })
      .catch((err) => {
        console.error("시험 문제 수정 오류: ", err);
      });
  };

  return (
    <>
      <Container>
        <h1>강사 시험 문제 페이지</h1>
        <form>
          <label>
            본문:
            <input
              type="text"
              value={questParagraph}
              onChange={(e) => setQuestParagraph(e.target.value)}
            />
          </label>
          <label>
            문제:
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </label>
          <br />
          <label>
            선택지:
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
              />
            ))}
          </label>
          <br />
          <label>
            정답 선택:
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
            문제 해설:
            <input
              type="text"
              value={wrongAnsExpl}
              onChange={(e) => setWrongAnsExpl(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" onClick={handleSubmit}>
            문제 추가
          </button>
        </form>
        {isFormSubmitted && (
          <p style={{ color: "green" }}>시험 문제를 저장하였습니다.</p>
        )}
        <h2>등록된 시험 문제 목록</h2>
        {examQuestions &&
          examQuestions.map((examQuestion, index) => (
            <li key={examQuestion.examQuestionId}>
              <strong>본문: </strong>
              {examQuestion.questParagraph}
              <br />
              <strong>{`문제 ${index + 1}`}</strong>
              {examQuestion.questionText}
              <br />
              <strong>선택지:</strong>{" "}
              {Array.isArray(examQuestion.options)
                ? examQuestion.options.join(", ")
                : examQuestion.options}
              <br />
              <strong>답안:</strong> {examQuestion.correctOptionIndex}
              <br />
              <strong>문제 해설</strong> {examQuestion.wrongAnsExpl}
              <br />
              <button
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
              </button>
              <button onClick={() => handleDelete(examQuestion.examQuestionId)}>
                삭제
              </button>
              {editMode && editingIndex === index && (
                <div>
                  <h2>문제 수정</h2>
                  <label>
                    본문:
                    <input
                      type="text"
                      value={editQuestParagraph}
                      onChange={(e) => setEidtQuestParagraph(e.target.value)}
                    />
                  </label>
                  <label>
                    문제:
                    <input
                      type="text"
                      value={editQuestionText}
                      onChange={(e) => setEditQuestionText(e.target.value)}
                    />
                  </label>
                  <br />
                  {editOptions.map((editOption, index) => (
                    <div key={index}>
                      <label>
                        선택지 {index + 1}:
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

                  <br />
                  <label>
                    정답 선택:
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
                  <br />
                  <label>
                    문제 해설
                    <input
                      type="text"
                      value={editExpl}
                      onChange={(e) => setEditExpl(e.target.value)}
                    />
                  </label>
                  <br />
                  <button onClick={handleEdit}>수정 완료</button>
                  <button onClick={cancelEditMode}>취소</button>
                </div>
              )}
            </li>
          ))}
      </Container>
    </>
  );
}
