import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Main } from './Main';
import { AboutMain } from './About/AboutMain';
import { LevelTestMain } from './Leveltest/LevelTestMain';
import { LevelTestStart } from './Leveltest/LevelTestStart';
import { LevelTestResult } from './Leveltest/LevelTestResult.js';
import { Event } from './Event';
import { Login } from './Login';
import { Register } from './Register';
import { Footer } from './Footer';
import styled from 'styled-components';
import { DashboardNavBar } from './Dashboard/DashboardNavBar.js';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { AccountInfo } from './Account/AccountInfo';
import { MyCourse } from './Dashboard/User/MyCourse';
import { CourseMain } from './Subject/CourseMain';
import { AdminCourseManage } from './Dashboard/Admin/AdminCourseManage';
import { AdminLevelTestManage } from './Dashboard/Admin/AdminLevelTestManage';
import { AdminNoticeManage } from './Dashboard/Admin/AdminNoticeManage';
import { AdminUserManage } from './Dashboard/Admin/AdminUserManage';
import { AdminPostManage } from './Dashboard/Admin/AdminPostManage';
import { TestSubject } from './TestSubject';
import { InstructorStudentsManage } from './Dashboard/Instructor/InstructorStudentsManage';
import { InstructorExamManage } from './Dashboard/Instructor/InstructorExamManage';
import { InstructorQnAManage } from './Dashboard/Instructor/InstructorQnAManage';
import { InstructorCourseReviewManage } from './Dashboard/Instructor/InstructorCourseReviewManage';
import { Dashboard } from './Dashboard/Dashboard';
import { Cart } from './Account/Cart';
import { AccountForm } from './Account/AccountForm';
import { PurchaseList } from './Dashboard/User/PurchaseList';
import { MyComment } from './Dashboard/User/MyComment';
import { CourseTitle } from './Subject/CourseTitle';
import { CourseDetail } from './Subject/CourseDetail.js';
import { AfterInquiries } from './Subject/MemberCourse/AfterInquiries.js';
import { CourseDescription } from './Subject/MemberCourse/CourseDescription.js';
import { Contact } from './Contact.js';
import { ContentComponent } from './Subject/MemberCourse/Contents/ContentComponent.js';
import { ExamAnswer } from './Subject/MemberCourse/Contents/Exam/ExamAnswer.js';
import { CourseCurriculem } from './Subject/CourseCurriculum.js';
import { Announcement } from './Communitiy/Announcement.js';
import { CourseReview } from './Communitiy/CourseReview.js';
import { HallofFame } from './Communitiy/HallofFame.js';
import { TodayResolutions } from './Communitiy/TodayResolutions.js';
import { InstructorExamQuestion } from './Dashboard/Instructor/InstructorExamQuestion.js';
import { MyExam } from './Dashboard/User/MyExam.js';
import { ContentExam } from './Dashboard/User/ContentExam.js';
import { MyCertificate } from './Dashboard/User/MyCertificate.js';
import { AdminContentManage } from './Dashboard/Admin/AdminContentManage.js';

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
  const { user } = useContext(AuthContext);
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
                  <Route path="/faq" element={<Contact />} />
                  <Route
                    path="/course/subject/:subjectId"
                    element={<CourseMain />}
                  />
                  <Route path="/course/:courseId" element={<CourseTitle />}>
                    <Route index element={<CourseDetail />} />
                    <Route
                      path="/course/:courseId/curriculum"
                      element={<CourseCurriculem />}
                    />
                    <Route path="afterinquiries" element={<AfterInquiries />} />
                    <Route
                      path="coursedescription"
                      element={<CourseDescription />}
                    />
                  </Route>
                  {user && (
                    <Route
                      path={`/dashboard/${user.loginId}`}
                      element={<DashboardNavBar />}
                    >
                      <Route index element={<Dashboard />} />
                      {/* instructor */}
                      <Route
                        path={`/dashboard/${user.loginId}/coursereview_manage`}
                        element={<InstructorCourseReviewManage />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/qna_manage`}
                        element={<InstructorQnAManage />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/exam_manage`}
                        element={<InstructorExamManage />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/exam_manage/:examId/question`}
                        element={<InstructorExamQuestion />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/students_manage`}
                        element={<InstructorStudentsManage />}
                      />
                      {/* admin */}
                      <Route
                        path={`/dashboard/${user.loginId}/course_manage`}
                        element={<AdminCourseManage />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/content_manage`}
                        element={<AdminContentManage />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/user_manage`}
                        element={<AdminUserManage />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/leveltest_manage`}
                        element={<AdminLevelTestManage />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/post_manage`}
                        element={<AdminPostManage />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/notice_manage`}
                        element={<AdminNoticeManage />}
                      />
                      {/* member */}
                      <Route
                        path={`/dashboard/${user.loginId}/courses`}
                        element={<MyCourse />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/exams`}
                        element={<MyExam />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/exams/:contentId`}
                        element={<ContentExam />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/mycomment`}
                        element={<MyComment />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/purchaselist`}
                        element={<PurchaseList />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/certificate`}
                        element={<MyCertificate />}
                      />
                      <Route
                        path={`/dashboard/${user.loginId}/account_info`}
                        element={<AccountInfo />}
                      />
                    </Route>
                  )}
                  ;
                  <Route path="/level_test" element={<LevelTestMain />} />
                  <Route
                    path="/level_test_start"
                    element={<LevelTestStart />}
                  />
                  <Route
                    path="/level_test_result"
                    element={<LevelTestResult />}
                  />
                  <Route path="/event" element={<Event />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/accountform" element={<AccountForm />} />
                  <Route path="/announcement" element={<Announcement />} />
                  <Route path="/coursereview" element={<CourseReview />} />
                  <Route path="/halloffame" element={<HallofFame />} />
                  <Route
                    path="/todayResolutions"
                    element={<TodayResolutions />}
                  />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/subject" element={<TestSubject />} />
                <Route
                  path="/course/:courseId/content/:contentId"
                  element={<ContentComponent />}
                />
                <Route
                  path="/course/:courseId/content/:contentId/exam/:examId"
                  element={<ExamAnswer />}
                />
              </Routes>
            </MainContent>
            <Footer />
          </ContentWrapper>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}
