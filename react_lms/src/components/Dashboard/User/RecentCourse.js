import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { apiGetMyContentHistory } from "../../RestApi";
import { AuthContext } from "../../../AuthContext";
import { Icon } from "@iconify/react";
import { formatDateTimeStamp } from "../../Util/util";
import { CourseDetail } from "./../../Subject/CourseDetail";

const Container = styled.div``;

const StyledIcon = styled(Icon)``;
export function RecentCourse() {
  const { user } = useContext(AuthContext);
  const [contentHistories, setContentHistories] = useState([]);

  // contentHistory courseId로 그룹화 후 최신 content 조회
  useEffect(() => {
    apiGetMyContentHistory(user.memberId)
      .then((response) => {
        const grouped = response.data.data.reduce((acc, cur) => {
          if (
            !acc[cur.content.course.courseId] ||
            new Date(acc[cur.content.course.courseId].lastAccessed) <
              new Date(cur.lastAccessed)
          ) {
            acc[cur.content.course.courseId] = cur;
          }
          return acc;
        }, {});
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
          <div key={contentHistory.contentHistoryId}>
            <div>
              <StyledIcon icon="fontisto:folder"></StyledIcon>
              <p>
                [{contentHistory.content.course.subject.subjectName}]
                {contentHistory.content.course.courseName}
              </p>
            </div>
            <div>
              <div>
                <p>{contentHistory.content.contentTitle}</p>
                <p>({contentHistory.content.contentDuration}분)</p>
              </div>
              <div>
                <StyledIcon icon="zondicons:time"></StyledIcon>
                <p>{formatDateTimeStamp(contentHistory.lastAccessed)}</p>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
