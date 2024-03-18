import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { formatPrice } from '../../../Util/util';
import { useEffect, useState } from 'react';
import { apiGetAllOrderDetails } from '../../../RestApi';

const Container = styled.div`
  & .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    & .gridItem {
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 1rem;
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

const BarContainer = styled.div``;

export function TotalSales({ onTotalSalesUpdate }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const [salesByCourse, setSalesByCourse] = useState(0);
  const [salesBySubject, setSalesBySubject] = useState(0);
  const [highestSalesByCourse, setHighestSalesByCourse] = useState({});
  const [highestSalesBySubject, setHighestSalesBySubject] = useState({});

  useEffect(() => {
    apiGetAllOrderDetails()
      .then((response) => {
        const newOrderDetails = response.data.data;
        setOrderDetails(newOrderDetails);

        // 총 매출액
        const newTotalSales = newOrderDetails.reduce(
          (acc, orderDetail) => acc + orderDetail.price,
          0
        );
        onTotalSalesUpdate(newTotalSales);

        // course별 매출액
        const newSalesByCourse = newOrderDetails.reduce((acc, orderDetail) => {
          const { courseId, courseName } = orderDetail.course;
          if (!acc[courseId]) {
            acc[courseId] = { courseName: courseName, totalSales: 0 };
          }
          acc[courseId].totalSales += orderDetail.price;
          return acc;
        }, {});
        setSalesByCourse(newSalesByCourse);

        // subject별 매출액
        const newSalesBySubject = newOrderDetails.reduce((acc, orderDetail) => {
          const { subjectId, subjectName } = orderDetail.course.subject;
          if (!acc[subjectId]) {
            acc[subjectId] = { subjectName: subjectName, totalSales: 0 };
          }
          acc[subjectId].totalSales += orderDetail.price;
          return acc;
        }, {});
        setSalesBySubject(newSalesBySubject);

        // course 최고 매출액
        const newHighestSalesByCourse = Object.values(newSalesByCourse).reduce(
          (max, course) => (max.totalSales > course.totalSales ? max : course),
          { totalSales: 0 }
        );
        setHighestSalesByCourse(newHighestSalesByCourse);

        // subject 최고 매출액
        const newHighestSalesBySubject = Object.values(
          newSalesBySubject
        ).reduce(
          (max, subject) =>
            max.totalSales > subject.totalSales ? max : subject,
          { totalSales: 0 }
        );
        setHighestSalesBySubject(newHighestSalesBySubject);
      })
      .catch((err) => {
        console.log('주문 정보 조회 실패: ', err);
      });
  }, []);

  return (
    <>
      <Container>
        <h2>Sales</h2>
        <div className="grid">
          <div className="gridItem">
            <div className="data">
              <h3>{highestSalesBySubject.subjectName}</h3>
              <p className="dataInfo">Highest sales by subject</p>
              <h2>{formatPrice(highestSalesBySubject.totalSales)}</h2>
            </div>
            <BarContainer>
              <Bar
                data={{
                  labels: Object.keys(salesBySubject).map(
                    (key) => salesBySubject[key].subjectName
                  ),
                  datasets: [
                    {
                      label: 'total sales',
                      data: Object.values(salesBySubject).map(
                        (subject) => subject.totalSales
                      ),
                      backgroundColor: 'rgb(75, 192, 192)',
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
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </BarContainer>
          </div>
          <div className="gridItem">
            <div className="data">
              <h3>{highestSalesByCourse.courseName}</h3>
              <p className="dataInfo">Highest sales by course</p>
              <h2>{formatPrice(highestSalesByCourse.totalSales)}</h2>
            </div>
            <BarContainer>
              <Bar
                data={{
                  labels: Object.keys(salesByCourse).map(
                    (key) => salesByCourse[key].courseName
                  ),
                  datasets: [
                    {
                      label: 'total sales',
                      data: Object.values(salesByCourse).map(
                        (course) => course.totalSales
                      ),
                      backgroundColor: 'rgb(255, 99, 132)',
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
            </BarContainer>
          </div>
        </div>
      </Container>
    </>
  );
}
