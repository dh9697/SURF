import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../AuthContext';
import { apiGetCourseHistroiesByCourse } from '../../RestApi';

const Container = styled.div``;

export function CourseOverview() {
  const { user } = useContext(AuthContext);
  const courses = user.teachingCourses;
  const [courseHistories, setCourseHistories] = useState([]);

  useEffect(() => {
    courses.forEach((course) => {
      apiGetCourseHistroiesByCourse(course.courseId)
        .then((response) => {
          setCourseHistories(response.data.data);
          // console.log(response.data.data);
        })
        .catch((err) => {
          console.log('courseHisotry 조회 실패: ', err);
        });
    });
  }, [user]);

  return (
    <>
      <Container>
        {courses.map((course) => {
          <div key={course.courseId}>
            <p>{course.courseName}</p>
          </div>;
        })}
        <p>{courseHistories.length}</p>
        {courseHistories.map((courseHistory) => {
          <div key={courseHistory.courseHistoryId}></div>;
        })}
      </Container>
    </>
  );
}
