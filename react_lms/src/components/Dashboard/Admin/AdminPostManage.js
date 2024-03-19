import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { apiGetAllCourseReviews, apiGetAllQnABoards } from '../../RestApi';

const Container = styled.div`
  width: 100%;
  color: #454545;
`;

const PostWrap = styled.div`
  width: 100%;
  overflow-y: auto;
  max-height: 500px;
`;

const PostTable = styled.table`
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

export function AdminPostManage() {
  const [qnaBoards, setQnaBoards] = useState([]);
  const [courseReviews, setCourseReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qnaResponse = await apiGetAllQnABoards();
        setQnaBoards(qnaResponse.data.data);

        const reviewsResponse = await apiGetAllCourseReviews();
        setCourseReviews(reviewsResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <h2>게시물 관리</h2>
        <div>
          <PostWrap>
            <h2>QnA</h2>
            <PostTable>
              <thead>
                <tr>
                  <Th>작성자</Th>
                  <Th>작성자 아이디</Th>
                  <Th>게시글 내용</Th>
                  <Th>기능</Th>
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
            <h2>수강평</h2>
            <PostTable>
              <thead>
                <tr>
                  <Th>작성자</Th>
                  <Th>작성자 아이디</Th>
                  <Th>게시글 내용</Th>
                  <Th>기능</Th>
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
