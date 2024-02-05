import styled from "styled-components";
import { AboutSurf } from "./AboutSurf";
import { AboutInstructor } from "./AboutInstructor";
import { AboutProcess } from "./AboutProcess";

const Container = styled.div`
  width: 100%;
`;

export function AboutMain() {
  return (
    <>
      <Container>
        <AboutSurf />
        <AboutInstructor />
        <AboutProcess />
      </Container>
    </>
  );
}
