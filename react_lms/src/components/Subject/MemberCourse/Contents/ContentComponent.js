import styled from "styled-components";
import sampleImg from "../../../image/귀찮네.webp";
import { NavLink } from "react-router-dom";

const Container = styled.div``;

const ThumbImg = styled.div`
  position: relative; /* 부모 요소 기준으로 자식 요소들의 위치를 조정할 수 있도록 설정 */
  width: 50%;
  height: 50vh; /* 전체 화면 높이로 설정 */
  background-image: url(${sampleImg});
  background-size: cover; /* 배경 이미지를 컨테이너에 맞게 조정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  position: absolute; /* 부모 요소를 기준으로 위치를 설정하기 위해 absolute로 설정 */
  top: 50%; /* 상단으로부터의 위치를 50%로 설정 */
  left: 50%; /* 좌측으로부터의 위치를 50%로 설정 */
  transform: translate(
    -50%,
    -50%
  ); /* 버튼을 수직과 수평으로 가운데 정렬하기 위해 사용 */
  padding: 10px 20px;
  font-size: 16px;
`;

const InfoBox = styled.div``;
const CourseTitle = styled.div``;
const CourseDur = styled.div``;
const CourseDesc = styled.div``;

export function ContentComponent() {
  return (
    <Container>
      <ThumbImg>
        <Button>
          버튼을 눌렀을 때 직전! 주소로 이동해야 됨 이걸 어떻게 표현할 수 잇을까
          고민 좀
        </Button>
      </ThumbImg>
      <InfoBox>
        <CourseTitle>강의 제목</CourseTitle>
        <CourseDur>강의 러닝타임</CourseDur>
        <CourseDesc>강의 설명</CourseDesc>
      </InfoBox>
    </Container>
  );
}
