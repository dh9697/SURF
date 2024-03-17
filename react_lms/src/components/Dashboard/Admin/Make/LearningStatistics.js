import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  apiGetAllContentHistories,
  apiGetAllCourseHistories,
} from "../../../RestApi";
import { Bar, Line } from "react-chartjs-2";

const Container = styled.div``;
export function LearningStatistics() {
  const [courseHistories, setCourseHistories] = useState([]);
  const [contentHistories, setContentHistories] = useState([]);
  const [courseMembers, setCourseMembers] = useState({});
  const [mostPopularCourse, setMostPopularCourse] = useState(null);
  const [monthlyPurchases, setMonthlyPurchases] = useState({});

  useEffect(() => {
    apiGetAllCourseHistories()
      .then((response) => {
        const newCourseHistories = response.data.data;
        setCourseHistories(newCourseHistories);
        console.log(newCourseHistories);

        // 코스별 수강 회원 수 계산
        const courseMembersData = calculateCourseMembers(newCourseHistories);
        setCourseMembers(courseMembersData);

        // 인기 코스
        setMostPopularCourse(findMostPopularCourse(courseMembersData));
        console.log(findMostPopularCourse(courseMembersData));

        // 월별 강의 구매 추이
        const monthlyPurchasesData =
          calculateMonthlyPurchases(newCourseHistories);
        setMonthlyPurchases(monthlyPurchasesData);
        console.log(monthlyPurchasesData);
      })
      .catch((err) => {
        console.log("코스히스토리 조회 실패: ", err);
      });

    apiGetAllContentHistories()
      .then((response) => {
        const newContentHistories = response.data.data;
        setContentHistories(newContentHistories);
        console.log(newContentHistories);

        // 수강률 좋은 course, content
        const highEngagementContents =
          analyzeContentHistories(newContentHistories);
        console.log(highEngagementContents);
      })
      .catch((err) => {
        console.log("컨텐츠 히스토리 정보 조회 실패: ", err);
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
      const month = new Date(history.startDate).getMonth() + 1; // 월 정보 (1-12)
      if (monthlyPurchases[month]) {
        monthlyPurchases[month] += 1;
      } else {
        monthlyPurchases[month] = 1;
      }
    });
    return monthlyPurchases;
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
        const contentName = history.content.contentName;
        if (contentEngagement[contentId]) {
          contentEngagement[contentId].memberCounts += 1;
        } else {
          contentEngagement[contentId] = {
            contentId,
            contentName,
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
        <p> total sales volume {courseHistories.length}개</p>

        <p>mostPopularCourse</p>
        <p>
          {mostPopularCourse?.courseName} {mostPopularCourse?.memberCount}명
        </p>
        <div>
          <Line
            data={{
              labels: Object.keys(courseMembers).map(
                (key) => courseMembers[key].courseName
              ),
              datasets: [
                {
                  label: "members",
                  data: Object.values(courseMembers).map(
                    (courseMember) => courseMember.memberCount
                  ),
                  fill: false,
                  borderColor: "#3182f6",
                  backgroundColor: "white",
                  tension: 0.1,
                  pointStyle: "circle",
                  pointRadius: 3,
                  pointBackgroundColor: "#3182f6",
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <p>V수강률이 좋은 content, course</p>
        <p>V월별 강의 구매 추이</p>
        <div>
          <Bar
            data={{
              labels: Object.keys(monthlyPurchases),
              datasets: [
                {
                  label: "월별 구매 수",
                  data: Object.values(monthlyPurchases), // 해당 월의 구매 수
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: {
                  display: true,
                },
              },
            }}
          />
        </div>
        <p>수료많은 course </p>
      </Container>
    </>
  );
}
