import styled from "styled-components";
import { useState } from "react";

const ButtonBox = styled.div`
  width: 100%;
  border: 2px solid gray;
  border-radius: 20px;
  padding: 2px;
  margin-bottom: 5px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 8px;
  cursor: pointer;
`;

const CommentBox = styled.div`
  width: 100%;
  height: 500px;
  border: 2px solid gray;
  border-radius: 20px;
  padding: 15px;
`;

const QnaContainer = styled.div`
  /* 스타일링을 원하는 대로 추가하세요 */
`;

const ReviewContainer = styled.div`
  /* 스타일링을 원하는 대로 추가하세요 */
`;

export function MyComment() {
  const [selectedTab, setSelectedTab] = useState("qna");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <h1>작성한 게시글</h1>
      <ButtonBox>
        <Button onClick={() => handleTabChange("qna")}>작성한 수강 문의</Button>
        <Button onClick={() => handleTabChange("coursereview")}>
          작성한 수강평
        </Button>
      </ButtonBox>
      <CommentBox>
        {selectedTab === "qna" && (
          <QnaContainer>
            {/* 작성한 수강 문의 불러오기 */}내가 작성한 수강 문의입니다.
          </QnaContainer>
        )}
        {selectedTab === "coursereview" && (
          <ReviewContainer>
            {/* 작성한 수강평 불러오기 */}내가 작성한 수강평입니다.
          </ReviewContainer>
        )}
      </CommentBox>
    </>
  );
}
