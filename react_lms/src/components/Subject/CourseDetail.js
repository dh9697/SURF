import styled from "styled-components";
import surf_logo from "../image/surf_logo.png";
import { Outlet, useParams } from "react-router-dom";
import { MemberCourse } from "./MemberCourse/MemberCourse";
import { UserCourse } from "./UserCourse/UserCourse";
import { CourseSidebar } from "./CourseSidebar";
import { CourseMenu } from "./CourseMenu";
import { useContext, useEffect, useState } from "react";
import { apiGetCourse, apiGetMyCourseHistroies } from "../RestApi";
import { AuthContext } from "../../AuthContext";

export function CourseDetail() {
  const { user } = useContext(AuthContext);
  const { courseId } = useParams();
  const [isMemberCourse, setIsMemberCourse] = useState(false);

  useEffect(() => {
    if (user) {
      apiGetMyCourseHistroies(user.memberId)
        .then((response) => {
          const courseHistories = response.data.data;
          console.log(courseHistories);
          if (
            courseHistories.some(
              ({ courseHistory }) =>
                courseHistory.course.courseId.toString() === courseId
            )
          )
            setIsMemberCourse(true);
        })
        .catch((error) => {
          console.error("코스 히스토리 불러오기 오류: ", error);
        });
    }
  }, [user, courseId]);

  return <>{isMemberCourse ? <MemberCourse /> : <UserCourse />}</>;
}
