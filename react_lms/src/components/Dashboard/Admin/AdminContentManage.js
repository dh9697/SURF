import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  apiGetAllCourses,
  apiGetContentByCourse,
  apiPostContentByCourse,
} from '../../RestApi';

const Container = styled.div``;

export function AdminContentManage() {
  const [contents, setContents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [contentDto, setContentDto] = useState({
    courseId: '',
    contentTitle: '',
    description: '',
    contentDuration: 0,
    contentImg: '',
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseResponse = await apiGetAllCourses();
        setCourses(courseResponse.data.data);
      } catch (err) {
        console.log('코스 조회 실패: ', err);
      }
    };

    fetchCourses();

    const fetchContentsByCourse = async (courseId) => {
      if (!courseId) return;
      try {
        const contentResponse = await apiGetContentByCourse(courseId);
        setContents(contentResponse.data.data);
        console.log(contentResponse.data.data);
      } catch (err) {
        console.log('컨텐츠 조회 실패: ', err);
      }
    };

    fetchContentsByCourse(selectedCourseId);
  }, [selectedCourseId]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPostContentByCourse(selectedCourseId, contentDto);
  };

  return (
    <>
      <Container>
        <label>
          강의 등록
          <select onChange={handleCourseChange} value={selectedCourseId}>
            <option>강좌를 선택해주세요.</option>
            {courses.map((course) => (
              <option key={course.courseId} value={course.courseId}>
                {course.courseName}
              </option>
            ))}
          </select>
        </label>
        <div>
          <h3>등록된 강의 목록</h3>
          {contents.map((content) => (
            <div key={content.contentId}>
              <p>{content.contentTitle}</p>
              <p>{content.description}</p>
              <p>{content.contentDuration}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
