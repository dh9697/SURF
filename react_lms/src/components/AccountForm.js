import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext, useEffect, useState } from "react";

const Container = styled.div``;
const WrapLeft = styled.div``;
const WrapRight = styled.div``;

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

export function AccountForm() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>결제 방법</h1>
      <Container>
        <WrapLeft></WrapLeft>
        <WrapRight>
          <AccountBtn to={`/dashboard/${user.loginId}/purchaselist`}>
            결제하기
          </AccountBtn>
        </WrapRight>
      </Container>
    </>
  );
}
