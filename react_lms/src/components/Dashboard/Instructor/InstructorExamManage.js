import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  apiDeleteQuestionsForExam,
  apiGetQuestionsForExam,
  apiPostQuestionsForExam,
  apiPutQuestionsForExam,
} from "../../RestApi";
import { InstructorExam } from "./InstructorExam";

const Container = styled.div`
  width: 100%;
`;
export function InstructorExamManage() {
  const [examId, setExamId] = useState("1");
  const [questionText, setQuestionText] = useState("");
  const [editQuestionText, setEditQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [editOptions, setEditOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(1);
  const [examQuestionId, setExamQuestionId] = useState(null);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

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
        console.error(
          "에러 상세 정보: ",
          error.response || error.message || error
        );
      });
  };

  // 문제 입력
  const handleSubmit = (e) => {
    e.preventDefault();

    apiPostQuestionsForExam(examId, questionText, options, correctOptionIndex)
      .then((response) => {
        console.log("시험 문제 입력 성공: ", response);
        setFormSubmitted(true);
        setQuestionText([""]);
        setOptions(["", "", "", ""]);
        setCorrectOptionIndex(1);
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
    questionText,
    options,
    correctOptionIndex,
    index
  ) => {
    setEditMode(true);
    setExamQuestionId(examQuestionId);
    setEditQuestionText(questionText);
    if (typeof options === "string") {
      const splittedOptions = options.split(",").map((option) => option.trim());
      setEditOptions(splittedOptions);
    }
    console.log(editOptions);
    setCorrectOptionIndex(correctOptionIndex);
    setEditingIndex(index);
  };

  // 문제 수정 취소
  const cancelEditMode = () => {
    setEditMode(false);
    setExamQuestionId(null);
    setEditQuestionText("");
    setEditOptions(editOptions);
    setCorrectOptionIndex(1);
  };

  // 문제 수정
  const handleEdit = () => {
    apiPutQuestionsForExam(
      examQuestionId,
      examId,
      editQuestionText,
      editOptions,
      correctOptionIndex
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
            시험 선택:
            <select value={examId} onChange={(e) => setExamId(e.target.value)}>
              <option value="1">examId1</option>
              <option value="2">examId2</option>
              <option value="3">examId3</option>
            </select>
          </label>
          <br />
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
              <button
                onClick={() =>
                  enterEditMode(
                    examQuestion.examQuestionId,
                    examQuestion.questionText,
                    examQuestion.options,
                    examQuestion.correctOptionIndex,
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
                  <button onClick={handleEdit}>수정 완료</button>
                  <button onClick={cancelEditMode}>취소</button>
                </div>
              )}
            </li>
          ))}
        <InstructorExam />
      </Container>
    </>
  );
}
