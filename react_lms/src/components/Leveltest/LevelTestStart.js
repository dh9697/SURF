import styled from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import sample from "../image/suryo.webp";

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  margin-top: 50px;
  font-size: 36px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 30px;
`;

const PageIndicator = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Progress = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: #007bff;
  border-radius: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const Box = styled.div`
  width: 800px;
  height: 400px;
  background-image: url(${sample});
  background-size: cover;
  background-position: center;
  margin: 0 auto 20px;
`;

const ResultButton = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 12px 24px;
  font-size: 20px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

export function LevelTestStart() {
  const [progress, setProgress] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    setProgress((prevProgress) => prevProgress + 6);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Container>
      <Title>Test your English</Title>
      <Description>
        For the questions below, please choose the best option to complete the
        sentence or conversation.
      </Description>
      <PageIndicator>Page {currentPage} of 15</PageIndicator>
      <ProgressBar>
        <Progress progress={progress} />
      </ProgressBar>
      <Box />
      <ButtonGroup>
        <Button>PREV</Button>
        <Button onClick={handleNext}>NEXT</Button>
      </ButtonGroup>
      <NavLink to={"/level_test_result"} style={{ textDecoration: "none" }}>
        <ResultButton>결과 보러 가기</ResultButton>
      </NavLink>
    </Container>
  );
}
