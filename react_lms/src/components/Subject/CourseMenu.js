import styled from "styled-components";
import {
  useParams,
  NavLink,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

const Menu = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  & .innerWrapper {
    display: flex;
    & .link {
      padding: 10px;
      &.active {
        font-weight: 900;
        color: #3182f6;
        border-bottom: 2px solid #3182f6;
      }
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1rem;
  color: #454545;
`;

export function CourseMenu({ isMemberCourse }) {
  const { courseId } = useParams();
  const [isActive, setIsActive] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const currentHash = location.hash;

    if (currentPath.includes("afterInquiries")) {
      setIsActive("qna");
    } else if (currentPath.includes("coursedescription")) {
      if (currentHash === "#review") {
        setIsActive("review");
      } else {
        setIsActive("description");
      }
    } else if (currentPath.includes(`course/${courseId}`) && isMemberCourse) {
      setIsActive("dashboard");
    } else {
      if (currentHash === "#content") {
        setIsActive("content");
      } else if (currentHash === "#review") {
        setIsActive("review");
      } else {
        setIsActive("description");
      }
    }
  }, [location, isMemberCourse]);

  return (
    <>
      <Menu>
        <div className="innerWrapper">
          {isMemberCourse ? (
            <>
              <div
                className={`link ${isActive === "dashboard" ? "active" : ""}`}
                onClick={() => setIsActive("dashboard")}
              >
                <StyledNavLink to={`/course/${courseId}`}>
                  대시보드
                </StyledNavLink>
              </div>
              <div
                className={`link ${isActive === "description" ? "active" : ""}`}
                onClick={() => setIsActive("description")}
              >
                <StyledNavLink
                  to={`/course/${courseId}/coursedescription#description`}
                >
                  강의소개
                </StyledNavLink>
              </div>
              <div
                className={`link ${isActive === "review" ? "active" : ""}`}
                onClick={() => setIsActive("review")}
              >
                <StyledNavLink
                  to={`/course/${courseId}/coursedescription#review`}
                >
                  수강평
                </StyledNavLink>
              </div>
              <div
                className={`link ${isActive === "qna" ? "active" : ""}`}
                onClick={() => setIsActive("qna")}
              >
                <StyledNavLink to={`/course/${courseId}/afterInquiries`}>
                  질의응답
                </StyledNavLink>
              </div>
            </>
          ) : (
            <>
              <div
                className={`link ${isActive === "description" ? "active" : ""}`}
                onClick={() => setIsActive("description")}
              >
                <StyledNavLink to={`/course/${courseId}#description`}>
                  강의소개
                </StyledNavLink>
              </div>
              <div
                className={`link ${isActive === "content" ? "active" : ""}`}
                onClick={() => setIsActive("content")}
              >
                <StyledNavLink to={`/course/${courseId}#content`}>
                  커리큘럼
                </StyledNavLink>
              </div>
              <div
                className={`link ${isActive === "review" ? "active" : ""}`}
                onClick={() => setIsActive("review")}
              >
                <StyledNavLink to={`/course/${courseId}#review`}>
                  수강평
                </StyledNavLink>
              </div>
            </>
          )}
        </div>
      </Menu>
    </>
  );
}
