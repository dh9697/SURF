import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthContext';
import {
  apiGetCompletedContentHistories,
  apiGetContentByCourse,
  apiGetCourseHistroiesByCourse,
  apiGetMyExamHistory,
} from '../../RestApi';
import { Bar } from 'react-chartjs-2';

const Container = styled.div`
  color: #454545;
  & .studentData {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
`;
const Course = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #f3f3f3;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
`;
const Select = styled.select`
  padding: 10px;
  margin: 1rem 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
`;
const UserTable = styled.table``;
const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
`;
const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const BarContainer = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;
`;

export function InstructorStudentsManage() {
  const { user } = useContext(AuthContext);
  const courses = user.teachingCourses;
  const [courseHistories, setCourseHistories] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const selectedCourse = courses.find(
    (course) => course.courseId === parseInt(selectedCourseId)
  );
  const [examHistories, setExamHistories] = useState([]);
  const [contents, setContents] = useState([]);
  const [contentHistories, setContentHistories] = useState([]);

  const handleSelectChange = (e) => {
    setSelectedCourseId(e.target.value);
  };

  // 코스히스토리 조회 및 시험 진도율
  useEffect(() => {
    const fetchCourseHistories = async () => {
      if (!selectedCourseId) return;
      try {
        const response = await apiGetCourseHistroiesByCourse(selectedCourseId);
        setCourseHistories(response.data.data);
        console.log(response.data.data);

        const examHistoryPromises = response.data.data.map((courseHistory) =>
          apiGetMyExamHistory(courseHistory.member.memberId).then(
            (examHistoryResponse) => ({
              memberId: courseHistory.member.memberId,
              memberExamHistories: examHistoryResponse.data.data?.filter(
                (examHistory) => examHistory.examCompletionStatus === true
              ),
            })
          )
        );

        Promise.all(examHistoryPromises).then((newExamHistories) => {
          setExamHistories(newExamHistories);
          console.log(newExamHistories);
        });
      } catch (err) {
        console.log('코스 이력 조회 실패 : ', err);
      }
    };

    fetchCourseHistories();
  }, [selectedCourseId]);

  // content 정보 조회
  useEffect(() => {
    if (!selectedCourseId) return;
    apiGetContentByCourse(selectedCourseId)
      .then((response) => {
        setContents(response.data.data);
      })
      .catch((err) => {
        console.log('컨텐츠 조회 실패: ', err);
      });
  }, [selectedCourseId]);

  // 컨텐츠 히스토리 조회 및 수강 진도율
  useEffect(() => {
    const fetchContentHistories = async () => {
      if (!selectedCourseId || courseHistories.length === 0) return;
      try {
        const contentResultsPromises = courseHistories.map((courseHistory) =>
          apiGetCompletedContentHistories(courseHistory.member.memberId).then(
            (contentResultResponse) => ({
              memberId: courseHistory.member.memberId,
              completedContentHistories: contentResultResponse.data.data.filter(
                (history) =>
                  contents.some(
                    (content) => content.contentId === history.content.contentId
                  )
              ),
            })
          )
        );

        Promise.all(contentResultsPromises).then((newContentResults) => {
          setContentHistories(newContentResults);
          console.log(newContentResults);
        });
      } catch (err) {
        console.log('컨텐츠 불러오기 실패: ', err);
      }
    };

    fetchContentHistories();
  }, [selectedCourseId, courseHistories]);

  // 강의 당 전체 수강생의 수강, 시험 진도율
  const contentCompletionRate = contents.map((content) => {
    const completedContentsCount = contentHistories.filter((history) =>
      history.completedContentHistories?.some(
        (completedContent) =>
          completedContent.content.contentId === content.contentId
      )
    ).length;

    const completedExamsCount = examHistories.filter((exam) =>
      exam.memberExamHistories?.some(
        (examHistory) => examHistory.exam.contentId === content.contentId
      )
    ).length;

    return {
      contentId: content.contentId,
      completedContentsRate: (
        (completedContentsCount / courseHistories.length) *
        100
      ).toFixed(2),
      completedExamsRate: (
        (completedExamsCount / courseHistories.length) *
        100
      ).toFixed(2),
    };
  });
  console.log(contentCompletionRate);

  return (
    <>
      <Container>
        <h1>학생 관리</h1>
        <Select onChange={handleSelectChange}>
          <option value="">강의 선택</option>
          {courses.map((course) => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseName}
            </option>
          ))}
        </Select>
        <Course>
          <p>
            {selectedCourse
              ? selectedCourse.subject?.subjectName
              : '강의를 선택해주세요.'}
          </p>
          <p>{selectedCourse ? selectedCourse.courseName : null}</p>
          <p>
            {selectedCourse
              ? '총 강의 시간: ' + selectedCourse.durationMins + '분'
              : null}
          </p>
          <p>
            {selectedCourse
              ? '총 수강자 수: ' + courseHistories.length + '명'
              : null}
          </p>
        </Course>
        <div className="studentData">
          <UserTable>
            <thead>
              <tr>
                <Th>학생 이름</Th>
                <Th>성별</Th>
                <Th>수료증</Th>
                <Th>수강 진도율</Th>
                <Th>시험 진도율</Th>
              </tr>
            </thead>
            <tbody>
              {courseHistories.map((courseHistory) => {
                const studentExamResult = examHistories.find(
                  (result) => result.memberId === courseHistory.member.memberId
                );
                const studentContentHistory = contentHistories.find(
                  (history) =>
                    history.memberId === courseHistory.member.memberId
                );
                // 학생 수강 진도율
                const examProgressRate =
                  studentExamResult && studentExamResult.memberExamHistories
                    ? (
                        (studentExamResult.memberExamHistories.length /
                          contents.length) *
                        100
                      ).toFixed(2)
                    : 0;
                // 학생 시험 진도율
                const contentProgressRate =
                  studentContentHistory &&
                  studentContentHistory.completedContentHistories
                    ? (
                        (studentContentHistory.completedContentHistories
                          .length /
                          contents.length) *
                        100
                      ).toFixed(2)
                    : 0;
                return (
                  <tr key={courseHistory.courseHistoryId}>
                    <Td>{courseHistory.member.name}</Td>
                    <Td>{courseHistory.member.gender}</Td>
                    <Td>{courseHistory.contentStatus ? '완료' : '미완료'}</Td>
                    <Td>{contentProgressRate}%</Td>
                    <Td>{examProgressRate}%</Td>
                  </tr>
                );
              })}
            </tbody>
          </UserTable>
          <BarContainer>
            <h2>강의 컨텐츠 별 진도율</h2>
            <Bar
              data={{
                labels: contents.map((content) => content.contentTitle),
                datasets: [
                  {
                    label: '수강률',
                    data: contentCompletionRate.map(
                      (rate) => rate.completedContentsRate
                    ),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                  },
                  {
                    label: '시험률',
                    data: contentCompletionRate.map(
                      (rate) => rate.completedExamsRate
                    ),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                indexAxis: 'y',
                scales: {
                  x: {
                    min: 0,
                    max: 100,
                    ticks: {
                      callback: function (value) {
                        return value + ' %';
                      },
                    },
                  },
                },
                plugins: {
                  // 복습하기
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        var label = context.dataset.label || '';

                        if (label) {
                          label += ': ';
                        }
                        if (context.parsed.x !== null) {
                          label += context.parsed.x + ' %';
                        }
                        return label;
                      },
                    },
                  },
                },
              }}
            />
          </BarContainer>
        </div>
      </Container>
    </>
  );
}
