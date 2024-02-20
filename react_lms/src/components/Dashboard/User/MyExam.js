import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { apiGetAllExams, apiGetExamByContent } from "../../RestApi";

const Container = styled.div`
   width: 100%;
   background-color: beige;
`;
export function MyExam() {
   return (
      <>
         <Container></Container>
         <Outlet />
      </>
   );
}
