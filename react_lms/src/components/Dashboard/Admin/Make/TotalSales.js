import { Icon } from "@iconify/react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { formatPrice } from "../../../Util/util";
import { useEffect, useState } from "react";
import { apiGetAllOrderDetails } from "../../../RestApi";

const Container = styled.div``;

export function TotalSales() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
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
        setTotalSales(newTotalSales);

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
        console.log("주문 정보 조회 실패: ", err);
      });
  }, []);

  return (
    <>
      <Container>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p>Total Sales</p>
            <p style={{ fontSize: "1.5rem" }}>{formatPrice(totalSales)}</p>
          </div>
          <Icon
            icon={"fontisto:dollar"}
            style={{ fontSize: "2rem", color: "green" }}
          ></Icon>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <p>highestSalesBySubject</p>
            <p>{highestSalesBySubject.subjectName}</p>
            <p style={{ fontSize: "1.5rem" }}>
              {formatPrice(highestSalesBySubject.totalSales)}
            </p>
          </div>
          <div>
            <p>highestSalesByCourse</p>
            <p>{highestSalesByCourse.courseName}</p>
            <p style={{ fontSize: "1.5rem" }}>
              {formatPrice(highestSalesByCourse.totalSales)}
            </p>
          </div>
        </div>
        <div>
          <Line
            data={{
              labels: Object.keys(salesByCourse).map(
                (key) => salesByCourse[key].courseName
              ),
              datasets: [
                {
                  label: "total sales",
                  data: Object.values(salesByCourse).map(
                    (course) => course.totalSales
                  ),
                  fill: false,
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "white",
                  tension: 0.1,
                  pointStyle: "circle",
                  pointRadius: 3,
                  pointBackgroundColor: "rgb(255, 99, 132)",
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
          <Line
            data={{
              labels: Object.keys(salesBySubject).map(
                (key) => salesBySubject[key].subjectName
              ),
              datasets: [
                {
                  label: "total sales",
                  data: Object.values(salesBySubject).map(
                    (subject) => subject.totalSales
                  ),
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  backgroundColor: "white",
                  tension: 0.1,
                  pointStyle: "circle",
                  pointRadius: 3,
                  pointBackgroundColor: "rgb(75, 192, 192)",
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
      </Container>
    </>
  );
}
