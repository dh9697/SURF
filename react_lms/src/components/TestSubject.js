import styled from "styled-components";
import React, { useState } from "react";
import {
  apiGetAllSubject,
  apiGetSubject,
  apiPostSubject,
  apiPutSubject,
  apiDeleteSubject,
} from "./RestApi";

const Container = styled.div``;
const SubjectForm = styled.div`
  background-color: lightgrey;
`;

export function TestSubject() {
  console.log("route 성공");
  const [subjectList, setSubjectList] = useState([]);
  const [newSubject, setNewSubject] = useState("");

  const loadSubjects = () => {
    apiGetAllSubject()
      .then((response) => {
        console.log("시험 문제 입력 성공: ", response);
        setSubjectList(response.data.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  //Subject 추가
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (newSubject.trim() !== "") {
      const subjectData = { name: newSubject };

      apiPostSubject(subjectData)
        .then((response) => {
          console.log("subject 추가 성공: ", response);
          setSubjectList([...subjectList, subjectData]); //subject 목록 업데이트
          setNewSubject(""); //입력 필드 초기화
        })
        .catch((error) => {
          console.error("과목 추가 오류: ", error);
        });
    }
  };

  return (
    <>
      <Container>
        <h1>Subject 관리</h1>
        <SubjectForm>
          <addform>
            <label>게시판 이름:</label>
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
            />
            <button onClick={handleAddSubject}>추가</button>
          </addform>
          <submitform>
            <p>subject 목록</p>
            {subjectList.length > 0 ? (
              <ul>
                {subjectList.map((subject) => (
                  <li key={subject.subjectId}>{subject.subjectName}</li>
                ))}
              </ul>
            ) : (
              <p>관리할 subject를 생성해 주세요.</p>
            )}
          </submitform>
        </SubjectForm>
      </Container>
    </>
  );
}
