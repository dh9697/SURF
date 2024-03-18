import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { apiGetAllCourseReviews } from '../../../RestApi';
import { Bar } from 'react-chartjs-2';

const Container = styled.div``;

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
          label: '리뷰 수',
          data: reviewCounts,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          yAxisID: 'y-axis-1',
        },
        {
          label: '평균 평점',
          data: averageRatings,
          type: 'line',
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
          yAxisID: 'y-axis-2',
        },
      ],
    };
  };

  const options = {
    scales: {
      'y-axis-1': {
        type: 'linear',
        position: 'left',
        ticks: {
          beginAtZero: true,
        },
      },
      'y-axis-2': {
        type: 'linear',
        position: 'right',
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <Container>
        <div>
          <Bar data={chartData()} options={options} />
        </div>
      </Container>
    </>
  );
}
