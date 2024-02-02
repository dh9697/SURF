import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Main } from "./Main";
import { AboutMain } from "./Homepage/About/AboutMain";
import { LevelTestMain } from "./LevelTestMain";
import { LevelTestStart } from "./LevelTestStart";
import { Event } from "./Event";
import { Login } from "./Login";
import { Register } from "./Register";
import { Footer } from "./Footer";
import styled from "styled-components";
import { DashboardNavBar } from "./DashboardNavBar";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { AccountInfo } from "./AccountInfo";
import { UserDashboard } from "./User/Dashboard/UserDashboard";
import { MyCourse } from "./User/Dashboard/MyCourse";
import { Course } from "./Course";
import { UserCourse } from "./UserCourse.js";
import { AdminDashboard } from "./Admin/AdminDashboard";
import { AdminDashboardSideBar } from "./Admin/AdminDashboardSideBar";
import { AdminCourseManage } from "./Admin/AdminCourseManage";
import { AdminLevelTestManage } from "./Admin/AdminLevelTestManage";
import { AdminNoticeManage } from "./Admin/AdminNoticeManage";
import { AdminPaymentManage } from "./Admin/AdminPaymentManage";
import { AdminPostManage } from "./Admin/AdminPostManage";
import { AdminPromotionManage } from "./Admin/AdminPromotionManage";
import { AdminStatsManage } from "./Admin/AdminStatsManage";
import { TestSubject } from "./TestSubject";
import { InstructorDashboardSideBar } from "./Instructor/InstructorDashboardSideBar";
import { InstructorDashboard } from "./Instructor/InstructorDashboard";
import { InstructorScheduleManage } from "./Instructor/InstructorScheduleManage";
import { InstructorStudentsManage } from "./Instructor/InstructorStudentsManage";
import { InstructorAssignmentManage } from "./Instructor/InstructorAssignmentManage";
import { InstructorExamManage } from "./Instructor/InstructorExamManage";
import { InstructorQnAManage } from "./Instructor/InstructorQnAManage";
import { InstructorCourseNoticeManage } from "./Instructor/InstructorCourseNoticeManage";
import { Dashboard } from "./Dashboard";
import { Cart } from "./Cart";
import { AccountForm } from "./AccountForm";
import { PurchaseList } from "./User/Dashboard/PurchaseList";
import { MyComment } from "./User/Dashboard/MyComment";
import { MyCertificate } from "./User/Dashboard/MyCertificate";
import { CourseSidebar } from "./CourseSidebar";
import { CourseTitle } from "./CourseTitle";
import { BeforeInquiries } from "./BeforeInquiries";
import { MemberCourse } from "./MemberCourse";
import { AfterInquiries } from "./AfterInquiries.js";
import { MemberCourseDescription } from "./MemberCourseDescription.js";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainContent = styled.div`
  flex: 1;
`;

export function Surf() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <ContentWrapper>
            <MainContent>
              <Routes>
                <Route path="/" element={<NavBar />}>
                  <Route index element={<Main />} />
                  <Route path="/about" element={<AboutMain />} />
                  <Route path="/course" element={<Course />} />
                  <Route path="/course/:courseId" element={<CourseTitle />}>
                    <Route index element={<MemberCourse />} />
                    <Route path="afterinquiries" element={<AfterInquiries />} />
                    <Route
                      path="coursedescription"
                      element={<MemberCourseDescription />}
                    />
                    {/* User 권한 course 상세 보기 > 권한 나눠야 함
                    <Route index element={<UserCourse />} />
                    <Route
                      path="beforeinquiries"
                      element={<BeforeInquiries />}
                    /> */}
                  </Route>
                  <Route path="/level_test" element={<LevelTestMain />} />
                  <Route path="/event" element={<Event />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/accountform" element={<AccountForm />} />
                  {/* 학생 Dashboard */}
                  {isLoggedIn && (
                    <Route
                      path={`/dashboard/${user.loginId}`}
                      element={<DashboardNavBar />}
                    >
                      <Route index element={<UserDashboard />} />
                      <Route
                        path={`/dashboard/${user.loginId}/courses`}
                        element={<MyCourse />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/account_info`}
                        element={<AccountInfo />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/purchaselist`}
                        element={<PurchaseList />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/mycomment`}
                        element={<MyComment />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/mycertificate`}
                        element={<MyCertificate />}
                      />
                    </Route>
                  )}
                  {/* 관리자 Dashboard */}
                  {isLoggedIn && (
                    <Route
                      path={`/dashboard/admin/${user.loginId}`}
                      element={<AdminDashboardSideBar />}
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route
                        path={`/dashboard/admin/${user.loginId}/course_manage`}
                        element={<AdminCourseManage />}
                      />
                      <Route
                        path={`/dashboard/admin/${user.loginId}/payment_manage`}
                        element={<AdminPaymentManage />}
                      />
                      <Route
                        path={`/dashboard/admin/${user.loginId}/leveltest_manage`}
                        element={<AdminLevelTestManage />}
                      />
                      <Route
                        path={`/dashboard/admin/${user.loginId}/post_manage`}
                        element={<AdminPostManage />}
                      />
                      <Route
                        path={`/dashboard/admin/${user.loginId}/promotion_manage`}
                        element={<AdminPromotionManage />}
                      />
                      <Route
                        path={`/dashboard/admin/${user.loginId}/notice_manage`}
                        element={<AdminNoticeManage />}
                      />
                      <Route
                        path={`/dashboard/admin/${user.loginId}/stats_manage`}
                        element={<AdminStatsManage />}
                      />
                    </Route>
                  )}
                  {/* 선생님 Dashboard */}
                  {isLoggedIn && (
                    <Route
                      path={`/dashboard/instructor/${user.loginId}`}
                      element={<InstructorDashboardSideBar />}
                    >
                      <Route index element={<InstructorDashboard />} />
                      <Route
                        path={`/dashboard/instructor/${user.loginId}/schedule_manage`}
                        element={<InstructorScheduleManage />}
                      />
                      <Route
                        path={`/dashboard/instructor/${user.loginId}/studenets_manage`}
                        element={<InstructorStudentsManage />}
                      />
                      <Route
                        path={`/dashboard/instructor/${user.loginId}/assignment_manage`}
                        element={<InstructorAssignmentManage />}
                      />
                      <Route
                        path={`/dashboard/instructor/${user.loginId}/exam_manage`}
                        element={<InstructorExamManage />}
                      />
                      <Route
                        path={`/dashboard/instructor/${user.loginId}/qna_manage`}
                        element={<InstructorQnAManage />}
                      />
                      <Route
                        path={`/dashboard/instructor/${user.loginId}/coursenotice_manage`}
                        element={<InstructorCourseNoticeManage />}
                      />
                    </Route>
                  )}
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/level_test_start" element={<LevelTestStart />} />
                <Route path="/subject" element={<TestSubject />} />
              </Routes>
            </MainContent>
            <Footer />
          </ContentWrapper>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}
