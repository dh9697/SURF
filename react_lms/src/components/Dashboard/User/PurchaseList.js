import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { apiGetOrderDetail } from "../../RestApi";
import { formatDateTime, formatDateTimeStamp } from "../../Util/util";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export function PurchaseList() {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    apiGetOrderDetail()
      .then((response) => {
        console.log(response.data.data);
        setOrderDetails(response.data.data);
      })
      .catch((error) => {
        console.error("'Error fetching purchase data: ", error);
      });
  }, []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th>강의명</Th>
            <Th>구매일자</Th>
            <Th>결제방법</Th>
            <Th>결제금액</Th>
            <Th>만료일자</Th>
            <Th>연장유무</Th>
          </tr>
        </thead>

        <tbody>
          {orderDetails.length > 0 ? (
            orderDetails.map((orderDetail, index) => (
              <tr key={index}>
                <Td>{orderDetail.course.courseName}</Td>
                <Td>{formatDateTime(orderDetail.order.orderDate)}</Td>
                <Td>{orderDetail.order.paymentMethod}</Td>
                <Td>{orderDetail.price}</Td>
                <Td>{formatDateTime(orderDetail.expirationDate)}</Td>
                <Td>저는 궁금해요 만료시간이 있어야 하는지 선생님께 여쭙기</Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan={6}>주문 상세 정보가 없습니다.</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
