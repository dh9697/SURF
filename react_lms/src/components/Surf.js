import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Main } from "./Main";
import { About } from "./About";
import { LevelTestMain } from "./LevelTestMain";
import { LevelTestStart } from "./LevelTestStart";
import { Community } from "./Community";
import { Event } from "./Event";
import { Login } from "./Login";
import { Register } from "./Register";
import { Footer } from "./Footer";
import styled from "styled-components";
import { DashboardNavBar } from "./DashboardNavBar";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { AccountInfo } from "./AccountInfo";
import { Dashboard } from "./Dashboard";
import { MyCourse } from "./MyCourse";
import { Course } from "./Course";
import { Contact } from "./Contact";
import { AdminDashboard } from "./AdminDashboard";
import { AdminDashboardSideBar } from "./AdminDashboardSideBar";
import { AdminCourseManage } from "./AdminCourseManage";
import { AdminLevelTestManage } from "./AdminLevelTestManage";
import { AdminNoticeManage } from "./AdminNoticeManage";
import { AdminPaymentManage } from "./AdminPaymentManage";
import { AdminPostManage } from "./AdminPostManage";
import { AdminPromotionManage } from "./AdminPromotionManage";
import { AdminStatsManage } from "./AdminStatsManage";
import { TestSubject } from "./TestSubject";
import { InstructorDashboardSideBar } from "./InstructorDashboardSideBar";
import { InstructorDashboard } from "./InstructorDashboard";
import { InstructorScheduleManage } from "./InstructorScheduleManage";
import { InstructorStudentsManage } from "./InstructorStudentsManage";
import { InstructorAssignmentManage } from "./InstructorAssignmentManage";
import { InstructorExamManage } from "./InstructorExamManage";
import { InstructorQnAManage } from "./InstructorQnAManage";
import { InstructorCourseNoticeManage } from "./InstructorCourseNoticeManage";

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
                  <Route path="/about" element={<About />} />
                  <Route path="/course" element={<Course />} />
                  <Route path="/level_test" element={<LevelTestMain />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/event" element={<Event />} />
                  <Route path="/contact" element={<Contact />} />
                  {/* 학생 Dashboard */}
                  {isLoggedIn && (
                    <Route
                      path={`/dashboard/${user.loginId}`}
                      element={<DashboardNavBar />}
                    >
                      <Route index element={<Dashboard />} />
                      <Route
                        path={`/dashboard/${user.loginId}/courses`}
                        element={<MyCourse />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/account_info`}
                        element={<AccountInfo />}
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
