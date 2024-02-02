import styled from "styled-components";
import { useParams, NavLink } from "react-router-dom";

const Menu = styled.div`
  background-color: darkgray;
  display: flex;
  align-items: flex-end;
  height: 45px;
  overflow: auto;
`;

export function CourseMenu() {
  const { courseId } = useParams();

  return (
    <>
      <Menu>
        {/* CourseMember일 경우 */}
        <NavLink to={`/course/${courseId}`}>대시보드</NavLink>
        <NavLink to={`/course/${courseId}/coursedescription`}>강의소개</NavLink>
        <NavLink to={`/course/${courseId}/coursedescription`}>수강평</NavLink>
        <NavLink to={`/course/${courseId}/afterInquiries`}>수강 문의</NavLink>

        {/* courseUser일 경우 */}
        {/* 
       <div>대시보드</div>
        <div>커리큘럼</div>
        <div>수강평</div><NavLink to={`/course/${courseId}/beforeInquiries`}>
          수강 전 문의
        </NavLink> */}
      </Menu>
    </>
  );
}
