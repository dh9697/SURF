import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(1, 2fr);
`;
const CourseUserWrap = styled.div`
  display: flex;
  height: 200px;
`;
const CourseName = styled.div`
  flex: 6;
  background-color: lightslategray;
`;
const CourseUser = styled.div`
  flex: 2;
  background-color: gray;
`;
const SuccessRate = styled.div`
  flex: 2;
  background-color: lightcoral;
`;
const UserInfo = styled.div`
  background-color: lightsalmon;
`;

export function AdminUserManage() {
  return (
    <>
      <Container>
        <div>
          <h1>코스별 유저 수</h1>
          <CourseUserWrap>
            <CourseName>코스 이름</CourseName>
            <CourseUser>유저 수</CourseUser>
            <SuccessRate>완료율</SuccessRate>
          </CourseUserWrap>
        </div>
        <div>
          <h1>유저 정보</h1>
          <UserInfo>
            <div>이름</div>
            <div>아이디</div>
            <div>생년월일</div>
            <div>성별</div>
            <div>국적</div>
            <div>이메일</div>
          </UserInfo>
        </div>
      </Container>
    </>
  );
}
