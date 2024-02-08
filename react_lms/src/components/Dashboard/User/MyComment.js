import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import {
  apiDeleteCourseReview,
  apiGetCourseReviewByMember,
  apiPutCourseReview,
  apiDeleteQnABoard,
  apiGetQnABoardsByMember,
  apiUpdateQnABoard,
} from "../../RestApi";
import { AuthContext } from "../../../AuthContext";
import { formatDateTimeStamp } from "../../Util/util";

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
  display: flex;
  gap: 2rem;
`;

const ReviewContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export function MyComment() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;
  const [selectedTab, setSelectedTab] = useState("qna");
  const [qnas, setQnas] = useState([]);
  const [editingQnAId, seteditingQnAId] = useState(null);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [newComment, setNewComment] = useState("");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // 로그인 유저의 질문 댓글 조회
  useEffect(() => {
    apiGetQnABoardsByMember(memberId).then((response) => {
      setQnas(response.data.data);
    });
  }, []);

  // 로그인 유저의 질문 댓글 수정
  const handleQnABoardUpdate = (qnaId) => {
    apiUpdateQnABoard(qnaId, newQuestionText)
      .then((response) => {
        apiGetQnABoardsByMember(memberId).then((response) => {
          setQnas(response.data.data);
        });
        window.alert("질문이 성공적으로 수정되었습니다.");
        seteditingQnAId(null);
        setNewQuestionText("");
      })
      .catch((err) => {
        console.log("질문 댓글 수정 실패: ", err);
      });
  };

  // 로그인 유저의 질문 댓글 삭제
  const handleQnABoardDelete = (qnaId) => {
    apiDeleteQnABoard(qnaId)
      .then((response) => {
        apiGetQnABoardsByMember(memberId).then((response) => {
          setQnas(response.data.data);
        });
        window.alert("댓글이 성공적으로 삭제되었습니다.");
      })
      .catch((err) => {
        console.log("댓글 삭제 실패: ", err);
      });
  };

  // 로그인 유저의 코스리뷰 조회
  useEffect(() => {
    apiGetCourseReviewByMember(memberId).then((response) => {
      setReviews(response.data.data);
    });
  }, []);

  // 로그인 유저의 코스리뷰 수정
  const handleReviewUpdate = (reviewId) => {
    apiPutCourseReview(reviewId, newComment)
      .then((response) => {
        apiGetCourseReviewByMember(memberId).then((response) => {
          setReviews(response.data.data);
        });
        window.alert("리뷰가 성공적으로 수정되었습니다.");
        setEditingReviewId(null);
        setNewComment("");
      })
      .catch((err) => {
        console.log("코스리뷰 수정 실패: ", err);
      });
  };

  // 로그인 유저의 코스리뷰 삭제
  const handleReviewDelete = (reviewId) => {
    apiDeleteCourseReview(reviewId)
      .then((response) => {
        apiGetCourseReviewByMember(memberId).then((response) => {
          setReviews(response.data.data);
        });
        window.alert("리뷰가 성공적으로 삭제되었습니다.");
      })
      .catch((err) => {
        console.log("코스리뷰 삭제 실패: ", err);
      });
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
        {selectedTab === "qna" &&
          qnas.map((qna, index) => (
            <QnaContainer key={index}>
              <p>{qna.course.courseName}</p>
              <p>{qna.member.name}</p>
              {editingQnAId === qna.qnaId ? (
                <>
                  <input
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                  />
                  <button onClick={() => handleQnABoardUpdate(qna.qnaId)}>
                    수정 완료
                  </button>

                  <button onClick={() => seteditingQnAId(null)}>취소</button>
                </>
              ) : (
                <>
                  <p>{qna.questionText}</p>
                </>
              )}
              <p>{formatDateTimeStamp(qna.createdAt)}</p>
              <button onClick={() => seteditingQnAId(qna.qnaId)}>수정</button>
              <button onClick={() => handleQnABoardDelete(qna.qnaId)}>
                삭제
              </button>
            </QnaContainer>
          ))}
        {selectedTab === "coursereview" &&
          reviews.map((review, index) => (
            <ReviewContainer key={index}>
              <p>{review.course.courseName}</p>
              <p>{review.member.name}</p>
              {editingReviewId === review.reviewId ? (
                <>
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button onClick={() => handleReviewUpdate(review.reviewId)}>
                    수정 완료
                  </button>
                  <button onClick={() => setEditingReviewId(null)}>취소</button>
                </>
              ) : (
                <>
                  <p>{review.comment}</p>
                  <button onClick={() => setEditingReviewId(review.reviewId)}>
                    수정
                  </button>
                </>
              )}
              <p>{formatDateTimeStamp(review.reviewDate)}</p>
              <button onClick={() => handleReviewDelete(review.reviewId)}>
                삭제
              </button>
            </ReviewContainer>
          ))}
      </CommentBox>
    </>
  );
}
