import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  apiDeleteCourseFromCart,
  apiGetCurrentUserCart,
  apiUpdateQuantityCart,
} from "../RestApi";
import { formatPrice, formatDateTimeStamp } from "../Util/util";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #3182f6;
  margin-bottom: 30px;
`;

const CartItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & .buttons {
    display: flex;
    gap: 1rem;
  }
  & .totalPrice {
    color: #3182f6;
  }
`;

const ProductName = styled.p`
  font-weight: bold;
`;

const Price = styled.p`
  color: #3182f6;
`;

const QuantityButton = styled.button`
  background-color: #3182f6;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const AccountBtn = styled(NavLink)`
  display: block;
  text-decoration: none;
  text-align: center;
  color: white;
  background-color: #3182f6;
  border: 2px solid #3182f6;
  padding: 15px 0;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 20px;
`;

export function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await apiGetCurrentUserCart();
        setCartItems(response.data.data);
        console.log(response.data.data);
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
    <Container>
      <Title>물결 바구니</Title>
      {cartItems.map((item, index) => (
        <CartItem key={index}>
          {index === 0 && <h2>{item.member.name}의 물결 바구니</h2>}
          <ProductInfo>
            <ProductName>
              [{item.course.subject.subjectName}] [{item.course.contentLevel}]{" "}
              {item.course.courseName} {item.course.instructorNames}
            </ProductName>
            <p>
              상품정보: 시간 : {item.course.durationMins}, course정보에 따라
              불러오셈
            </p>
            <Price>{formatPrice(item.course.price)}</Price>
            <p>수량: {item.totalQuantity}</p>
            <div className="buttons">
              <QuantityButton
                onClick={() => updateQuantity(item.course.courseId, 1)}
              >
                증가
              </QuantityButton>
              <QuantityButton
                onClick={() => updateQuantity(item.course.courseId, -1)}
              >
                감소
              </QuantityButton>
              <QuantityButton onClick={() => deleteItem(item.course.courseId)}>
                삭제
              </QuantityButton>
            </div>
            <p>
              총 가격:{" "}
              <span className="totalPrice">{formatPrice(item.totalPrice)}</span>
            </p>
            <p>물결 바구니 등록 시간: {formatDateTimeStamp(item.createDate)}</p>
          </ProductInfo>
        </CartItem>
      ))}
      <AccountBtn to="/accountform">결제 버튼</AccountBtn>
    </Container>
  );
}
