import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { apiGetCourse, apiGetContentByCourse } from "../../RestApi";
import { AuthContext } from "../../../AuthContext";

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

const InputBox = styled.div`
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
  const courseId = location.pathname.split("/")[2]; // Extract courseId from the URL
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState(""); //수강평 내용
  const [starRating, setStarRating] = useState(0); //별점

  useEffect(() => {
    // Fetch course details based on courseId
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("코스 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  console.log(course);

  useEffect(() => {
    // courseId를 사용하여 강의 정보를 불러옴
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContent(response.data.data); // 불러온 강의 정보를 상태에 저장
      })
      .catch((error) => {
        console.error("컨텐츠 정보 불러오기 오류: ", error);
      });
  }, [courseId]); // courseId가 변경될 때마다 useEffect를 다시 실행

  console.log(content.map((item) => item.description));

  //리뷰 내용과 별점이 0이 아닐 때 add
  const addReview = () => {
    if (!reviewText || starRating === 0) {
      return;
    }

    const newReview = {
      name: user.name,
      reviewText: reviewText,
      starRating: starRating,
      time: new Date().toISOString().split("T")[0], //백엔드 CourseReview.model에 localDate(날짜까지)time을 받아서 하면 되지 않을까
    };

    setReviews([...reviews, newReview]);
    setReviewText("");
    setStarRating(0);
  };

  return (
    <>
      <Container>
        <div className="innerWrapper">
          <DescriptionBox>
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
          <ReviewBox>
            <p>
              <strong>수강평</strong>
            </p>
            <InputBox>
              <input
                type="text"
                placeholder="다른 수강생들이 볼 수 있게 수강 후기와 별점을 남겨 주세요"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <select
                value={starRating}
                onChange={(e) => setStarRating(parseInt(e.target.value))}
              >
                <option value="0">별점 선택</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button onClick={addReview}>등록</button>
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
                  <td className="name">{review.name}</td>
                  <td className="reviewText">{review.reviewText}</td>
                  <td className="starRating">{review.starRating}</td>
                  <td className="time">{review.time}</td>
                </Review>
              ))}
            </Reviews>
          </ReviewBox>
        </div>
      </Container>
    </>
  );
}
