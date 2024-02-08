import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */ //중앙으로 이동
`;

const PostWrap = styled.div`
  width: 80%;
  margin-top: 20px;
`;
const PostTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
`;
const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export function AdminPostManage() {
  return (
    <>
      <Container>
        <h1>게시물 관리</h1>
        <PostWrap>
          <PostTable>
            <thead>
              <tr>
                <Th style={{ width: 80 + "px" }}>작성자</Th>
                <Th style={{ width: 80 + "px" }}>작성자 아이디</Th>
                <Th style={{ width: 180 + "px" }}>게시글 내용</Th>
                <Th style={{ width: 80 + "px" }}>게시판</Th>
                <Th style={{ width: 120 + "px" }}>기능</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>작성자</Td>
                <Td>작성자 아이디</Td>
                <Td>게시글 내용</Td>
                <Td>게시판</Td>
                <Td>수정/삭제/자세히보기</Td>
              </tr>
            </tbody>
          </PostTable>
        </PostWrap>
      </Container>
    </>
  );
}
