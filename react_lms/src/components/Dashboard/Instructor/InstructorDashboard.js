import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';
import {
  apiGetQnABoardsByCourse,
  apiGetQnARepliesByQnABoardId,
  apiGetCourseReviewByCourse,
} from '../../RestApi';
import { formatDateTime } from '../../Util/util';
import { CourseOverview } from './CourseOverview';

const Container = styled.div`
  color: #454545;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  padding-top: 0.5rem;
`;

const Content = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Columntitle = styled.h1`
  font-size: 1.2rem;
  color: #3182f6;
  position: relative;
`;

const Contents = styled.div`
  &.course {
    display: flex;
  }
  &.courseReview,
  &.courseQna {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    padding: 1rem;
    & .qnaTime {
      display: flex;
      flex-direction: column;
      gap: 5px;
      text-align: end;
    }
  }
  &.qnalist {
    overflow-y: auto;
  }
`;

const UserNum = styled.div``;

const StyledNavLink = styled(NavLink)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 12px;
  color: inherit;
  text-decoration: none;
`;

export function InstructorDashboard() {
  const { user } = useContext(AuthContext);
  const courses = user.teachingCourses;
  const [latestReviews, setLatestReviews] = useState({});
  const [qnas, setQnas] = useState([]);

  // 과정별 최신 수강평 3개 가져오기
  useEffect(() => {
    const fetchLatestReviews = async () => {
      const allLatestReviews = {};
      for (const course of courses) {
        const response = await apiGetCourseReviewByCourse(course.courseId);
        const reviews = response.data.data;
        if (reviews.length > 0) {
          allLatestReviews[course.courseId] = reviews.slice(0, 3);
        }
      }
      setLatestReviews(allLatestReviews);
    };

    fetchLatestReviews();
  }, [courses]);

  useEffect(() => {
    courses.forEach((course) => {
      apiGetQnABoardsByCourse(course.courseId).then(async (response) => {
        const fetchedQnas = response.data.data;
        const latestQnas = fetchedQnas.slice(0, 3);
        await Promise.all(
          latestQnas.map((qna) => {
            return apiGetQnARepliesByQnABoardId(qna.qnaId).then((response) => {
              if (response.data.data.length > 0) {
                qna.replyId = response.data.data[0].replyId;
              }
            });
          })
        );
        setQnas(latestQnas);
      });
    });
  }, [courses]);

  return (
    <>
      <Container>
        <h1>Dashboard</h1>
        <Body>
          <Content>
            <Columntitle>
              강의 및 학생 관리
              <StyledNavLink to={`/dashboard/${user.loginId}/students_manage`}>
                전체보기
              </StyledNavLink>
            </Columntitle>
            <CourseOverview />
          </Content>
          <Content>
            <Columntitle>
              수강평
              <StyledNavLink
                to={`/dashboard/${user.loginId}/coursereview_manage`}
              >
                전체보기
              </StyledNavLink>
            </Columntitle>
            {courses.map((course, index) => {
              if (!latestReviews[course.courseId]) {
                return <p>수강평이 존재하지 않습니다.</p>;
              }
              return latestReviews[course.courseId].map((review, i) => (
                <Contents className="courseReview" key={i}>
                  <p>{review.member.name}</p>
                  <p>{review.comment}</p>
                  <p style={{ textAlign: 'end' }}>
                    {formatDateTime(review.reviewDate)}
                  </p>
                </Contents>
              ));
            })}
          </Content>
          <Content className="examlist">
            <Columntitle>
              시험 및 문제 관리
              <StyledNavLink to={`/dashboard/${user.loginId}/exam_manage`}>
                전체보기
              </StyledNavLink>
            </Columntitle>
          </Content>
          <Content>
            <Columntitle>
              QnA
              <StyledNavLink to={`/dashboard/${user.loginId}/qna_manage`}>
                전체보기
              </StyledNavLink>
            </Columntitle>
            {qnas
              .slice(0)
              .reverse()
              .map((qna, index) => (
                <Contents className="courseQna" key={index}>
                  <p>{qna.member.name}</p>
                  <p>{qna.questionText}</p>
                  <div className="qnaTime">
                    <p>{formatDateTime(qna.createdAt)}</p>
                    {qna.replyId ? (
                      <p>답변 완료</p>
                    ) : (
                      <p style={{ color: '#3182f6' }}>답변 대기 중</p>
                    )}
                  </div>
                </Contents>
              ))}
          </Content>
        </Body>
      </Container>
    </>
  );
}
