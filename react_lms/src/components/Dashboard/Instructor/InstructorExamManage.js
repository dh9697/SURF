import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../AuthContext';
import {
  apiCreateExam,
  apiDeleteExam,
  apiGetAllCourses,
  apiGetContentByCourse,
  apiGetExamByContent,
  apiUpdateExam,
} from '../../RestApi';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  color: #454545;
`;

const Select = styled.select`
  padding: 10px;
  margin: 1rem 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
`;

const Exam = styled.div`
  & table {
    width: 100%;
    border-collapse: collapse;
    & thead {
      & th {
        padding: 10px;
        background-color: #f3f3f3;
        &.contentTitle {
          width: 40%;
        }
      }
    }
    & tbody {
      & td {
        padding: 10px;
        border-bottom: 1px solid #f3f3f3;
        &.examButton {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          & button {
            color: #454545;
            border: 1px solid #ddd;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
            background-color: inherit;
            border-radius: 5px;
            padding: 5px;
            margin: 0 2rem;
            cursor: pointer;
          }
        }
        &.examIcon {
          & div {
            display: flex;
            align-items: center;
            justify-content: space-around;
            & .iconSize {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #454545;
  text-decoration: none;
`;

export function InstructorExamManage() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [teachingCourses, setTeachingCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [contents, setContents] = useState([]);
  const [exams, setExams] = useState([]);

  // 코스 모두 조회
  useEffect(() => {
    apiGetAllCourses()
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error('코스 불러오기 오류: ', error);
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
          console.error('코스 컨텐츠 가져오기 오류: ', error);
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
        console.error('시험 생성 오류: ', error);
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
        console.error('시험 수정 오류: ', error);
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
        console.error('시험 삭제 오류: ', error);
      });
  };

  return (
    <>
      <Container>
        <h2>시험 관리</h2>
        <Select onChange={handleCourseChange}>
          <option value="">강의 선택</option>
          {teachingCourses.map((course) => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseName}
            </option>
          ))}
        </Select>
        <Exam>
          <table>
            <thead>
              <tr>
                <th className="contentTitle">강의 이름</th>
                <th>시험 관리 버튼</th>
                <th>시험 관리 현황</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content, index) => {
                const examArray = exams.find(
                  (e) => e && e[0] && e[0].contentId === content.contentId
                );
                const exam = examArray ? examArray[0] : null;
                const hasExam = !!exam;
                const hasQuestions =
                  hasExam &&
                  !!exam.examQuestions &&
                  exam.examQuestions.length > 0;

                return (
                  <tr key={content.contentId}>
                    <td>
                      {index + 1}강 {content.contentTitle}
                    </td>
                    <td className="examButton">
                      {!hasExam && (
                        <button
                          onClick={() => handleCreateExam(content.contentId)}
                        >
                          시험 생성
                        </button>
                      )}
                      {hasExam && (
                        <button>
                          <StyledNavLink
                            to={`/dashboard/${user.loginId}/exam_manage/${exam.examId}/question`}
                          >
                            문제 관리
                          </StyledNavLink>
                        </button>
                      )}
                      {hasExam && (
                        <button onClick={() => handleDeleteExam(exam.examId)}>
                          시험 삭제
                        </button>
                      )}
                      {hasQuestions && (
                        <button
                          className="examActive"
                          onClick={() => handleUpdateExam(exam.examId)}
                        >
                          시험 활성화
                        </button>
                      )}
                    </td>
                    <td className="examIcon">
                      <div>
                        <Icon
                          className="iconSize"
                          icon={'codicon:circle-filled'}
                          color={hasExam ? '#3182f6' : '#f3f3f3'}
                        ></Icon>
                        <Icon
                          className="iconSize"
                          icon={'codicon:circle-filled'}
                          color={hasQuestions ? '#3182f6' : '#f3f3f3'}
                        ></Icon>
                        <Icon
                          className="iconSize"
                          icon={'codicon:circle-filled'}
                          color={exam?.examIsActive ? '#3182f6' : '#f3f3f3'}
                        ></Icon>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Exam>
      </Container>
    </>
  );
}
