import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGetCurrentUserCart } from "./RestApi";

const AccountBtn = styled(NavLink)`
  text-decoration: none;
  text-align: center;
  color: #3182f6;
  width: 100%;
  border: 2px solid #3182f6;
  padding: 15px 0;
  border-radius: 5px;
  font-weight: 900;
`;

export function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await apiGetCurrentUserCart();
        setCartItems(response.data.data);
      } catch (err) {
        console.log("장바구니 정보를 가져오는 중 오류: ", err);
      }
    };
    fetchCartItems();
  }, []);
  return (
    <>
      <h1>수강바구니</h1>
      <div>
        {cartItems.map((item, index) => (
          <div key={index}>
            {/* 한번만 나오게 하려면 index == 0 */}
            {index === 0 && <h2>{item.member.name}의 수강 바구니</h2>}
            <p>상품명: {item.course.courseName}</p>
            <p>
              상품정보: 시간 : {item.course.durationMins}, course정보에 따라
              불러오셈
            </p>
            <p>가격: {item.course.price}</p>
            <p>수량: {item.totalQuantity}</p>
            <p>총 가격: {item.totalPrice}</p>
            <p>장바구니 등록 시간: {item.createDate}</p>
          </div>
        ))}
      </div>
      <AccountBtn to="/accountform">결제 버튼</AccountBtn>
    </>
  );
}
