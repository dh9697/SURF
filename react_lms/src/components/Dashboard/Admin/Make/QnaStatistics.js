import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { apiGetAllQnABoards } from '../../../RestApi';
import { Doughnut, Line } from 'react-chartjs-2';
import { Legend } from 'chart.js';

const Container = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  & .gridItem {
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    & h3 {
      padding-bottom: 1rem;
    }
  }
`;

const DoughnutChart = styled.div`
  width: 180px;
  margin: 0 auto;
  position: relative;
  & .legend {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    & .legendItem {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      & .circle {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #92bbf5;
        &.member {
          background-color: #9a97eb;
        }
      }
    }
  }
`;

export function QnaStatistics({ onTotalQnasUpdate }) {
  const [qnaBoards, setQnaBoards] = useState([]);
  const [qnaCountsByCourses, setQnaCountsByCourses] = useState({});
  const [qnaCountsByAuthority, setQnaCountsByAuthority] = useState({});

  useEffect(() => {
    apiGetAllQnABoards()
      .then((response) => {
        const newQnaBoards = response.data.data;
        setQnaBoards(newQnaBoards);
        onTotalQnasUpdate(newQnaBoards.length);
        console.log(newQnaBoards);

        // 코스 별 qna 개수 비교
        const qnaCourseCountData = qnaBoardsByCourses(newQnaBoards);
        setQnaCountsByCourses(qnaCourseCountData);
        console.log(qnaCourseCountData);

        // qna 개수 member, user 비교
        const qnaAuthorityCountData = qnaBoardsByAuthority(newQnaBoards);
        setQnaCountsByAuthority(qnaAuthorityCountData);
        console.log(qnaAuthorityCountData);
      })
      .catch((err) => {
        console.log('qna 조회 실패: ', err);
      });
  }, []);

  const qnaBoardsByCourses = (qnaBoards) => {
    const qnaCourseCount = {};
    qnaBoards.forEach((qna) => {
      const courseId = qna.course.courseId;
      const courseName = qna.course.courseName;
      if (qnaCourseCount[courseId]) {
        qnaCourseCount[courseId].qnaCount += 1;
      } else {
        qnaCourseCount[courseId] = {
          qnaCount: 1,
          courseName,
        };
      }
    });
    return qnaCourseCount;
  };

  const qnaBoardsByAuthority = (qnaBoards) => {
    const qnaAuthorityCount = {
      member: 0,
      user: 0,
    };
    qnaBoards.forEach((qna) => {
      const isMember = qna.member.authorities.some(
        (authority) => authority.authorityName === 'ROLE_MEMBER'
      );
      if (isMember) {
        qnaAuthorityCount.member += 1;
      } else {
        qnaAuthorityCount.user += 1;
      }
    });
    return qnaAuthorityCount;
  };

  const lineData = {
    labels: Object.values(qnaCountsByCourses).map(
      (course) => course.courseName
    ),
    datasets: [
      {
        label: 'Qnas',
        data: Object.values(qnaCountsByCourses).map(
          (course) => course.qnaCount
        ),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Member', 'User'],
    datasets: [
      {
        label: '유저수',
        data: [qnaCountsByAuthority.member, qnaCountsByAuthority.user],
        backgroundColor: ['#9A97EB', '#92BBF5'],
      },
    ],
  };

  return (
    <>
      <Container>
        <div>
          <div className="gridItem">
            <h3>강좌별 Q&A 추이</h3>
            <div>
              <Line
                data={lineData}
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
            </div>
          </div>
        </div>
        <div className="gridItem">
          <h3>Q&A 참여도</h3>
          <DoughnutChart>
            <div className="legend">
              <div className="legendItem">
                <span className="circle"></span>
                <p>user</p>
              </div>
              <div className="legendItem">
                <span className="circle member"></span>
                <p>member</p>
              </div>
            </div>
            <Doughnut
              data={doughnutData}
              options={{
                cutout: '60%',
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </DoughnutChart>
        </div>
      </Container>
    </>
  );
}
