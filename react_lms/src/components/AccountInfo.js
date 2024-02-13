import styled from "styled-components";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { apiWithdrawalByAxiosPost } from "./RestApi";

const Container = styled.div`
  width: 100%;
  height: 100px;
`;

export function AccountInfo() {
  const { user, handleLogout } = useContext(AuthContext);
  const token = localStorage.getItem("Token");

  const handleWithdrawal = () => {
    const withdrawalReason = prompt("탈퇴 사유를 입력하세요.");
    if (withdrawalReason) {
      apiWithdrawalByAxiosPost(withdrawalReason, token)
        .then((response) => {
          if (response.data.resultCode === "SUCCESS") {
            handleLogout();
            window.location.href = "/";
            window.alert("탈퇴 처리가 완료되었습니다.");
          }
        })
        .catch((err) => {
          console.log("회원 탈퇴 실패: " + err);
        });
    } else {
      console.log("로그인이 필요합니다.");
    }
  };
  return (
    <>
      <Container>
        <h3>계정정보</h3>
        <p>{user.loginId}</p>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phoneNum}</p>
        <button onClick={handleWithdrawal}>회원 탈퇴</button>
      </Container>
    </>
  );
}
