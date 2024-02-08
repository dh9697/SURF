import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  // apiGetCourse,
  apiGetQnABoardsByCourse,
  apiCreateQnAReply,
} from "../../RestApi";
import { formatDateTime } from "../../Util/util";
// 하.............여기강사권한확인부터해야댐
// 강사 권한을........ 다른 쪽에서 해서 선생님 아이디로 로그인했을 때 선생님 대시보드가 보여져야 대는데

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #212529;
  margin-bottom: 1rem;
  font-size: 40px;
  font-weight: bolder;
`;
const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
`;
const Content = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
`;
const Columntitle = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
`;

const Contents = styled.div``;
// const Columncontent = styled.div`
//   font-size: 1.2rem;
//   font-weight: 900;
// `;

const UserNum = styled.div``;
const QnAs = styled.table``;
const QnA = styled.tr``;

export function InstructorDashboard() {
  const location = useLocation();
  // const courseId = location.pathname.split("/")[3];
  const { user } = useContext(AuthContext);
  // const [course, setCourse] = useState(null);
  const [qnas, setQnas] = useState([]);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");

  // 집에서 아래 주석 코드 다시 보기
  // export function InstructorDashboard() {
  //   const location = useLocation();
  //   const { user } = useContext(AuthContext);
  //   const [qnas, setQnas] = useState([]);
  //   const [replyText, setReplyText] = useState("");

  //   useEffect(() => {
  //     const hasInstructorRole = user.authorityDtoSet.some(auth => auth.authorityName === 'ROLE_INSTRUCTOR');
  //     if (!hasInstructorRole) {
  //       alert('강사만 이 페이지에 접근할 수 있습니다.');
  //       window.location.href = '/';  // 홈 페이지로 리다이렉트
  //     }
  //   }, [user]);

  //   // 나머지 코드는 원래대로 유지
  //   // ...
  // }

  // 해당 강의 조회
  // useEffect(() => {
  //   apiGetCourse(courseId)
  //     .then((response) => {
  //       setCourse(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("코스 정보 불러오기 오류: ", error);
  //     });
  // }, [courseId]);

  // 해당 강의 질문 조회
  // useEffect(() => {
  //   apiGetQnABoardsByCourse(courseId).then((response) => {
  //     setQnas(response.data.data);
  //   });
  // }, [courseId]);

  // 답변 작성
  // const handleSubmit = (e, qnaId) => {
  //   e.preventDefault();
  //   const replyData = { replyText };
  //   const qnaData = {
  //     memberId: user.memberId,
  //     qnaId: qnaId,
  //   };
  //   apiCreateQnAReply(replyData, qnaData)
  //     .then(() => {
  //       setReplyText("");
  //       apiGetQnABoardsByCourse(courseId).then((response) => {
  //         setQnas(response.data.data);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("답변 작성 실패: ", error);
  //     });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const replyData = { replyText };
  //   const qnaData = {
  //     memberId: user.memberId,
  //     courseId: courseId,
  //     qnaId: qnaId,
  //   };
  //   apiCreateQnAReply(replyData, qnaData)
  //     .then(() => {
  //       setReplyText("");
  //       apiGetQnABoardsByCourse(courseId).then((response) => {
  //         setQnas(response.data.data);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("답변 작성 실패: ", error);
  //     });
  // };

  return (
    <>
      <Container>
        <Header>Dashboard</Header>
        <Body>
          <Content className="coursetable">
            <Columntitle>과정명</Columntitle>
            <Contents>
              강의 1<UserNum>학생 수 56명</UserNum>
              <NavLink
                to={`/dashboard/instructor/${user.loginId}/coursereview_manage`}
              >
                상세보기
              </NavLink>
            </Contents>
          </Content>
          <Content className="coursereivew">
            <Columntitle>수강평</Columntitle>
            <Contents>학생 1</Contents>
            <Contents>학생 2</Contents>
          </Content>
          <Content className="examlist">
            <Columntitle>과제 리스트</Columntitle>
            <Contents>과제 1</Contents>
            <Contents>과제 2</Contents>
          </Content>
          <Content className="qnalist">
            <Columntitle>QnA</Columntitle>
            {/* <QnAs>
              <colgroup>
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 300 + "px" }} />
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 130 + "px" }} />
              </colgroup>
              {qnas.map((qna, index) => {
                console.log(qna); // 여기를 추가
                return (
                  <QnA key={index}>
                    <td className="name">{qna.member.name}</td>
                    <td className="reviewText">{qna.questionText}</td>
                    <td className="time">{formatDateTime(qna.createdAt)}</td>
                    <td className="action">
                      <button onClick={(e) => handleSubmit(e, qna.qnaId)}>
                        답변하기
                      </button>
                    </td>
                  </QnA>
                );
              })}
            </QnAs> */}
          </Content>
        </Body>
      </Container>
    </>
  );
}
