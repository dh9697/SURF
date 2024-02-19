import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../AuthContext";
import {
  apiCreateExam,
  apiDeleteExam,
  apiGetAllCourses,
  apiGetContentByCourse,
  apiGetExamByContent,
  apiUpdateExam,
} from "../../RestApi";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  color: #454545;
`;

const Select = styled.select`
  padding: 10px;
  margin-top: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
`;

const Exam = styled.div`
  & .examTitle,
  .examContent {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    & .contentButton,
    .contentIcon {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const StyledNavLink = styled(NavLink)``;

export function InstructorExamManage() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [teachingCourses, setTeachingCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [contents, setContents] = useState([]);
  const [exams, setExams] = useState([]);

  // 코스 모두 조회
  useEffect(() => {
    apiGetAllCourses()
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error("코스 불러오기 오류: ", error);
      });
  }, []);

  // 조회한 코스 중 teachingCourse 조회
  useEffect(() => {
    const userTeachingCoursesIds = user.teachingCourses.map(
      (course) => course.courseId
    );
    const userTeachingCourses = courses.filter((course) =>
      userTeachingCoursesIds.includes(course.courseId)
    );
    setTeachingCourses(userTeachingCourses);
  }, [courses, user]);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  // selectedCourse에 따라 content 조회, content 당 exam 조회
  useEffect(() => {
    if (selectedCourse) {
      apiGetContentByCourse(selectedCourse)
        .then((response) => {
          setContents(response.data.data);

          let examsTemp = [];
          const fetchExams = async () => {
            for (let content of response.data.data) {
              const examResponse = await apiGetExamByContent(content.contentId);
              examsTemp.push(examResponse.data.data);
            }
            setExams(examsTemp);
          };
          console.log(examsTemp);
          fetchExams();
        })
        .catch((error) => {
          console.error("코스 컨텐츠 가져오기 오류: ", error);
        });
    }
  }, [selectedCourse]);

  // exam 생성 후 조회
  const handleCreateExam = (contentId) => {
    const examDto = {
      contentId: contentId,
    };
    apiCreateExam(examDto)
      .then(() => {
        let examsTemp = [];
        const fetchExams = async () => {
          for (let content of contents) {
            const response = await apiGetExamByContent(content.contentId);
            examsTemp.push(response.data.data);
          }
          setExams(examsTemp);
        };
        fetchExams();
      })
      .catch((error) => {
        console.error("시험 생성 오류: ", error);
      });
  };

  // 시험 수정
  const handleUpdateExam = (examId) => {
    const examDto = {
      examIsActive: true,
    };
    apiUpdateExam(examId, examDto)
      .then(() => {
        let examsTemp = [];
        const fetchExams = async () => {
          for (let content of contents) {
            const response = await apiGetExamByContent(content.contentId);
            examsTemp.push(response.data.data);
          }
          setExams(examsTemp);
        };
        fetchExams();
      })
      .catch((error) => {
        console.error("시험 수정 오류: ", error);
      });
  };

  // 시험 삭제
  const handleDeleteExam = (examId) => {
    apiDeleteExam(examId)
      .then(() => {
        let examsTemp = [];
        const fetchExams = async () => {
          for (let content of contents) {
            const response = await apiGetExamByContent(content.contentId);
            examsTemp.push(response.data.data);
          }
          setExams(examsTemp);
        };
        fetchExams();
      })
      .catch((error) => {
        console.error("시험 삭제 오류: ", error);
      });
  };

  return (
    <>
      <Container>
        <h1>시험 관리</h1>
        <Select onChange={handleCourseChange}>
          <option value="">강의 선택</option>
          {teachingCourses.map((course) => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseName}
            </option>
          ))}
        </Select>
        <Exam>
          {contents.map((content) => {
            const examArray = exams.find(
              (e) => e && e[0] && e[0].contentId === content.contentId
            );
            const exam = examArray ? examArray[0] : null;
            const hasExam = !!exam;
            const hasQuestions =
              hasExam && !!exam.examQuestions && exam.examQuestions.length > 0;

            return (
              <div className="examContent" key={content.contentId}>
                <div className="content">
                  <p>{content.contentTitle}</p>
                </div>
                <div className="contentButton">
                  {!hasExam && (
                    <button onClick={() => handleCreateExam(content.contentId)}>
                      시험 생성
                    </button>
                  )}
                  {hasExam && (
                    <StyledNavLink
                      to={`/dashboard/${user.loginId}/exam_manage/${exam.examId}/question`}
                    >
                      문제 관리
                    </StyledNavLink>
                  )}
                  {hasExam && (
                    <button onClick={() => handleDeleteExam(exam.examId)}>
                      시험 삭제
                    </button>
                  )}
                  {hasQuestions && (
                    <button onClick={() => handleUpdateExam(exam.examId)}>
                      시험 활성화
                    </button>
                  )}
                </div>
                <div className="contentIcon">
                  <Icon
                    icon={"codicon:circle-filled"}
                    color={hasExam ? "#3182f6" : "white"}
                  ></Icon>
                  <Icon
                    icon={"codicon:circle-filled"}
                    color={hasQuestions ? "#3182f6" : "white"}
                  ></Icon>
                  <Icon
                    icon={"codicon:circle-filled"}
                    color={exam?.examIsActive ? "#3182f6" : "white"}
                  ></Icon>
                </div>
              </div>
            );
          })}
        </Exam>
      </Container>
    </>
  );
}
