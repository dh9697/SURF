import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../AuthContext";
import {
  apiGetAllCourses,
  apiGetAllSurfers,
  apiGetAllUsers,
  apiGetAllMembers,
  apiGetAllInstructors,
} from "../../../RestApi";
import { Chart as chartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

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
  & .getAllSurfers {
    display: flex;
    gap: 2rem;
    align-items: center;
    padding-bottom: 1rem;
  }
  & .buttonBox {
    display: flex;
    gap: 1rem;
    & button {
      background-color: #3182f6;
      border-radius: 5px;
      color: white;
      padding: 8px 32px;
      border: 0;
      cursor: pointer;
      &:hover {
      }
    }
  }
`;

const StickyThead = styled.thead`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

const PieContainer = styled.div`
  width: 500px;
  & h2 {
    padding: 1.5rem 0;
  }
`;

export function UserInfo() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [surfers, setSurfers] = useState([]);
  const [surferUsers, setSurferUsers] = useState([]);
  const [surferMembers, setSurferMembers] = useState([]);
  const [surferInstructors, setSurferInstructors] = useState([]);
  const [surfersCount, setSurfersCount] = useState(0);
  const [surferUsersCount, setSurferUsersCount] = useState(0);
  const [surferMembersCount, setSurferMembersCount] = useState(0);
  const [surferInstructorsCount, setSurferInstructorsCount] = useState(0);

  useEffect(() => {
    apiGetAllCourses().then((response) => {
      setCourses(response.data.data);
      console.log(response.data.data);
    });
    fetchSurfers();
  }, []);

  useEffect(() => {
    fetchSurfers();
    fetchUsers();
    fetchMembers();
    fetchInstructors();
  }, []);

  const fetchSurfers = () => {
    apiGetAllSurfers().then((response) => {
      setSurfers(response.data.data);
      setSurfersCount(response.data.data.length);
      setSurferUsers([]);
      setSurferMembers([]);
      setSurferInstructors([]);
    });
  };

  const fetchUsers = () => {
    apiGetAllUsers().then((response) => {
      setSurferUsers(response.data.data);
      setSurferUsersCount(response.data.data.length);
      setSurfers([]);
      setSurferMembers([]);
      setSurferInstructors([]);
    });
  };

  const fetchMembers = () => {
    apiGetAllMembers().then((response) => {
      setSurferMembers(response.data.data);
      setSurferMembersCount(response.data.data.length);
      setSurfers([]);
      setSurferUsers([]);
      setSurferInstructors([]);
    });
  };

  const fetchInstructors = () => {
    apiGetAllInstructors().then((response) => {
      setSurferInstructors(response.data);
      setSurferInstructorsCount(response.data.length);
      console.log(response.data);
      setSurfers([]);
      setSurferUsers([]);
      setSurferMembers([]);
    });
  };

  return (
    <Container>
      <Section>
        <div className="getAllSurfers">
          <h1>모든 유저 보기</h1>
          <div className="buttonBox">
            <button onClick={fetchSurfers}>Surfers ({surfersCount}명)</button>
            <button onClick={fetchUsers}>Users ({surferUsersCount}명)</button>
            <button onClick={fetchMembers}>
              Members ({surferMembersCount}명)
            </button>
            <button onClick={fetchInstructors}>
              Instructors ({surferInstructorsCount}명)
            </button>
          </div>
        </div>
        <TableContainer>
          <Table>
            <StickyThead>
              <Tr>
                <Th>이름</Th>
                <Th>아이디</Th>
                <Th>생년월일</Th>
                <Th>성별</Th>
                <Th>국적</Th>
                <Th>이메일</Th>
                <Th>핸드폰 번호</Th>
              </Tr>
            </StickyThead>
            <tbody>
              {surfers &&
                surfers.map((surfer, index) => (
                  <Tr key={index}>
                    <Td>{surfer.name}</Td>
                    <Td>{surfer.loginId}</Td>
                    <Td>{surfer.birthDate}</Td>
                    <Td>{surfer.gender}</Td>
                    <Td>{surfer.nationality}</Td>
                    <Td>{surfer.email}</Td>
                    <Td>{surfer.phoneNum}</Td>
                  </Tr>
                ))}
              {surferUsers &&
                surferUsers.map((user, index) => (
                  <Tr key={index}>
                    <Td>{user.name}</Td>
                    <Td>{user.loginId}</Td>
                    <Td>{user.birthDate}</Td>
                    <Td>{user.gender}</Td>
                    <Td>{user.nationality}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phoneNum}</Td>
                  </Tr>
                ))}
              {surferMembers &&
                surferMembers.map((member, index) => (
                  <Tr key={index}>
                    <Td>{member.name}</Td>
                    <Td>{member.loginId}</Td>
                    <Td>{member.birthDate}</Td>
                    <Td>{member.gender}</Td>
                    <Td>{member.nationality}</Td>
                    <Td>{member.email}</Td>
                    <Td>{member.phoneNum}</Td>
                  </Tr>
                ))}
              {surferInstructors &&
                surferInstructors.map((instructor, index) => (
                  <Tr key={index}>
                    <Td>{instructor.name}</Td>
                    <Td>{instructor.loginId}</Td>
                    <Td>{instructor.birthDate}</Td>
                    <Td>{instructor.gender}</Td>
                    <Td>{instructor.nationality}</Td>
                    <Td>{instructor.email}</Td>
                    <Td>{instructor.phoneNum}</Td>
                  </Tr>
                ))}
            </tbody>
          </Table>
        </TableContainer>
        <PieContainer>
          <h2>유저 현황</h2>
          <Pie
            data={{
              labels: ["Surfers", "Users", "Members", "Instructors"],
              datasets: [
                {
                  label: "유저 수",
                  data: [
                    surfersCount,
                    surferUsersCount,
                    surferMembersCount,
                    surferInstructorsCount,
                  ],
                  backgroundColor: [
                    "lightblue",
                    "lightgray",
                    "lightgreen",
                    "#454545",
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </PieContainer>
      </Section>
    </Container>
  );
}
