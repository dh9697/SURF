import styled from 'styled-components';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';
import { apiWithdrawalByAxiosPost } from '../RestApi';

const Container = styled.div`
  width: 100%;
  height: 100px;
`;

const InfoBox = styled.div``;
const Section = styled.div`
  display: flex;
`;

export function AccountInfo() {
  const { user, handleLogout } = useContext(AuthContext);
  const token = sessionStorage.getItem('Token');

  const handleWithdrawal = () => {
    const withdrawalReason = prompt('탈퇴 사유를 입력하세요.');
    if (withdrawalReason) {
      apiWithdrawalByAxiosPost(withdrawalReason, token)
        .then((response) => {
          if (response.data.resultCode === 'SUCCESS') {
            handleLogout();
            window.location.href = '/';
            window.alert('탈퇴 처리가 완료되었습니다.');
          }
        })
        .catch((err) => {
          console.log('회원 탈퇴 실패: ' + err);
        });
    } else {
      console.log('로그인이 필요합니다.');
    }
  };
  return (
    <>
      <Container>
        <h3>계정정보</h3>
        <InfoBox>
          <Section>
            <p>회원등급</p>
            <p>일반등급</p>
          </Section>
          <Section>
            <p>Login ID</p>
            <p>{user.loginId}</p>
          </Section>
          <Section>
            <p>이름</p>
            <p>{user.name}</p>
          </Section>
          <Section>
            <p>이메일</p>
            <p>{user.email}</p>
          </Section>
          <Section>
            <p>전화번호</p>
            <p>{user.phoneNum}</p>
          </Section>
        </InfoBox>
        <button onClick={handleWithdrawal}>회원 탈퇴</button>
      </Container>
    </>
  );
}
