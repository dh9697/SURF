import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import {
  apiGetCompletedContentHistories,
  apiGetContentByCourse,
  apiGetExamByContent,
  apiGetMyCourseHistroies,
  apiGetMyExamHistory,
} from "../../RestApi";
import { AuthContext } from "../../../AuthContext";
import sample from "../../image/Thumbnail.jpg";
import { formatDateTimeStamp } from "../../Util/util";
import { Icon } from "@iconify/react";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const Course = styled.div`
  & h2 {
    padding-bottom: 1rem;
  }
  & .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    max-height: 650px;
    overflow: auto;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 2rem;
  & .contentTitle {
    font-size: 16px;
    font-weight: 900;
  }
  & .lastAccessed {
    position: relative;
    margin-bottom: 3rem;
    span {
      position: absolute;
      top: 140%;
      left: 0;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 13px;
    }
  }
  & .contentButtons {
    display: flex;
    justify-content: space-around;
    & .completedContent {
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      color: #fff;
      background-color: #3182f6;
    }
  }
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  border-radius: 5px;
  padding: 5px 15px;
  color: #fff;
  background-color: #3182f6;
`;

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

        const examPromises = response.data.data.map((contentHistory) =>
          apiGetExamByContent(contentHistory.content.contentId)
        );

        Promise.all(examPromises)
          .then((examResponses) => {
            const completedContentExams = examResponses.flatMap(
              (response) => response.data.data
            );
            setExams(completedContentExams);
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
              <h2>{myCourseHistory.courseHistory.course.courseName}</h2>
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
                        <NavLink
                          to={`/course/${content.course.courseId}/content/${content.contentId}`}
                          className="image"
                          style={{ width: "200px", margin: "0 auto" }}
                        >
                          <img src={sample} style={{ width: "100%" }} />
                        </NavLink>
                        <p className="contentTitle">{content.contentTitle}</p>
                        {completed ? (
                          <div>
                            <p className="lastAccessed">
                              최근 수강 기록
                              <span>
                                <Icon icon="zondicons:time"></Icon>
                                {formatDateTimeStamp(completed.lastAccessed)}
                              </span>
                            </p>
                            <div className="contentButtons">
                              <button className="completedContent">
                                수강완료
                              </button>
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
                        ) : (
                          <p>최근 수강 기록이 없습니다.</p>
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
