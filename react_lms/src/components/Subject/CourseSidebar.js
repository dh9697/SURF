import styled from "styled-components";
import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  apiGetCourse,
  apiGetContentByCourse,
  apiCreateCart,
  apiAddCourseToCart,
} from "../RestApi";
import { NavLink } from "react-router-dom";
import { formatPrice, formatTime } from "../Util/util";
import { AuthContext } from "../../AuthContext";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const StickySidebar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  & .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: #454545;
    & h1 {
      padding: 1rem 0;
    }
  }
  & .textSection {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f3f3f3;
    gap: 0.5rem;
  }
`;

const Button = styled(NavLink)`
  background-color: #3182f6;
  color: #f1f1f1;
  text-decoration: none;
  width: 100%;
  padding: 10px 20px;
  font-weight: 900;
  text-align: center;
  border-radius: 5px;
  &:hover {
    color: #00abff;
    background-color: #f8f9fa;
  }
`;

export function CourseSidebar() {
  const { courseId } = useParams(); //동적 경로를 위함
  const [course, setCourse] = useState([]);
  const [content, setContent] = useState([]);
  const { user } = useContext(AuthContext);

  // 해당 코스 조회
  useEffect(() => {
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("강의 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  // 해당 코스 컨텐츠 조회
  useEffect(() => {
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContent(response.data.data);
      })
      .catch((error) => {
        console.error("컨텐츠 정보 불러오기 오류: ", error);
      });
  }, [courseId]);

  // 장바구니 담기
  const handleCart = async () => {
    try {
      await apiCreateCart(courseId);
      alert("장바구니에 강좌가 추가되었습니다.");
    } catch (err) {
      if (!user) {
        alert("로그인을 해주세요.");
      } else {
        alert("장바구니에 강좌를 추가하는데 실패하였습니다.");
      }
    }
  };

  return (
    <>
      <Container>
        {course && content && (
          <StickySidebar>
            <div className="section">
              <h1>{formatPrice(course.price)}</h1>
              <Button onClick={handleCart}>카트에 담기</Button>
              <Button to="/cart">수강 신청하러 가기</Button>
            </div>
            <div className="textSection">
              <p>총 {course.instructorNames?.length || 0} 명의 선생님</p>
              <p>{course.instructorNames}</p>
              <p>총 {content.length || 0}개의 수업</p>
              <p>
                {formatTime(
                  content?.reduce(
                    (acc, cur) => acc + (cur.course.durationMins || 0),
                    0
                  ) || 0
                )}
                의 수업량
              </p>
              <p>수료증은 코스 히스토리라 다른 내용 추가 </p>
            </div>
          </StickySidebar>
        )}
      </Container>
    </>
  );
}
