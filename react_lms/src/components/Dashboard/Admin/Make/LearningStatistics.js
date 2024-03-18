import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  apiGetAllContentHistories,
  apiGetAllCourseHistories,
} from '../../../RestApi';
import { Bar, Line } from 'react-chartjs-2';

const Container = styled.div`
  & .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    margin-top: 1rem;
    & .gridItem {
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      & .monthly {
        padding-bottom: 2rem;
      }
      & .data {
        padding-bottom: 1rem;
        & .dataInfo {
          color: darkgray;
          font-size: 12px;
          padding-top: 3px;
          padding-bottom: 10px;
        }
      }
    }
  }
`;

const GraphContainer = styled.div``;

export function LearningStatistics({ onTotalVolumeUpdate }) {
  const [courseHistories, setCourseHistories] = useState([]);
  const [contentHistories, setContentHistories] = useState([]);
  const [courseMembers, setCourseMembers] = useState({});
  const [mostPopularCourse, setMostPopularCourse] = useState(null);
  const [monthlyPurchases, setMonthlyPurchases] = useState({});
  const [highestPurchasesDate, setHighestPurchasesDate] = useState(null);
  const [engagementContents, setEngagementContents] = useState({});

  useEffect(() => {
    apiGetAllCourseHistories()
      .then((response) => {
        const newCourseHistories = response.data.data;
        setCourseHistories(newCourseHistories);
        onTotalVolumeUpdate(newCourseHistories.length);

        // 코스별 수강 회원 수 계산
        const courseMembersData = calculateCourseMembers(newCourseHistories);
        setCourseMembers(courseMembersData);

        // 인기 코스
        setMostPopularCourse(findMostPopularCourse(courseMembersData));

        // 월별 강의 구매 추이
        const monthlyPurchasesData =
          calculateMonthlyPurchases(newCourseHistories);
        setMonthlyPurchases(monthlyPurchasesData);

        // 구매량 많은 월
        setHighestPurchasesDate(findHighestPurchaseMonth(monthlyPurchasesData));
      })
      .catch((err) => {
        console.log('코스히스토리 조회 실패: ', err);
      });

    apiGetAllContentHistories()
      .then((response) => {
        const newContentHistories = response.data.data;
        setContentHistories(newContentHistories);

        // 수강률 좋은 course, content
        const highEngagementContents =
          analyzeContentHistories(newContentHistories);
        setEngagementContents(highEngagementContents);
      })
      .catch((err) => {
        console.log('컨텐츠 히스토리 정보 조회 실패: ', err);
      });
  }, []);

  // 코스별 수강 회원 수 계산
  const calculateCourseMembers = (courseHistories) => {
    const courseMemberCount = {};
    courseHistories.forEach((history) => {
      const courseId = history.course.courseId;
      const courseName = history.course.courseName;
      if (courseMemberCount[courseId]) {
        courseMemberCount[courseId].memberCount += 1;
      } else {
        courseMemberCount[courseId] = { memberCount: 1, courseName };
      }
    });
    return courseMemberCount;
  };

  // 인기 강의
  const findMostPopularCourse = (courseMembers) => {
    let maxCount = 0;
    let mostPopular = null;
    Object.values(courseMembers).forEach((course) => {
      if (course.memberCount > maxCount) {
        maxCount = course.memberCount;
        mostPopular = course;
      }
    });

    return mostPopular;
  };

  // 월별 강의 구매 추이
  const calculateMonthlyPurchases = (courseHistories) => {
    const monthlyPurchases = {};
    courseHistories.forEach((history) => {
      const date = new Date(history.startDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const yearMonth = `${year}-${month}`;

      if (monthlyPurchases[yearMonth]) {
        monthlyPurchases[yearMonth] += 1;
      } else {
        monthlyPurchases[yearMonth] = 1;
      }
    });
    return monthlyPurchases;
  };

  // 최고 구매량 날짜
  const findHighestPurchaseMonth = (monthlyPurchases) => {
    let highestMonth = null;
    let highestPurchases = 0;
    Object.entries(monthlyPurchases).forEach(([yearMonth, purchase]) => {
      if (purchase > highestPurchases) {
        highestMonth = yearMonth;
        highestPurchases = purchase;
      }
    });
    return highestMonth;
  };

  // 수강률이 좋은 content-course 정보
  const analyzeContentHistories = (contentHistories) => {
    const courseEngagement = {};
    const contentEngagement = {};

    contentHistories.forEach((history) => {
      if (history.isCompleted) {
        const courseId = history.content.course.courseId;
        const courseName = history.content.course.courseName;
        if (courseEngagement[courseId]) {
          courseEngagement[courseId].memberCounts += 1;
        } else {
          courseEngagement[courseId] = {
            courseId,
            courseName,
            memberCounts: 1,
          };
        }
      }
    });

    contentHistories.forEach((history) => {
      if (history.isCompleted) {
        const contentId = history.content.contentId;
        const contentTitle = history.content.contentTitle;
        if (contentEngagement[contentId]) {
          contentEngagement[contentId].memberCounts += 1;
        } else {
          contentEngagement[contentId] = {
            contentId,
            contentTitle,
            memberCounts: 1,
          };
        }
      }
    });

    return { courseEngagement, contentEngagement };
  };

  return (
    <>
      <Container>
        <div className="grid">
          <div className="gridItem">
            <div className="data">
              <h3>월별 강의 구매량</h3>
              <p className="dataInfo">Highest purchases</p>
              <h2>{highestPurchasesDate}</h2>
            </div>
            <GraphContainer>
              {monthlyPurchases && (
                <Bar
                  data={{
                    labels: Object.keys(monthlyPurchases),
                    datasets: [
                      {
                        label: '구매량',
                        data: Object.values(monthlyPurchases),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          display: false,
                        },
                      },
                      x: {
                        ticks: {
                          display: false,
                        },
                        grid: {
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              )}
            </GraphContainer>
          </div>
          <div className="gridItem">
            <div className="data">
              <h3>{mostPopularCourse?.courseName}</h3>
              <p className="dataInfo">Most popular course</p>
              <h2>{mostPopularCourse?.memberCount} 명</h2>
            </div>
            <GraphContainer>
              <Bar
                data={{
                  labels: Object.keys(courseMembers).map(
                    (key) => courseMembers[key].courseName
                  ),
                  datasets: [
                    {
                      label: 'members',
                      data: Object.values(courseMembers).map(
                        (courseMember) => courseMember.memberCount
                      ),
                      backgroundColor: '#3182f6', // 바의 배경색
                      borderColor: '#3182f6', // 바의 테두리 색
                      borderWidth: 1, // 바 테두리의 두께
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: false,
                      },
                    },
                    x: {
                      ticks: {
                        display: false,
                      },
                      grid: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </GraphContainer>
          </div>
        </div>
        <div className="grid">
          <div className="gridItem">
            <div className="data">
              <h3>강좌별 수강 추이</h3>
            </div>
            <GraphContainer>
              {engagementContents && engagementContents.courseEngagement && (
                <Line
                  data={{
                    labels: Object.keys(
                      engagementContents.courseEngagement
                    ).map(
                      (key) =>
                        engagementContents.courseEngagement[key].courseName
                    ),
                    datasets: [
                      {
                        label: '강좌별 참여도',
                        data: Object.values(
                          engagementContents.courseEngagement
                        ).map((course) => course.memberCounts),
                        fill: false,
                        borderColor: '#3182f6',
                        backgroundColor: 'white',
                        tension: 0.1,
                        pointStyle: 'circle',
                        pointRadius: 3,
                        pointBackgroundColor: '#3182f6',
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          display: false,
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              )}
            </GraphContainer>
          </div>
          <div className="gridItem">
            <div className="data">
              <h3>강의별 수강 추이</h3>
            </div>
            <GraphContainer>
              {engagementContents && engagementContents.contentEngagement && (
                <Line
                  data={{
                    labels: Object.keys(
                      engagementContents.contentEngagement
                    ).map(
                      (key) =>
                        engagementContents.contentEngagement[key].contentTitle
                    ),
                    datasets: [
                      {
                        label: '강의별 참여도',
                        data: Object.values(
                          engagementContents.contentEngagement
                        ).map((content) => content.memberCounts),
                        fill: false,
                        borderColor: '#82ca9d',
                        backgroundColor: 'white',
                        tension: 0.1,
                        pointStyle: 'circle',
                        pointRadius: 3,
                        pointBackgroundColor: '#82ca9d',
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          display: false,
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              )}
            </GraphContainer>
          </div>
        </div>
      </Container>
    </>
  );
}
