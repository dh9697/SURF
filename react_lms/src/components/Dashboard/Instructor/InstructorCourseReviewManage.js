import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { apiGetAllCourses, apiGetCourseReviewByCourse } from "../../RestApi";
import { formatDateTime, StarRating } from "../../Util/util";
import { AuthContext } from "../../../AuthContext";

const Container = styled.div`
  width: 100%;
  color: #454545;
`;
const ReviewBox = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const SingleReview = styled.div`
  background-color: #f3f3f3;
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  border-radius: 10px;
  & .date {
    text-align: end;
  }
`;
const Select = styled.select`
  padding: 10px;
  margin-top: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
`;

export function InstructorCourseReviewManage() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [teachingCourses, setTeachingCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  // 코스 모두 조회
  useEffect(() => {
    apiGetAllCourses()
      .then((response) => {
        setCourses(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("코스 불러오기 오류: ", error);
      });
  }, []);

  // 조회한 코스 중 teachingCourse 조회
  useEffect(() => {
    const userTeachingCoursesIds = user.teachingCourses.map(
      (course) => course.courseId
    );
    const userTeachingCourses = courses.filter((course) =>
      userTeachingCoursesIds.includes(course.courseId)
    );
    setTeachingCourses(userTeachingCourses);
  }, [courses, user]);

  // teachingCourse의 리뷰 조회
  useEffect(() => {
    if (selectedCourse) {
      apiGetCourseReviewByCourse(selectedCourse)
        .then((response) => {
          setReviews(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error("리뷰 불러오기 오류: ", error);
        });
    }
  }, [selectedCourse]);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <>
      <Container>
        <h1>수강평 조회</h1>
        <Select onChange={handleCourseChange}>
          <option value="">강의 선택</option>
          {teachingCourses.map((course) => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseName}
            </option>
          ))}
        </Select>
        <ReviewBox>
          {reviews.map((review) => (
            <SingleReview key={review.reviewId}>
              <p>{review.member.name}</p>
              <p>{review.comment}</p>
              <StarRating averageRating={review.rating} />
              <p className="date">{formatDateTime(review.reviewDate)}</p>
            </SingleReview>
          ))}
        </ReviewBox>
      </Container>
    </>
  );
}
