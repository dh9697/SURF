import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import {
  apiGetQnABoardsByCourse,
  apiGetQnARepliesByQnABoardId,
  apiGetCourseReviewByCourse,
} from "../../RestApi";
import { formatDateTime } from "../../Util/util";

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #212529;
  margin-bottom: 1rem;
  font-size: 40px;
  font-weight: bolder;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
`;

const Content = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  &.coursetable {
    overflow: auto;
  }
`;

const Columntitle = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
  color: #3182f6;
`;

const Contents = styled.div`
  &.course {
    display: flex;
  }
  &.courseReview {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    padding: 1rem;
  }
  &.qnalist {
    overflow-y: auto;
  }
`;

const UserNum = styled.div``;

const QnAs = styled.table``;
const QnA = styled.tr``;

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
        // 최신 QnA 3개만 가져오기
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

  // useEffect(() => {
  //   courses.forEach((course) => {
  //     apiGetQnABoardsByCourse(course.courseId).then(async (response) => {
  //       const fetchedQnas = response.data.data;
  //       await Promise.all(
  //         fetchedQnas.map((qna) => {
  //           return apiGetQnARepliesByQnABoardId(qna.qnaId).then((response) => {
  //             if (response.data.data.length > 0) {
  //               qna.replyId = response.data.data[0].replyId;
  //             }
  //           });
  //         })
  //       );
  //       setQnas(fetchedQnas);
  //     });
  //   });
  // }, [courses]);

  return (
    <>
      <Container>
        <Header>Dashboard</Header>
        <Body>
          <Content className="coursetable">
            <Columntitle>과정명</Columntitle>
            {courses.map((course, index) => (
              <Contents className="course" key={index}>
                {course.courseName}
                <UserNum>총 학생 수: </UserNum>
              </Contents>
            ))}
            <NavLink
              to={`/dashboard/${user.loginId}/students_manage`}
              style={{ textDecoration: "none" }}
            >
              상세보기
            </NavLink>
          </Content>

          {courses.map((course, index) => {
            if (!latestReviews[course.courseId]) {
              return null;
            }

            return (
              <Content className="coursetable" key={index}>
                <NavLink
                  to={`/dashboard/${user.loginId}/coursereview_manage`}
                  style={{ textDecoration: "none" }}
                >
                  <Columntitle>수강평</Columntitle>
                </NavLink>
                {latestReviews[course.courseId].map((review, i) => (
                  <Contents className="courseReview" key={i}>
                    <p>{review.member.name}</p>
                    <p>{review.comment}</p>
                    <p>{formatDateTime(review.reviewDate)}</p>
                  </Contents>
                ))}
              </Content>
            );
          })}
          <Content className="examlist">
            <NavLink
              to={`/dashboard/${user.loginId}/exam_manage`}
              style={{ textDecoration: "none" }}
            >
              <Columntitle>과제 리스트</Columntitle>
            </NavLink>
            <Contents>과제 1</Contents>
            <Contents>과제 2</Contents>
          </Content>
          <Content className="qnalist">
            <NavLink
              to={`/dashboard/${user.loginId}/qna_manage`}
              style={{ textDecoration: "none" }}
            >
              <Columntitle>QnA</Columntitle>
            </NavLink>
            <QnAs>
              <colgroup>
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 300 + "px" }} />
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 130 + "px" }} />
              </colgroup>
              {qnas
                .slice(0)
                .reverse()
                .map(
                  (
                    qna,
                    index // QnA 항목들을 역순으로 표시
                  ) => (
                    <QnA key={index}>
                      <td className="name">{qna.member.name}</td>
                      <td className="reviewText">{qna.questionText}</td>
                      <td className="time">
                        {formatDateTime(qna.createdAt)}
                        {qna.replyId ? (
                          <span>답변 완료</span>
                        ) : (
                          <NavLink to={`/dashboard/${user.loginId}/qna_manage`}>
                            답변하기
                          </NavLink>
                        )}
                      </td>
                    </QnA>
                  )
                )}
            </QnAs>
          </Content>
        </Body>
      </Container>
    </>
  );
}
