import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext, useEffect, useState } from "react";
import { apiCreateOrder, apiGetCurrentUserCart } from "../RestApi";
import { formatPrice } from "../Util/util";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
`;
const WrapLeftTop = styled.div`
  grid-column: span 2;
  grid-row: span 2;
  border: 1px solid #000;
`;
const WrapLeftBottom = styled.div`
  grid-column: span 2;
  grid-row: span 2;
  border: 1px solid #000;
`;
const WrapRight = styled.div`
  border: 1px solid #000;
  grid-column: span 1;
  grid-row: span 2;
`;

const Input = styled.input`
  border: 1px solid rgb(221, 221, 221);
  background-color: rgb(250, 250, 250);
  color: #6b7280;
  padding: 15px 15px 15px 15px;
  width: 100%;
  font-size: 14px;
  border-radius: 5px;
  &:focus {
    outline-color: #3182f6;
  }
`;

const ListBox = styled.div``;
const List = styled.div``;
const SingleList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  background-color: beige;
  &.thumbnail {
    grid-column: span 1;
    grid-row: span 2;
  }
  &.courseName {
    grid-column: span 1;
    grid-row: span 1;
  }
  &.price {
    grid-column: span 1;
    grid-row: span 1;
  }
`;

const AccountBtn = styled.button`
  text-decoration: none;
  text-align: center;
  color: #3182f6;
  width: 100%;
  border: 2px solid #3182f6;
  padding: 1px 0;
  border-radius: 5px;
  font-weight: 900;
`;

export function AccountForm() {
  const { user } = useContext(AuthContext);
  const [orderInfo, setOrderInfo] = useState({
    recipient: "",
    address: "",
    phoneNum: "",
    email: "",
    deliveryMessage: "",
    paymentMethod: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleOrderInfoChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setOrderInfo((prevInfo) => ({
      ...prevInfo,
      paymentMethod: method,
    }));
  };

  const navigate = useNavigate();
  const handleOrderSubmit = async () => {
    try {
      const response = await apiCreateOrder(orderInfo);
      console.log("주문이 성공적으로 완료되었습니다.", response.data);
      navigate(`/dashboard/${user.loginId}/purchaselist`);
    } catch (error) {
      console.error("주문 생성 중 오류 발생:", error);
    }
  };

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

  return (
    <>
      <h1>결제창</h1>
      <Container>
        <WrapLeftTop>
          <p>결제 방법</p>
          <button onClick={() => handlePaymentMethod("신용/체크카드")}>
            신용/체크카드
          </button>
          <button onClick={() => handlePaymentMethod("계좌이체")}>
            계좌이체
          </button>
          <button onClick={() => handlePaymentMethod("무통장입금")}>
            무통장입금
          </button>
          <button onClick={() => handlePaymentMethod("휴대폰")}>휴대폰</button>
          <button onClick={() => handlePaymentMethod("TossPay")}>
            TossPay
          </button>
          <button onClick={() => handlePaymentMethod("N Pay")}>N Pay</button>
          <button onClick={() => handlePaymentMethod("Kakao Pay")}>
            Kakao Pay
          </button>
        </WrapLeftTop>
        <WrapLeftBottom>
          <p>본인 정보 입력</p>
          <div className="inputContainer">
            <span className="inputLabel">수령인</span>
            <Input
              type="text"
              placeholder="가입 시 이름을 적어 주세요"
              name="recipient"
              value={orderInfo.recipient}
              onChange={handleOrderInfoChange}
            />
          </div>
          <div className="inputContainer">
            <span className="inputLabel">배송지 주소</span>
            <Input
              type="text"
              placeholder="자세히 적어 주세요"
              name="address"
              value={orderInfo.address}
              onChange={handleOrderInfoChange}
            />
          </div>
          <div className="inputContainer">
            <span className="inputLabel">휴대폰 번호</span>
            <Input
              type="text"
              placeholder="ex) 010-1234-5678"
              name="phoneNum"
              value={orderInfo.phoneNum}
              onChange={handleOrderInfoChange}
            />
          </div>
          <div className="inputContainer">
            <span className="inputLabel">이메일</span>
            <Input
              type="text"
              placeholder="ex) abc123@naver.com"
              name="email"
              value={orderInfo.email}
              onChange={handleOrderInfoChange}
            />
          </div>
          <div className="inputContainer">
            <span className="inputLabel">배송 시 요청 사항</span>
            <Input
              type="text"
              placeholder="배송 시 요청 사항이 있으면 적어 주세요"
              name="deliveryMessage"
              value={orderInfo.deliveryMessage}
              onChange={handleOrderInfoChange}
            />
          </div>
        </WrapLeftBottom>
        <WrapRight>
          <ListBox>
            <p>주문 목록</p>
            <List>
              {cartItems.map((cartItem) => (
                <SingleList key={cartItem.cartId}>
                  <div>
                    <p>
                      [{cartItem.course.contentLevel}]{" "}
                      {cartItem.course.courseName}
                    </p>
                    <p>수량: {cartItem.totalQuantity}</p>
                    <p>가격: {formatPrice(cartItem.course.price)}</p>
                    <p>총 가격: {formatPrice(cartItem.totalPrice)}</p>
                  </div>
                </SingleList>
              ))}
            </List>
          </ListBox>
          <AccountBtn onClick={handleOrderSubmit}>결제하기</AccountBtn>
        </WrapRight>
      </Container>
    </>
  );
}
