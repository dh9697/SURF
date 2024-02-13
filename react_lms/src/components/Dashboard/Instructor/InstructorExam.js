import styled from "styled-components";
import { AuthContext } from "../../../AuthContext";
import { useContext } from "react";
const Container = styled.div`
  width: 100%;
`;
export function InstructorExam() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <Container></Container>
    </>
  );
}
