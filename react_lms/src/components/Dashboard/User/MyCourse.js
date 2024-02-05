import styled from "styled-components";
import surf_logo from "../../image/surf_logo.png";
import { useEffect, useState } from "react";
import { MyAnswerNote } from "./MyAnswerNote";
import { apiGetMyCourseHistroies } from "../../RestApi";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: beige;
`;

const Imgbox = styled.img`
  width: 30%;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
`;

export function MyCourse() {
  const [courseHistoryDtos, setCourseHistoryDtos] = useState([]);
  const [isAnswerNote, setAnswerNote] = useState(false); // 배열 비구조화 할당 사용

  useEffect(() => {
    apiGetMyCourseHistroies().then((response) => {
      console.log(response.data.data);
      setCourseHistoryDtos(response.data.data);
    });
  }, []);

  const toggleAnswerNote = () => {
    setAnswerNote(!isAnswerNote);
  };

  return (
    <>
      <Container>
        <h1>내 학습</h1>
        {courseHistoryDtos.map((courseHistoryDto) => (
          <div key={courseHistoryDto.courseHistory.courseHistoryId}>
            <h2>강의명: {courseHistoryDto.courseHistory.course.courseName}</h2>
            <p>Start Date: {courseHistoryDto.courseHistory.startDate}</p>
            <p>End Date: {courseHistoryDto.courseHistory.endDate}</p>
            <p>
              {courseHistoryDto.completedContents} /
              {courseHistoryDto.totalContents} 강
            </p>
            <p>수료증: 미수료</p>
            <p>수강평 남기러 가기</p>
            <button onClick={toggleAnswerNote}>과제 오답 보기</button>
          </div>
        ))}
        <ContentBox>
          <Imgbox src={surf_logo} alt="Sample"></Imgbox>
        </ContentBox>
      </Container>
      <MyAnswerNote isVisible={isAnswerNote} />
    </>
  );
}
