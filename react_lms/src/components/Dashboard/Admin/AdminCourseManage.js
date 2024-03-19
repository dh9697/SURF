import React, { useEffect, useState } from 'react';
import {
  apiGetAllCourses,
  apiPutCourse,
  apiPostCourse,
  apiDeleteCourse,
  apiGetAllSubject,
} from '../../RestApi';
import styled from 'styled-components';
import { formatPrice } from '../../Util/util';

const Container = styled.div`
  width: 100%;
  color: #454545;
  & h2 {
    margin-bottom: 2rem;
  }
`;
const SelectForm = styled.div`
  margin-bottom: 1rem;
  & label {
    font-size: 14px;
    font-weight: 900;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
`;

const CourseForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  & label {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    font-size: 14px;
    font-weight: 900;
    & input {
      border: 1px solid #ddd;
      padding: 0.5rem;
      border-radius: 5px;
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

const Courses = styled.div``;

const CoursesGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  align-items: start;
  justify-content: center;
  & .gridItem {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    & .courseText {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding-top: 1rem;
      & .courseInfo {
        display: flex;
        gap: 0.5rem;
      }
      & .courseName {
        font-size: 1.5rem;
        font-weight: 900;
      }
      & .subjectName {
        padding-top: 10px;
      }
      & .instructorNames {
      }
      & .price {
        color: #3182f6;
        font-size: 1rem;
        font-weight: 900;
      }
    }
    & .buttonBox {
      display: flex;
      gap: 2rem;
      justify-content: center;
      margin: 2rem 0;
    }
  }
`;

const ImgBox = styled.div`
  width: 300px;
  height: 200px;
  background-color: gray;
  & img {
    width: 100%;
  }
`;

export function AdminCourseManage() {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
    description: '',
    durationMins: 0,
    contentLevel: '',
    price: 0,
    announcement: '',
    instructorLoginId: [''],
    subjectId: '',
    courseThumbnail: '',
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    apiGetAllCourses()
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error('코스 불러오기 오류: ', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
          console.log('코스 수정 성공: ', response);
          loadCourses();
        })
        .catch((err) => {
          console.error('코스 수정 오류: ', err);
        });
    } else {
      // 등록
      apiPostCourse({
        ...formData,
        instructorLoginIds: [formData.instructorLoginId],
        subject: formData.subject,
      })
        .then((response) => {
          console.log('코스 등록 성공: ', response);
          loadCourses();
        })
        .catch((err) => {
          console.error('코스 등록 오류: ', err);
        });
    }

    // 폼 초기화
    setFormData({
      courseId: '',
      courseName: '',
      description: '',
      durationMins: 0,
      contentLevel: '',
      price: 0,
      announcement: '',
      instructorLoginId: [''],
      subjectId: '',
      courseThumbnail: '',
    });
  };

  const handleEdit = (course) => {
    setFormData(course);
  };

  const handleDelete = (courseId) => {
    apiDeleteCourse(courseId)
      .then((response) => {
        console.log('코스 삭제 성공: ', response);
        loadCourses();
      })
      .catch((err) => {
        console.error('코스 삭제 오류: ', err);
      });
  };

  // subject 조회
  useEffect(() => {
    apiGetAllSubject()
      .then((response) => {
        setSubjects(response.data.data);
      })
      .catch((error) => {
        console.error('과목 불러오기 오류: ', error);
      });
  }, []);

  return (
    <Container>
      <h2>강좌 등록</h2>
      <SelectForm>
        <label>
          강좌 분류
          <Select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleInputChange}
          >
            <option value="">강좌를 분류해주세요.</option>
            {subjects.map((subject) => (
              <option key={subject.subjectId} value={subject.subjectId}>
                {subject.subjectName}
              </option>
            ))}
          </Select>
        </label>
      </SelectForm>
      <CourseForm onSubmit={handleSubmit}>
        <label>
          강의 이름
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          부가 설명
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          총 수업 시간 (분 단위)
          <input
            type="number"
            name="durationMins"
            value={formData.durationMins}
            onChange={handleInputChange}
          />
        </label>
        <label>
          콘텐츠 레벨
          <input
            type="text"
            name="contentLevel"
            value={formData.contentLevel}
            onChange={handleInputChange}
          />
        </label>
        <label>
          가격
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          공지사항
          <input
            type="text"
            name="announcement"
            value={formData.announcement}
            onChange={handleInputChange}
          />
        </label>
        <label>
          썸네일
          <input
            type="text"
            name="courseThumbnail"
            value={formData.courseThumbnail}
            onChange={handleInputChange}
          />
        </label>
        <label>
          instructor loginId
          <input
            type="text"
            name="instructorLoginId"
            value={formData.instructorLoginId}
            onChange={handleInputChange}
          />
        </label>
        <Button className="submitButton" type="submit">
          {formData.courseId ? '코스 수정' : '코스 등록'}
        </Button>
      </CourseForm>
      <Courses>
        <h2>등록된 강좌 목록</h2>
        <CoursesGrid>
          {courses.map((course) => (
            <div className="gridItem" key={course.courseId}>
              <ImgBox>
                <img src={course.courseThumbnail} alt="코스 썸네일" />
              </ImgBox>
              <div className="courseText">
                <div className="courseInfo">
                  {course.subject && <p>{course.subject.subjectName}</p>}
                  <p>{course.contentLevel}</p>
                  <p>{course.durationMins} 분</p>
                </div>
                <p className="courseName">{course.courseName}</p>
                <p className="instructorNames">{course.instructorNames}</p>
                <p className="price">{formatPrice(course.price)}</p>
                <p>부가설명 : {course.description}</p>
                <p>공지사항 : {course.announcement}</p>
              </div>
              <div className="buttonBox">
                <Button onClick={() => handleEdit(course)}>수정</Button>
                <Button onClick={() => handleDelete(course.courseId)}>
                  삭제
                </Button>
              </div>
            </div>
          ))}
        </CoursesGrid>
      </Courses>
    </Container>
  );
}
