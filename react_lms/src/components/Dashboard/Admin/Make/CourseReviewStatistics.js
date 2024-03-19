import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { apiGetAllCourseReviews } from '../../../RestApi';
import { Bar } from 'react-chartjs-2';

const Container = styled.div`
  margin-top: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  & h3 {
    padding-bottom: 1rem;
  }
  & .data {
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    & p {
      font-size: 13px;
    }
  }
`;

export function CourseReviewStatistics({ onTotalreviewsUpdate }) {
  const [courseReviews, setCourseReviews] = useState([]);
  const [reviewCountsByRating, setReviewCountsByRating] = useState({});

  useEffect(() => {
    apiGetAllCourseReviews()
      .then((response) => {
        const newCourseReviews = response.data.data;
        setCourseReviews(newCourseReviews);
        onTotalreviewsUpdate(newCourseReviews.length);
        console.log(newCourseReviews);

        // 코스 별 수강평 개수, 평균 평점
        const reviewCourseRatingData = courseReviewsByRating(newCourseReviews);
        setReviewCountsByRating(reviewCourseRatingData);
        console.log(reviewCourseRatingData);
      })
      .catch((err) => {
        console.log('수강평 조회 실패: ', err);
      });
  }, []);

  const courseReviewsByRating = (courseReviews) => {
    const ratingByCourse = courseReviews.reduce((acc, { course, rating }) => {
      const { courseId, courseName } = course;

      if (!acc[courseId]) {
        acc[courseId] = {
          courseName,
          ratingSum: 0,
          reviewCount: 0,
          averageRating: 0,
        };
      }

      acc[courseId].ratingSum += rating;
      acc[courseId].reviewCount += 1;
      acc[courseId].averageRating = (
        acc[courseId].ratingSum / acc[courseId].reviewCount
      ).toFixed(2);

      return acc;
    }, {});

    return ratingByCourse;
  };

  const chartData = () => {
    const courseLabels = Object.keys(reviewCountsByRating).map(
      (key) => reviewCountsByRating[key].courseName
    );
    const reviewCounts = Object.keys(reviewCountsByRating).map(
      (key) => reviewCountsByRating[key].reviewCount
    );
    const averageRatings = Object.keys(reviewCountsByRating).map(
      (key) => reviewCountsByRating[key].averageRating
    );

    return {
      labels: courseLabels,
      datasets: [
        {
          label: '평균 평점',
          data: averageRatings,
          type: 'line',
          fill: false,
          borderColor: '#FBE490',
          yAxisID: 'y-axis-2',
          pointStyle: 'circle',
          pointRadius: 3,
          pointBackgroundColor: '#FBE490',
        },
        {
          label: '리뷰 수',
          data: reviewCounts,
          backgroundColor: '#BCDCF1',
          yAxisID: 'y-axis-1',
        },
      ],
    };
  };

  const options = {
    scales: {
      x: {
        display: false,
      },
      'y-axis-1': {
        type: 'linear',
        position: 'left',
        ticks: {
          beginAtZero: true,
        },
        grid: {
          display: false,
        },
      },
      'y-axis-2': {
        type: 'linear',
        position: 'right',
        ticks: {
          beginAtZero: true,
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
  };

  return (
    <>
      <Container>
        <h3>강좌별 수강평 추이</h3>
        <div>
          <Bar data={chartData()} options={options} />
        </div>
        <div className="data">
          <p>수강평 수</p>
          <p>평균 레이팅</p>
        </div>
      </Container>
    </>
  );
}
