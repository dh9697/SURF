import styled from "styled-components";
import { UserInfo } from "./Make/UserInfo";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../AuthContext";
import { apiGetAllCourses, apiGetCourseHistroiesByCourse } from "../../RestApi";

const TableContainer = styled.div`
  overflow-y: auto;
  max-height: 400px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  border-bottom: 2px solid #ddd;
  background-color: #ddd;
  text-align: start;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
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
  & h1 {
    padding-bottom: 1rem;
  }
`;

const StickyThead = styled.thead`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

export function AdminUserManage() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [courseUserCounts, setCourseUserCounts] = useState({});

  useEffect(() => {
    apiGetAllCourses().then((response) => {
      setCourses(response.data.data);
      console.log(response.data.data);
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
        <h1>코스별 유저 수</h1>
        <TableContainer>
          <Table>
            <StickyThead>
              <Tr>
                <Th>코스 이름</Th>
                <Th>담당 강사</Th>
                <Th>유저 수</Th>
              </Tr>
            </StickyThead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <Tr key={index}>
                    <Td>{course.courseName}</Td>
                    <Td>{course.instructorNames[0]}</Td>
                    <Td>{courseUserCounts[course.courseId] || 0}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="6">코스 정보를 불러오는 중입니다...</Td>
                </Tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </Section>
      <UserInfo />
    </Container>
  );
}
