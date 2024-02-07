import styled from "styled-components";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { apiWithdrawalByAxiosPost } from "../RestApi";

const Container = styled.div`
  width: 100%;
  height: 100px;
`;

const InfoBox = styled.div``;
const Section = styled.div`
  gap: 30px; //이건 아닌 듯 내가 표현하고 싶은 건 section마다 간격 두고 싶음
  display: flex;
`;

export function AccountInfo() {
  const { user, handleLogout } = useContext(AuthContext);
  const token = sessionStorage.getItem("Token");

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
        <InfoBox>
          <Section>
            <div>
              <p>Login ID</p>
              <p>변경 불가능</p>
            </div>
            <p>{user.loginId}</p>
          </Section>
          <Section>
            <div>
              <p>
                Personal
                <br />
                Information
              </p>
              <p>변경 가능</p>
            </div>
            <p>{user.name}</p>
          </Section>
          <Section>
            <div>
              <p>
                Address
                <br />
                Information
              </p>
              <p>변경 가능</p>
            </div>
            <p>{user.email}</p>
          </Section>
          <Section>
            <div>
              <p>
                Phone
                <br />
                Number
              </p>
              <p>변경 가능</p>
            </div>
            <p>{user.phoneNum}</p>
          </Section>
          <Section>
            <div>
              <p>Account Deletion</p>
            </div>
            <button onClick={handleWithdrawal}>회원 탈퇴</button>
          </Section>
        </InfoBox>
      </Container>
    </>
  );
}
