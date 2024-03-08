import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { apiGetMyContentHistory } from "../../RestApi";
import { AuthContext } from "../../../AuthContext";
import { Icon } from "@iconify/react";
import { formatDateTimeStamp } from "../../Util/util";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.5rem;
  & .recentCourses {
    display: flex;
    flex-direction: column;
    align-items: start;
    & .courses {
      font-size: 15px;
    }
    & .lastAccessed {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;

const StyledIcon = styled(Icon)``;

export function RecentCourse() {
  const { user } = useContext(AuthContext);
  const [contentHistories, setContentHistories] = useState([]);

  // courseId로 그룹화 후 최신 contentHistory 조회
  useEffect(() => {
    apiGetMyContentHistory(user.memberId)
      .then((response) => {
        const grouped = response.data.data.reduce((acc, cur) => {
          if (
            // courseId가 없거나 최신 접속 기록일 때
            !acc[cur.content.course.courseId] ||
            new Date(acc[cur.content.course.courseId].lastAccessed) <
              new Date(cur.lastAccessed)
          ) {
            acc[cur.content.course.courseId] = cur;
          }
          return acc;
        }, {});
        // 객체를 배열로 반환
        setContentHistories(Object.values(grouped));
      })
      .catch((err) => {
        console.log("유저 컨텐츠 이력 조회 실패 ", err);
      });
  }, [user]);

  return (
    <>
      <Container>
        {contentHistories.map((contentHistory) => (
          <div className="recentCourses" key={contentHistory.contentHistoryId}>
            <p className="courses">
              [{contentHistory.content.course.subject.subjectName}]
              {contentHistory.content.course.courseName}
            </p>
            <p>
              {contentHistory.content.contentTitle}(
              {contentHistory.content.contentDuration}분)
            </p>
            <div className="lastAccessed">
              <StyledIcon icon="zondicons:time"></StyledIcon>
              <p>{formatDateTimeStamp(contentHistory.lastAccessed)}</p>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
