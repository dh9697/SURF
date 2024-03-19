import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem 0;
`;

export function InstructorDashboardSideBar() {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
