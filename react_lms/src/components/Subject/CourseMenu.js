import styled from 'styled-components';
import {
  useParams,
  NavLink,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

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

    if (currentPath.includes('afterInquiries')) {
      setIsActive('qna');
    } else if (currentPath.includes('coursedescription')) {
      setIsActive(currentHash === '#review' ? 'review' : 'description');
    } else if (currentPath.includes(`course/${courseId}`)) {
      setIsActive(
        isMemberCourse
          ? 'dashboard'
          : currentHash === '#curriculum'
          ? 'curriculum'
          : 'description'
      );
    }
  }, [location, courseId, isMemberCourse]);

  useEffect(() => {
    const hash = location.hash;
    // 해당 id를 가진 요소가 존재한다면
    if (hash && document.getElementById(hash.substring(1))) {
      // 해당 위치로 스크롤 이동
      document.getElementById(hash.substring(1)).scrollIntoView();
    }
  }, [location]);

  return (
    <>
      <Menu>
        <div className="innerWrapper">
          {isMemberCourse ? (
            <>
              <div
                className={`link ${isActive === 'dashboard' ? 'active' : ''}`}
              >
                <StyledNavLink to={`/course/${courseId}`}>
                  대시보드
                </StyledNavLink>
              </div>
              <div
                className={`link ${isActive === 'description' ? 'active' : ''}`}
              >
                <StyledNavLink
                  to={`/course/${courseId}/coursedescription#description`}
                >
                  강의소개
                </StyledNavLink>
              </div>
              <div className={`link ${isActive === 'review' ? 'active' : ''}`}>
                <StyledNavLink
                  to={`/course/${courseId}/coursedescription#review`}
                >
                  수강평
                </StyledNavLink>
              </div>
              <div className={`link ${isActive === 'qna' ? 'active' : ''}`}>
                <StyledNavLink to={`/course/${courseId}/afterInquiries`}>
                  질의응답
                </StyledNavLink>
              </div>
            </>
          ) : (
            <>
              <div
                className={`link ${isActive === 'description' ? 'active' : ''}`}
              >
                <StyledNavLink
                  to={`/course/${courseId}/coursedescription#description`}
                >
                  강의소개
                </StyledNavLink>
              </div>
              <div
                className={`link ${isActive === 'curriculum' ? 'active' : ''}`}
              >
                <StyledNavLink to={`/course/${courseId}#curriculum`}>
                  커리큘럼
                </StyledNavLink>
              </div>
              <div className={`link ${isActive === 'review' ? 'active' : ''}`}>
                <StyledNavLink
                  to={`/course/${courseId}/coursedescription#review`}
                >
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
