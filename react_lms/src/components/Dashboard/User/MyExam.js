import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import {
  apiGetCompletedContentHistories,
  apiGetContentByCourse,
  apiGetExamByContent,
  apiGetMyCourseHistroies,
  apiGetMyExamHistory,
  apiGetMyExamResult,
} from "../../RestApi";
import { AuthContext } from "../../../AuthContext";
import sample from "../../image/Thumbnail.jpg";
import { formatDateTimeStamp } from "../../Util/util";

const Container = styled.div`
  width: 100%;
`;
const Course = styled.div`
  & .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
`;
const Content = styled.div`
  background-color: beige;
`;
const StyledNavLink = styled(NavLink)``;

export function MyExam() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;
  const [myCourseHistories, setMyCourseHistories] = useState([]);
  const [contents, setContents] = useState([]);
  const [completedContent, setCompletedContent] = useState([]);
  const [exams, setExams] = useState([]);
  const [examHistories, setExamHistories] = useState([]);

  // 수강 강의 조회 및 강의 컨텐츠 조회
  useEffect(() => {
    apiGetMyCourseHistroies()
      .then((response) => {
        setMyCourseHistories(response.data.data);
        const contentPromises = response.data.data.map((courseHistoryDto) =>
          apiGetContentByCourse(courseHistoryDto.courseHistory.course.courseId)
        );

        Promise.all(contentPromises)
          .then((contentResponses) => {
            const myCourseContents = contentResponses.flatMap(
              (response) => response.data.data
            );
            setContents(myCourseContents);
          })
          .catch((err) => {
            console.log("수강중인 강의 컨텐츠 조회 실패 ", err);
          });
      })
      .catch((err) => {
        console.log("수강중인 강의 조회 실패 ", err);
      });
  }, []);

  // 완료한 컨텐츠 조회 및 해당 시험 조회
  useEffect(() => {
    apiGetCompletedContentHistories(memberId)
      .then((response) => {
        setCompletedContent(response.data.data);
        console.log(response.data.data);

        const examPromises = response.data.data.map((contentHistory) =>
          apiGetExamByContent(contentHistory.content.contentId)
        );

        Promise.all(examPromises)
          .then((examResponses) => {
            const completedContentExams = examResponses.flatMap(
              (response) => response.data.data
            );
            setExams(completedContentExams);
            console.log(completedContentExams);
          })
          .catch((err) => {
            console.log("완료한 컨텐츠 시험 조회 실패 ", err);
          });
      })
      .catch((err) => {
        console.log("완료한 컨텐츠 불러오기 실패: ", err);
      });
  }, [memberId]);

  // 유저의 시험 이력 조회
  useEffect(() => {
    apiGetMyExamHistory(memberId)
      .then((response) => {
        setExamHistories(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log("유저의 시험 이력 조회 실패 ", err);
      });
  }, [memberId]);

  return (
    <>
      <Container>
        {myCourseHistories && myCourseHistories.length > 0 ? (
          myCourseHistories.map((myCourseHistory) => (
            <Course key={myCourseHistory.courseHistory.courseHistoryId}>
              <h3>{myCourseHistory.courseHistory.course.courseName}</h3>
              <div className="grid">
                {contents
                  .filter(
                    (content) =>
                      content.course.courseId ===
                      myCourseHistory.courseHistory.course.courseId
                  )
                  .map((content) => {
                    const completed =
                      completedContent &&
                      completedContent.find(
                        (completedItem) =>
                          completedItem.content.contentId === content.contentId
                      );
                    const exam =
                      exams &&
                      exams.find(
                        (examItem) =>
                          examItem && examItem.contentId === content.contentId
                      );
                    const examHistory =
                      examHistories &&
                      examHistories.find(
                        (examHistoryItem) =>
                          examHistoryItem.exam.contentId === content.contentId
                      );
                    return (
                      <Content key={content.contentId}>
                        <div className="image" style={{ width: "200px" }}>
                          <img src={sample} style={{ width: "100%" }} />
                        </div>
                        <p>{content.contentTitle}</p>
                        {completed && (
                          <div>
                            <p>
                              최근 수강
                              {formatDateTimeStamp(completed.lastAccessed)}
                            </p>
                            <p>{completed.isCompleted ? "수강완료" : ""}</p>
                            <div>
                              {exam && (
                                <>
                                  {examHistory &&
                                  examHistory.examCompletionStatus ? (
                                    <StyledNavLink
                                      to={`/dashboard/${user.loginId}/exams/${content.contentId}`}
                                    >
                                      시험 결과 보기
                                    </StyledNavLink>
                                  ) : (
                                    exam.examIsActive && (
                                      <StyledNavLink
                                        to={`/dashboard/${user.loginId}/exams/${content.contentId}`}
                                      >
                                        과제 풀기
                                      </StyledNavLink>
                                    )
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </Content>
                    );
                  })}
              </div>
            </Course>
          ))
        ) : (
          <div>
            <h2>내 과제</h2>
            <p>강의를 구매해주세요.</p>
          </div>
        )}
      </Container>
    </>
  );
}
