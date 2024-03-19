import styled from 'styled-components';
import { UserInfo } from './Make/UserInfo';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../AuthContext';
import { apiGetAllCourses, apiGetCourseHistroiesByCourse } from '../../RestApi';

const TableContainer = styled.div`
  overflow-y: auto;
  max-height: 500px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  background-color: #f3f3f3;
  text-align: start;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #f3f3f3;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(2, auto);
  gap: 20px;
  color: #454545;
`;

const Section = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  & h2 {
    padding-bottom: 1rem;
  }
`;

export function AdminUserManage() {
  const [courses, setCourses] = useState([]);
  const [courseUserCounts, setCourseUserCounts] = useState({});

  useEffect(() => {
    apiGetAllCourses().then((response) => {
      setCourses(response.data.data);
    });
  }, []);

  useEffect(() => {
    Promise.all(
      courses.map((course) =>
        apiGetCourseHistroiesByCourse(course.courseId).then((response) => {
          return {
            courseId: course.courseId,
            count: response.data.data.length,
          };
        })
      )
    ).then((results) => {
      const userCounts = results.reduce((counts, result) => {
        counts[result.courseId] = result.count;
        return counts;
      }, {});
      setCourseUserCounts(userCounts);
    });
  }, [courses]);

  return (
    <Container>
      <Section>
        <h2>코스별 유저 수</h2>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>코스 이름</Th>
                <Th>담당 강사</Th>
                <Th>유저 수</Th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <tr key={index}>
                    <Td>{course.courseName}</Td>
                    <Td>{course.instructorNames[0]}</Td>
                    <Td>{courseUserCounts[course.courseId] || 0}</Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td colSpan="6">코스 정보를 불러오는 중입니다...</Td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </Section>
      <UserInfo />
    </Container>
  );
}
