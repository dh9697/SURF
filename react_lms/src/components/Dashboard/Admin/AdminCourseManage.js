import React, { useEffect, useState } from "react";
import {
  apiGetAllCourses,
  apiPutCourse,
  apiPostCourse,
  apiDeleteCourse,
  apiGetAllSubject,
} from "../../RestApi";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;
const CoursesGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  list-style: none;
`;
export function AdminCourseManage() {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    description: "",
    durationMins: 0,
    contentLevel: "",
    price: 0,
    announcement: "",
    instructorLoginId: [""],
    subejct: [],
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    apiGetAllCourses()
      .then((response) => {
        setCourses(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("코스 불러오기 오류: ", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "subjectId") {
      const selectedSubject = subjects.find(
        (subject) => subject.subjectId === Number(value)
      );
      setFormData({
        ...formData,
        subject: selectedSubject,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.courseId) {
      // 수정
      apiPutCourse(formData.courseId, {
        ...formData,
        instructorLoginIds: [formData.instructorLoginId],
        subject: formData.subject,
      })
        .then((response) => {
          console.log("코스 수정 성공: ", response);
          loadCourses();
        })
        .catch((err) => {
          console.error("코스 수정 오류: ", err);
        });
    } else {
      // 등록
      apiPostCourse({
        ...formData,
        instructorLoginIds: [formData.instructorLoginId],
        subject: formData.subject,
      })
        .then((response) => {
          console.log("코스 등록 성공: ", response);
          loadCourses();
        })
        .catch((err) => {
          console.error("코스 등록 오류: ", err);
        });
    }

    // 폼 초기화
    setFormData({
      courseId: "",
      courseName: "",
      description: "",
      durationMins: 0,
      contentLevel: "",
      price: 0,
      announcement: "",
      instructorLoginId: [""],
      subject: null,
    });
  };

  const handleEdit = (course) => {
    setFormData(course);
  };

  const handleDelete = (courseId) => {
    apiDeleteCourse(courseId)
      .then((response) => {
        console.log("코스 삭제 성공: ", response);
        loadCourses();
      })
      .catch((err) => {
        console.error("코스 삭제 오류: ", err);
      });
  };

  // subject 조회
  useEffect(() => {
    apiGetAllSubject()
      .then((response) => {
        setSubjects(response.data.data);
      })
      .catch((error) => {
        console.error("과목 불러오기 오류: ", error);
      });
  }, []);

  return (
    <Container>
      <div>
        {/* 코스 관리 부분은 관리자 페이지 코스페이지에서 겟만 해서 보여주기 */}
        <h1>코스 관리</h1>
        <label>
          course:
          <select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleInputChange}
          >
            {subjects.map((subject) => (
              <option key={subject.subjectId} value={subject.subjectId}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </label>
        <form onSubmit={handleSubmit}>
          <label>
            코스 이름:
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            설명:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            수업 시간:
            <input
              type="number"
              name="durationMins"
              value={formData.durationMins}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            콘텐츠 레벨:
            <input
              type="text"
              name="contentLevel"
              value={formData.contentLevel}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            가격:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            공지사항:
            <input
              type="text"
              name="announcement"
              value={formData.announcement}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            선생님loginId:
            <input
              type="text"
              name="instructorLoginId"
              value={formData.instructorLoginId}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">
            {formData.courseId ? "코스 수정" : "코스 등록"}
          </button>
        </form>
        <h2>등록된 코스 목록</h2>
        <CoursesGrid>
          {courses.map((course) => (
            <li key={course.courseId}>
              <strong>{course.courseName}</strong>
              <p>course:{course.subject?.subjectName} </p>
              <p>설명: {course.description}</p>
              <p>수업 시간: {course.durationMins} 분</p>
              <p>콘텐츠 레벨: {course.contentLevel}</p>
              <p>가격: {course.price} 원</p>
              <p>공지사항: {course.announcement}</p>
              <p>선생님: {course.instructorNames}</p>
              <button onClick={() => handleEdit(course)}>수정</button>
              <button onClick={() => handleDelete(course.courseId)}>
                삭제
              </button>
            </li>
          ))}
        </CoursesGrid>
      </div>
    </Container>
  );
}
