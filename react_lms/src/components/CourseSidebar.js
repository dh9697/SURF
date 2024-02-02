import styled from "styled-components";
import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  apiGetCourse,
  apiGetContentByCourse,
  apiCreateCart,
  apiAddCourseToCart,
} from "./RestApi";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px;
  & .innerWrapper {
    display: flex;
    flex: 1 1 0px;
    gap: 2rem;
  }
`;

const StickySidebar = styled.div`
  width: 50%;
  position: sticky;
  top: 0;
  right: 0;
  padding: 20px;
  background-color: #f1f1f1;
`;

const Button = styled(NavLink)`
  text-decoration: none;
  text-align: center;
  color: #3182f6;
  width: 100%;
  border: 2px solid #3182f6;
  padding: 15px 0;
  border-radius: 5px;
  font-weight: 900;

  &:hover {
    color: #00abff;
    background-color: #f8f9fa;
    border-radius: 5px;
  }
`;

export function CourseSidebar() {
  const { courseId } = useParams(); //동적 경로를 위함
  const [course, setCourse] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    // courseId를 사용하여 강의 정보를 불러옴
    apiGetCourse(courseId)
      .then((response) => {
        setCourse(response.data.data); // 불러온 강의 정보를 상태에 저장
      })
      .catch((error) => {
        console.error("강의 정보 불러오기 오류: ", error);
      });
  }, [courseId]); // courseId가 변경될 때마다 useEffect를 다시 실행

  useEffect(() => {
    console.log(course);
  }, [course]);

  useEffect(() => {
    // courseId를 사용하여 강의 정보를 불러옴
    apiGetContentByCourse(courseId)
      .then((response) => {
        setContent(response.data.data); // 불러온 강의 정보를 상태에 저장
      })
      .catch((error) => {
        console.error("컨텐츠 정보 불러오기 오류: ", error);
      });
  }, [courseId]); // courseId가 변경될 때마다 useEffect를 다시 실행

  console.log(content.map((item) => item.contentTitle));

  const handleCart = async () => {
    try {
      await apiCreateCart(courseId);
      alert("장바구니에 강좌가 추가되었습니다.");
    } catch (err) {
      alert("장바구니에 강좌를 추가하는데 실패하였습니다.");
    }
  };

  return (
    <>
      <Container>
        <div className="innerWrapper">
          <StickySidebar>
            <div>
              <p>선생님: {course.instructorNames}</p>
              <p>총 강의 개수: {content.length}</p>
              <p>수료증: </p>
              <p>가격: {course.price}</p>
              <Button to="/cart">수강 신청하러 가기</Button>
              <Button onClick={handleCart}>카트에 담기</Button>
            </div>
          </StickySidebar>
        </div>
      </Container>
    </>
  );
}
