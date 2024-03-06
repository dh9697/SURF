import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { apiGetMyCourseHistroies } from "../../RestApi";
import { formatDateTime, formatDateTimeStamp } from "../../Util/util";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  color: #454545;
  & .courseBox {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #454545;
`;

const CourseThumbnail = styled.div`
  width: 300px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

export function MyCourse() {
  const { user } = useContext(AuthContext);
  const [courseHistoryDtos, setCourseHistoryDtos] = useState([]);

  useEffect(() => {
    apiGetMyCourseHistroies().then((response) => {
      setCourseHistoryDtos(response.data.data);
    });
  }, []);

  return (
    <>
      <Container>
        {courseHistoryDtos.map((courseHistoryDto) => (
          <div
            key={courseHistoryDto.courseHistory.courseHistoryId}
            className="courseBox"
          >
            <CourseThumbnail>
              <img
                src={`${courseHistoryDto.courseHistory.course.courseThumbnail}`}
                alt="코스 썸네일 이미지"
              />
            </CourseThumbnail>
            <StyledNavLink
              to={`/course/${courseHistoryDto.courseHistory.course.courseId}`}
              style={{ textDecoration: "none" }}
            >
              <h2>
                [{courseHistoryDto.courseHistory.course.subject.subjectName}]{" "}
                {courseHistoryDto.courseHistory.course.courseName}
              </h2>
            </StyledNavLink>
            <p>
              Start Date:{" "}
              {formatDateTime(courseHistoryDto.courseHistory.startDate)}
            </p>
            <p>
              End Date: {formatDateTime(courseHistoryDto.courseHistory.endDate)}
            </p>
            <p>
              총 {courseHistoryDto.totalContents} 강,{" "}
              {courseHistoryDto.courseHistory.course.durationMins}분
            </p>

            <p>
              수료증:{" "}
              {courseHistoryDto.courseHistory.contentStatus
                ? "발급 완료"
                : "미수료"}
            </p>
            <StyledNavLink
              to={`/course/${courseHistoryDto.courseHistory.course.courseId}/coursedescription`}
              style={{ textDecoration: "none" }}
            >
              수강평 남기러 가기
            </StyledNavLink>
          </div>
        ))}
      </Container>
    </>
  );
}
