import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {
  apiGetCourse,
  apiGetContentByCourse,
  apiGetCourseReviewByCourse,
  apiPostCourseReview,
} from '../../RestApi';
import { AuthContext } from '../../../AuthContext';
import { StarRating, formatDateTime } from '../../Util/util';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Box = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: #454545;
  padding-bottom: 1rem;
`;

const List = styled.div``;

const InputBox = styled.form`
  display: flex;
  gap: 1rem;
  margin: 0.5rem;
  & input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  & select {
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  & button {
    border: none;
    background-color: #3182f6;
    color: #f3f3f3;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Review = styled.tr`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 1fr;
  padding: 10px;
  & .starRating {
    text-align: center;
  }
  & .date {
    text-align: end;
  }
`;

export function CourseDescription() {
  const location = useLocation();
  const courseId = location.pathname.split('/')[2];
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState(''); //수강평 내용
  const [rating, setRating] = useState(0); //별점

  // 해당 강의 조회
  useEffect(() => {
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error('코스 정보 불러오기 오류: ', error);
      });
  }, [courseId]);

  // 해당 강의 컨텐츠 조회
  useEffect(() => {
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContent(response.data.data);
      })
      .catch((error) => {
        console.error('컨텐츠 정보 불러오기 오류: ', error);
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
        setComment('');
        setRating(0);
        apiGetCourseReviewByCourse(courseId).then((response) => {
          setReviews(response.data.data);
        });
      })
      .catch((error) => {
        console.error('리뷰 생성 실패: ', error);
      });
  };

  return (
    <>
      <Container>
        <Box id="description">
          <Title>강의소개</Title>
          {course && course.courseName && <strong>{course.courseName} </strong>}
          부분입니다
          {course && course.description && <p>{course.description} </p>}
          <List>
            {content.map((item, index) => (
              <p key={index}>{`${item.description}`}</p>
            ))}
          </List>
        </Box>
        <Box id="review">
          <Title>수강평</Title>
          <InputBox onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="다른 수강생들이 볼 수 있게 수강 후기와 별점을 남겨 주세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="0">별점 선택</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button type="submit">등록</button>
          </InputBox>
          <table>
            {reviews.map((review, index) => (
              <Review key={index}>
                <td>
                  <strong>{review.member.name}</strong>
                </td>
                <td>{review.comment}</td>
                <td className="starRating">
                  <StarRating averageRating={review.rating} />
                </td>
                <td className="date">{formatDateTime(review.reviewDate)}</td>
              </Review>
            ))}
          </table>
        </Box>
      </Container>
    </>
  );
}
