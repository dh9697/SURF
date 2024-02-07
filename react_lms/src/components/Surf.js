import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Main } from "./Main";
import { AboutMain } from "./About/AboutMain";
import { LevelTestMain } from "./Leveltest/LevelTestMain";
import { LevelTestStart } from "./Leveltest/LevelTestStart";
import { Event } from "./Event";
import { Login } from "./Login";
import { Register } from "./Register";
import { Footer } from "./Footer";
import styled from "styled-components";
import { DashboardNavBar } from "./Dashboard/DashboardNavBar";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { AccountInfo } from "./Account/AccountInfo";
import { UserDashboard } from "./Dashboard/User/UserDashboard.js";
import { MyCourse } from "./Dashboard/User/MyCourse";
import { CourseMain } from "./Subject/CourseMain";
import { UserCourse } from "./Subject/UserCourse/UserCourse.js";
import { AdminDashboard } from "./Dashboard/Admin/AdminDashboard";
import { AdminDashboardSideBar } from "./Dashboard/Admin/AdminDashboardSideBar";
import { AdminCourseManage } from "./Dashboard/Admin/AdminCourseManage";
import { AdminLevelTestManage } from "./Dashboard/Admin/AdminLevelTestManage";
import { AdminNoticeManage } from "./Dashboard/Admin/AdminNoticeManage";
import { AdminPaymentManage } from "./Dashboard/Admin/AdminPaymentManage";
import { AdminPostManage } from "./Dashboard/Admin/AdminPostManage";
import { AdminPromotionManage } from "./Dashboard/Admin/AdminPromotionManage";
import { AdminStatsManage } from "./Dashboard/Admin/AdminStatsManage";
import { TestSubject } from "./TestSubject";
import { InstructorDashboardSideBar } from "./Dashboard/Instructor/InstructorDashboardSideBar";
import { InstructorDashboard } from "./Dashboard/Instructor/InstructorDashboard";
import { InstructorScheduleManage } from "./Dashboard/Instructor/InstructorScheduleManage";
import { InstructorStudentsManage } from "./Dashboard/Instructor/InstructorStudentsManage";
import { InstructorAssignmentManage } from "./Dashboard/Instructor/InstructorAssignmentManage";
import { InstructorExamManage } from "./Dashboard/Instructor/InstructorExamManage";
import { InstructorQnAManage } from "./Dashboard/Instructor/InstructorQnAManage";
import { InstructorCourseNoticeManage } from "./Dashboard/Instructor/InstructorCourseNoticeManage";
import { Dashboard } from "./Dashboard/Dashboard";
import { Cart } from "./Account/Cart";
import { AccountForm } from "./Account/AccountForm";
import { PurchaseList } from "./Dashboard/User/PurchaseList";
import { MyComment } from "./Dashboard/User/MyComment";
import { MyCertificate } from "./Dashboard/User/MyCertificate";
import { CourseSidebar } from "./Subject/CourseSidebar";
import { CourseTitle } from "./Subject/CourseTitle";
import { BeforeInquiries } from "./Subject/UserCourse/BeforeInquiries";
import { MemberCourse } from "./Subject/MemberCourse/MemberCourse";
import { AfterInquiries } from "./Subject/MemberCourse/AfterInquiries.js";
import { CourseDescription } from "./Subject/MemberCourse/CourseDescription.js";
import { CourseReview } from "./Communitiy/CourseReview.js";
import { HallofFame } from "./Communitiy/HallofFame.js";
import { TodayResolutions } from "./Communitiy/TodayResolutions.js";
import { FAQ } from "./FAQ.js";

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
                  <Route path="/course" element={<CourseMain />} />
                  <Route
                    path="/course/subject/:subjectId"
                    element={<CourseMain />}
                  />
                  <Route path="/course/:courseId" element={<CourseTitle />}>
                    <Route index element={<MemberCourse />} />
                    <Route path="afterinquiries" element={<AfterInquiries />} />
                    <Route
                      path="coursedescription"
                      element={<CourseDescription />}
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
                  <Route
                    path="/community/resolutions"
                    element={<TodayResolutions />}
                  />
                  <Route
                    path="/community/halloffame"
                    element={<HallofFame />}
                  />
                  <Route path="/community/reviews" element={<CourseReview />} />
                  <Route path="/faq" element={<FAQ />} />
                  {/* 학생 Dashboard */}
                  {user && (
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
                  {user && (
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
                  {user && (
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
