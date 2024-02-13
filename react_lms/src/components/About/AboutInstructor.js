import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 50px 200px 0px;
`;

const Headers = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const InstructorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const InstructorInfoWrapper = styled.div`
  flex: 1;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  text-align: center;
`;

const Profile = styled.div`
  width: 150px;
  height: 150px;
  background-color: #eee;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const Namediv = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Coursediv = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Careerdiv = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Resolvdiv = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Videodiv = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

export function AboutInstructor() {
  return (
    <Container>
      <Headers>강사님 소개</Headers>
      <InstructorWrapper>
        <InstructorInfoWrapper>
          <Profile>사진</Profile>
          <Namediv>김보라</Namediv>
          <Coursediv>TOEIC</Coursediv>
          <Careerdiv>
            <div>국립국제교육원 EPIK 원어민 교사 대상 수업방법 강의</div>
            <div>서울시교육감 표창(2018)</div>
          </Careerdiv>
          <Resolvdiv>각오 한 마디:</Resolvdiv>
          <Videodiv>대표 강의 보러 가기</Videodiv>
        </InstructorInfoWrapper>
        <InstructorInfoWrapper>
          <Profile>사진</Profile>
          <Namediv>박정호</Namediv>
          <Coursediv>가르치는 과목:</Coursediv>
          <Careerdiv>경력:</Careerdiv>
          <Resolvdiv>각오 한 마디:</Resolvdiv>
          <Videodiv>대표 강의 보러 가기</Videodiv>
        </InstructorInfoWrapper>
      </InstructorWrapper>
    </Container>
  );
}
