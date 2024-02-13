import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../AuthContext";
import { apiGetAllCourseReviews, apiGetAllQnABoards } from "../../RestApi";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PostWrap = styled.div`
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-right: 20px; /* 변경된 부분 */
`;

const PostTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  background-color: #f0f0f0;
  color: #333;
  font-weight: bold;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
`;

const Header = styled.div`
  background-color: transparent;
  text-align: center;
  padding: 12px;
  font-weight: bold;
`;

export function AdminPostManage() {
  const { user } = useContext(AuthContext);
  const [qnaBoards, setQnaBoards] = useState([]);
  const [courseReviews, setCourseReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 모든 QnA 게시판 가져오기
        const qnaResponse = await apiGetAllQnABoards();
        setQnaBoards(qnaResponse.data.data);
        // 모든 수강평 가져오기
        const reviewsResponse = await apiGetAllCourseReviews();
        setCourseReviews(reviewsResponse.data.data);
        console.log(reviewsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <h1 style={{ marginBottom: "20px" }}>게시물 관리</h1>
        <div style={{ display: "flex" }}>
          <PostWrap>
            <Header>QnA</Header>
            <PostTable>
              <thead>
                <tr>
                  <Th style={{ width: "80px" }}>작성자</Th>
                  <Th style={{ width: "80px" }}>작성자 아이디</Th>
                  <Th style={{ width: "180px" }}>게시글 내용</Th>
                  <Th style={{ width: "120px" }}>기능</Th>
                </tr>
              </thead>
              <tbody>
                {qnaBoards.map((board, index) => (
                  <tr key={index}>
                    <Td>{board.member.name}</Td>
                    <Td>{board.member.loginId}</Td>
                    <Td>{board.questionText}</Td>
                    <Td>수정/삭제/자세히보기</Td>
                  </tr>
                ))}
              </tbody>
            </PostTable>
          </PostWrap>
          <PostWrap>
            <Header>수강평</Header>
            <PostTable>
              <thead>
                <tr>
                  <Th style={{ width: "80px" }}>작성자</Th>
                  <Th style={{ width: "80px" }}>작성자 아이디</Th>
                  <Th style={{ width: "180px" }}>게시글 내용</Th>
                  <Th style={{ width: "120px" }}>기능</Th>
                </tr>
              </thead>
              <tbody>
                {courseReviews.map((review, index) => (
                  <tr key={index}>
                    <Td>{review.member.name}</Td>
                    <Td>{review.member.loginId}</Td>
                    <Td>{review.comment}</Td>
                    <Td>수정/삭제/자세히보기</Td>
                  </tr>
                ))}
              </tbody>
            </PostTable>
          </PostWrap>
        </div>
      </Container>
    </>
  );
}
