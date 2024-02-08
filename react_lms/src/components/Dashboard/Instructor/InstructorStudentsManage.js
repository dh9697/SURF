import styled from "styled-components";

const Container = styled.div``;
const UserTable = styled.div``;
const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
`;
const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;
const DetailTable = styled.div``;

export function InstructorStudentsManage() {
  return (
    <>
      <Container>
        <div>학생 관리</div>
        <select>
          <option value="0">강의 선택</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <UserTable>
          <thead>
            <tr>
              <Th>학생 이름</Th>
              <Th>성별</Th>
              <Th>강의 진도율</Th>
              <Th>과제율</Th>
              <Th>질문</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>학생명</Td>
              <Td>성별</Td>
              <Td>진도율</Td>
              <Td>과제 성적</Td>
              <Td>질문</Td>
            </tr>
          </tbody>
        </UserTable>
        <DetailTable>
          <p>컨텐트 디테일</p>
          <div>학생명</div>
          <div>진도율 상세</div>
        </DetailTable>
      </Container>
    </>
  );
}
