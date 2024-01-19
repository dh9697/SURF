import { useState } from "react";
import styled from "styled-components";
import { apiPostQuestionForExam } from "./RestApi";

const Container = styled.div`
  width: 100%;
`;
export function TestQuestion() {
  const [examId, setExamId] = useState("1");
  const [questionText, setQuestionText] = useState();
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("Token");
    console.log(token);

    apiPostQuestionForExam(examId, questionText, options, correctOptionIndex)
      .then((response) => {
        console.log("시험 문제 입력 성공: ", response.data);
      })
      .catch((err) => {
        console.error("시험 문제 입력 오류: ", err);
        // 에러 객체의 내용 출력
        if (err.response) {
          console.error("Response data:", err.response.data);
          console.error("Response status:", err.response.status);
          console.error("Response headers:", err.response.headers);
        } else if (err.request) {
          console.error("Request info:", err.request);
        } else {
          console.error("Error message:", err.message);
        }
      });
  };
  return (
    <>
      <Container>
        <h1>강사 시험 문제 페이지</h1>
        <form>
          <label>
            시험 선택:{" "}
            <select value={examId} onChange={(e) => setExamId(e.target.value)}>
              <option value="1">토익600</option>
              <option value="2">토익700</option>
              <option value="3">토익800</option>
            </select>
          </label>
          <br />
          <label>
            문제:{" "}
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
                onChange={(e) => handleOptionChange(index, e.target.value)}
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
                <option key={index} value={index}>
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
      </Container>
    </>
  );
}
