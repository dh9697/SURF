import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: gray;
`;

export function Dashboard() {
  return (
    <>
      <Container>
        <DashboardNavbar></DashboardNavbar>
      </Container>
    </>
  );
}
