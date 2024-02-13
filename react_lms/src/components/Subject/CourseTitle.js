import styled from "styled-components";
import thumbnail from "../image/Toeic.jpg";
import { Outlet, useParams } from "react-router-dom";
import { MemberCourse } from "./MemberCourse/MemberCourse";
import { UserCourse } from "./UserCourse/UserCourse";
import { CourseSidebar } from "./CourseSidebar";
import { CourseMenu } from "./CourseMenu";
import { useContext, useEffect, useState } from "react";
import {
  apiGetCourse,
  apiGetCourseHistroiesByCourse,
  apiGetCourseReviewByCourse,
  apiGetMyCourseHistroies,
} from "../RestApi";
import { AuthContext } from "../../AuthContext";
import { Icon } from "@iconify/react";
import { StarRating } from "../Util/util";

const Container = styled.div`
  width: 100%;
  background-color: #f3f3f3;
  padding: 30px;

  & .innerWrapper {
    display: grid;
    grid-template-columns: 2fr 3fr;
  }
`;

const ImgBox = styled.div`
  width: 100%;
  padding: 1rem 0;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const CourseInfo = styled.div`
  color: #454545;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  & .box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    & .instructorNames {
      font-weight: 900;
    }
    & .highlight {
      font-weight: 900;
    }
  }
`;

const StyledIcon = styled(Icon)`
  font-size: 1rem;
`;
const ContentWrapper = styled.div`
  & .innerWrapper {
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 2rem 0;
  }
`;
const SideBarWrapper = styled.div`
  width: 100%;
  height: 500px;
  position: sticky;
  top: 8%;
  padding: 0 2rem;
`;

export function CourseTitle() {
  const { user } = useContext(AuthContext);
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [isMemberCourse, setIsMemberCourse] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [courseHistories, setCourseHistories] = useState([]);

  // 해당 강의 정보 조회
  useEffect(() => {
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("강의 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  // 수강자 확인
  useEffect(() => {
    if (user) {
      apiGetMyCourseHistroies(user.memberId)
        .then((response) => {
          const courseHistories = response.data.data;
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

  // course로 courseHistory 조회 하고 수강자 확인?
  // useEffect(() => {
  //   apiGetCourseHistroiesByCourse(courseId).then((response) => {
  //     setCourseHistories(response.data.data);
  //     console.log(response.data.data);
  //   });
  // }, [courseId]);

  // 해당 강의 리뷰 조회
  useEffect(() => {
    apiGetCourseReviewByCourse(courseId).then((response) => {
      setReviews(response.data.data);
    });
  }, [courseId]);

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return (
    <>
      <Container>
        <div className="innerWrapper">
          <ImgBox>
            <Img src={thumbnail} alt="Sample"></Img>
          </ImgBox>
          <CourseInfo>
            <div className="box">
              <h3>Course</h3>
              <StyledIcon icon={"mingcute:right-line"}></StyledIcon>
              <h3>{course.subject && course.subject.subjectName}</h3>
            </div>
            <h1>{course.courseName}</h1>
            <div className="box">
              <Icon icon={"material-symbols:person"}></Icon>
              <p className="instructorNames">{course.instructorNames}</p>
            </div>
            <div className="box">
              <Icon icon={"carbon:skill-level-advanced"}></Icon>
              <p>{course.contentLevel}</p>
            </div>
            <div className="box">
              <Icon icon={"zondicons:time"}></Icon>
              <p>총 {course.durationMins}분 </p>
            </div>
            <div className="box">
              <StarRating averageRating={averageRating} />
              <p>
                <span className="highlight">{reviews?.length}</span>개의 수강평
              </p>
              <p>(가능하면)명의 수강생</p>
            </div>
          </CourseInfo>
        </div>
      </Container>
      <CourseMenu isMemberCourse={isMemberCourse} />
      <ContentWrapper>
        <div className="innerWrapper">
          <Outlet isMemberCourse={isMemberCourse} />
          <SideBarWrapper>
            <CourseSidebar />
          </SideBarWrapper>
        </div>
      </ContentWrapper>
    </>
  );
}
