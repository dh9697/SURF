import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  apiGetCourse,
  apiGetContentByCourse,
  apiGetCourseReviewByCourse,
  apiPostCourseReview,
} from "../../RestApi";
import { AuthContext } from "../../../AuthContext";
import { formatDateTime } from "../../Util/util";

const Container = styled.div`
  width: 100%;
  padding: 50px;
  & .innerWrapper {
    display: flex;
    flex-direction: column;
    flex: 1 1 0px;
    gap: 2rem;
  }
`;
const DescriptionBox = styled.div`
  border: 1px solid black;
`;

const ListBox = styled.div`
  flex: 1 1 auto;
  padding-left: 40px;
`;

const List = styled.div`
  font-weight: 400;
  line-height: 1.5; //list마다의 간격 조정 가능
  letter-spacing: -0.3px;
  font-size: 16px;
  align-self: baseline;
  color: #343a40;
`;

//여기는 icon png 구해서 img로 변경해야 함
const Icon = styled.div`
  margin-right: 8px;
  /* width: 16px; */
  /* height: 16px; */
`;

const ReviewBox = styled.div`
  border: 1px solid black;
`;

const InputBox = styled.form`
  display: flex;
  gap: 1rem;
  height: 30px;
  & input {
    flex: 1;
  }
`;
const Reviews = styled.table``;
const Review = styled.tr``;

export function CourseDescription() {
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState(""); //수강평 내용
  const [rating, setRating] = useState(0); //별점

  // 해당 강의 조회
  useEffect(() => {
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("코스 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  // 해당 강의 컨텐츠 조회
  useEffect(() => {
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContent(response.data.data);
      })
      .catch((error) => {
        console.error("컨텐츠 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  // 해당 강의 리뷰 조회
  useEffect(() => {
    apiGetCourseReviewByCourse(courseId).then((response) => {
      setReviews(response.data.data);
    });
  }, [courseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPostCourseReview({
      memberId: user.memberId,
      courseId: courseId,
      comment,
      rating,
    })
      .then(() => {
        setComment("");
        setRating(0);
        apiGetCourseReviewByCourse(courseId).then((response) => {
          setReviews(response.data.data);
        });
      })
      .catch((error) => {
        console.error("리뷰 생성 실패: ", error);
      });
  };

  return (
    <>
      <Container>
        <div className="innerWrapper">
          <DescriptionBox id="description">
            {course && course.courseName && (
              <strong>{course.courseName} </strong>
            )}
            부분입니다
            {course && course.description && <p>{course.description} </p>}
            <ListBox>
              <List>
                {content.map((item, index) => (
                  <p key={index}>
                    <Icon>아이콘</Icon>
                    {`${item.description}`}
                  </p>
                ))}
              </List>
            </ListBox>
          </DescriptionBox>
          <ReviewBox id="review">
            <p>
              <strong>수강평</strong>
            </p>
            <InputBox onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="다른 수강생들이 볼 수 있게 수강 후기와 별점을 남겨 주세요"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="0">별점 선택</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type="submit">등록</button>
            </InputBox>
            <Reviews>
              <colgroup>
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 300 + "px" }} />
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 130 + "px" }} />
              </colgroup>
              {reviews.map((review, index) => (
                <Review key={index}>
                  <td className="name">{review.member.name}</td>
                  <td className="reviewText">{review.comment}</td>
                  <td className="starRating">{review.rating}</td>
                  <td className="time">{formatDateTime(review.reviewDate)}</td>
                </Review>
              ))}
            </Reviews>
          </ReviewBox>
        </div>
      </Container>
    </>
  );
}
