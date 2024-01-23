import React, { useEffect, useState } from "react";
import {
  apiGetAllCourses,
  apiPutCourse,
  apiPostCourse,
  apiDeleteCourse,
} from "./RestApi";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

export function Course() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [durationMins, setDurationMins] = useState(0);
  const [contentLevel, setContentLevel] = useState("");
  const [price, setPrice] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [coursethumbnail, setCourseThumbnail] = useState(null);
  const [subjectId, setSubjectId] = useState(""); // 추가된 부분
  const [instructorId, setInstructorId] = useState("");
  const [courseIdToUpdate, setCourseIdToUpdate] = useState(null);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadCourses();
    cancelEditMode();
  }, []);

  const loadCourses = () => {
    apiGetAllCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("코스 불러오기 오류: ", error);
        console.error(
          "에러 상세 정보: ",
          error.response || error.message || error
        );
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseData = {
      courseName,
      description,
      durationMins,
      contentLevel,
      price,
      announcement,
      coursethumbnail,
      subject: { subjectId }, // 추가된 부분
      instructor: { instructorId },
    };

    if (editMode) {
      apiPutCourse(courseIdToUpdate, courseData)
        .then((response) => {
          console.log("코스 수정 성공: ", response);
          setFormSubmitted(true);
          loadCourses();
          cancelEditMode();
        })
        .catch((err) => {
          console.error("코스 수정 오류: ", err);
          setFormSubmitted(false);
        });
    } else {
      apiPostCourse(courseData)
        .then((response) => {
          console.log("코스 추가 성공: ", response);
          setFormSubmitted(true);
          loadCourses();
        })
        .catch((err) => {
          console.error("코스 추가 오류: ", err);
          setFormSubmitted(false);
        });
    }
  };

  const handleDelete = (courseId) => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (isConfirmed) {
      apiDeleteCourse(courseId)
        .then((response) => {
          console.log("코스 삭제 성공: ", response);
          loadCourses();
        })
        .catch((err) => {
          console.log("코스 삭제 오류: ", err);
        });
    }
  };

  const enterEditMode = (
    courseId,
    courseName,
    description,
    durationMins,
    contentLevel,
    price,
    announcement
  ) => {
    setEditMode(true);
    setCourseIdToUpdate(courseId);
    setCourseName(courseName);
    setDescription(description);
    setDurationMins(durationMins);
    setContentLevel(contentLevel);
    setPrice(price);
    setAnnouncement(announcement);
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setCourseIdToUpdate(null);
    setCourseName("");
    setDescription("");
    setDurationMins(0);
    setContentLevel("");
    setPrice(0);
    setAnnouncement("");
  };

  return (
    <Container>
      <h1>코스 목록</h1>
      <form>
        <label>
          과목 ID:
          <input
            type="text"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          />
        </label>
        <br />
        <label>
          선생님 ID:
          <input
            type="text"
            value={instructorId}
            onChange={(e) => setInstructorId(e.target.value)}
          />
        </label>
        <br />

        <label>
          코스 이름:
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </label>
        <br />
        <label>
          설명:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          수업 시간:
          <input
            type="number"
            value={durationMins}
            onChange={(e) => setDurationMins(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          콘텐츠 레벨:
          <input
            type="text"
            value={contentLevel}
            onChange={(e) => setContentLevel(e.target.value)}
          />
        </label>
        <br />
        <label>
          가격:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          공지사항:
          <input
            type="text"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          />
        </label>
        <br />
        <label>
          Coursethumbnail:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCourseThumbnail(e.target.files[0])}
          />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          {editMode ? "코스 수정" : "코스 추가"}
        </button>
      </form>
      {isFormSubmitted && (
        <p style={{ color: "green" }}>
          {editMode ? "코스 수정 완료" : "코스 추가 완료"}
        </p>
      )}
      <h2>등록된 코스 목록</h2>
      {courses &&
        courses.map((course) => (
          <li key={course.courseId}>
            <strong>{course.courseName}</strong>
            <p>설명: {course.description}</p>
            <p>수업 시간: {course.durationMins} 분</p>
            <p>콘텐츠 레벨: {course.contentLevel}</p>
            <p>가격: {course.price} 원</p>
            <p>공지사항: {course.announcement}</p>
            <p>
              선생님: {course.instructor ? course.instructor.name : "미지정"}
            </p>
            <button
              onClick={() =>
                enterEditMode(
                  course.courseId,
                  course.courseName,
                  course.description,
                  course.durationMins,
                  course.contentLevel,
                  course.price,
                  course.announcement
                )
              }
            >
              수정
            </button>
            <button onClick={() => handleDelete(course.courseId)}>삭제</button>
          </li>
        ))}
    </Container>
  );
}
