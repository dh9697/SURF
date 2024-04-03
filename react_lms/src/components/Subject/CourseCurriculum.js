import { NavLink, useOutletContext, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  apiGetContentByCourse,
  apiGetExamByContent,
  apiGetCompletedContentHistories,
  apiGetCourseHistroiesByCourse,
} from '../RestApi';
import { formatTime } from '../Util/util';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';

const Container = styled.div`
  color: #454545;
  padding: 1rem;
  .content.completed {
    background-color: #f3f3f3;
    & .text {
      color: #f3f3f3;
      background-color: #286ed3;
    }
  }
`;

const Title = styled.div`
  color: #adb5bd;
  & .title {
    font-size: 18px;
    font-weight: 900;
    margin-right: 0.5rem;
    color: #454545;
  }
`;

const ContentsList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 10px;
  & .contentTitle {
    width: 60%;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #f3f3f3;
  background-color: #3182f6;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
`;

const Button = styled.button`
  border: 1px solid #454545;
  color: #454545;
  padding: 5px;
  border-radius: 5px;
`;

export function CourseCurriculem() {
  const { user } = useContext(AuthContext);
  const memberId = user ? user.memberId : null;
  const { courseId } = useParams();
  const [content, setContent] = useState([]);
  const [completedContents, setCompletedContents] = useState([]);
  const [exams, setExams] = useState([]);
  const [isMemberCourse, setIsMemberCourse] = useState(false);

  // 해당 코스 컨텐츠 조회
  useEffect(() => {
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContent(response.data.data);
      })
      .catch((error) => {
        console.error('컨텐츠 정보 불러오기 오류: ', error);
      });

    apiGetCourseHistroiesByCourse(courseId)
      .then((response) => {
        const student = response.data.data.some(
          (courseHistory) => courseHistory.member.memberId === user.memberId
        );
        if (student) {
          setIsMemberCourse(true);
        }
      })
      .catch((err) => {
        console.log('수강생 전체 조회 실패: ', err);
      });
  }, [courseId]);

  // 유저의 완료된 컨텐츠 히스토리 조회
  useEffect(() => {
    if (memberId) {
      apiGetCompletedContentHistories(memberId)
        .then((response) => {
          setCompletedContents(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error('완료된 학습 이력 조회 오류: ', error);
        });
    }
  }, [memberId]);

  // 컨텐츠당 exam 조회
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await Promise.all(
          content.map((item) => apiGetExamByContent(item.contentId))
        );
        const examsTemp = response.map((res) => res.data.data);
        setExams(examsTemp);
      } catch (error) {
        console.error('시험 조회 오류: ', error);
      }
    };

    fetchExams();
  }, [content]);

  return (
    <>
      <Container id="curriculum">
        <Title>
          <span className="title">커리큘럼</span>
          <span className="titleInfo">
            총 {content?.length || 0}개,{' '}
            {content[0] &&
              content[0].course &&
              formatTime(content[0].course.durationMins)}
            의 수업
          </span>
        </Title>
        {content?.map((item, index) => {
          const isCompleted = completedContents.find(
            (history) => history.content.contentId === item.contentId
          );
          const exam = exams
            .flat()
            .find((exam) => exam?.contentId === item.contentId);
          return (
            <ContentsList
              className={`content ${isCompleted ? 'completed' : ''}`}
              key={index}
            >
              <p className="contentTitle">
                {index + 1}. {item.contentTitle}
              </p>

              {isMemberCourse ? (
                <>
                  <StyledNavLink
                    className="text"
                    to={`/course/${courseId}/content/${item.contentId}`}
                  >
                    {isCompleted ? '서핑 완료' : '서핑 하기'}
                  </StyledNavLink>
                  {isCompleted ? (
                    <>
                      {exam ? (
                        <>
                          {exam.examIsActive ? (
                            <StyledNavLink
                              to={`/dashboard/${user.loginId}/exams/${item.contentId}`}
                            >
                              과제 풀기
                            </StyledNavLink>
                          ) : (
                            <Button disabled>시험 생성 중</Button>
                          )}
                        </>
                      ) : (
                        <Button disabled>시험 생성 중</Button>
                      )}
                    </>
                  ) : (
                    <Button disabled>수강 후 시험</Button>
                  )}
                </>
              ) : null}
              <p>{item.contentDuration}:00</p>
            </ContentsList>
          );
        })}
      </Container>
    </>
  );
}
