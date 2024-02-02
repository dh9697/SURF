import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  apiDeleteCourseFromCart,
  apiGetCurrentUserCart,
  apiUpdateQuantityCart,
} from "./RestApi";

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

  const updateQuantity = async (courseId, quantityChange) => {
    try {
      const newQuantity =
        cartItems.find((item) => item.course.courseId === courseId)
          .totalQuantity + quantityChange;

      await apiUpdateQuantityCart(courseId, quantityChange);
      const response = await apiGetCurrentUserCart();
      console.log(response.data.data);
      setCartItems(response.data.data);

      if (newQuantity === 0) {
        alert("장바구니에서 해당 강좌가 삭제됩니다.");
      }
    } catch (err) {
      console.log("수량 업데이트 중 오류: ", err);
    }
  };

  const deleteItem = async (courseId) => {
    try {
      await apiDeleteCourseFromCart(courseId);
      const response = await apiGetCurrentUserCart();
      setCartItems(response.data.data);
    } catch (err) {
      console.log("장바구니 아이템 삭제 중 오류: ", err);
    }
  };

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
            <button onClick={() => updateQuantity(item.course.courseId, 1)}>
              증가
            </button>
            <button onClick={() => updateQuantity(item.course.courseId, -1)}>
              감소
            </button>
            <button onClick={() => deleteItem(item.course.courseId)}>
              삭제
            </button>
            <p>총 가격: {item.totalPrice}</p>
            <p>장바구니 등록 시간: {item.createDate}</p>
          </div>
        ))}
      </div>
      <AccountBtn to="/accountform">결제 버튼</AccountBtn>
    </>
  );
}
