import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const FAQItem = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Question = styled.div`
  padding: 15px;
  background-color: #f2f2f2;
  cursor: pointer;
`;

const Answer = styled.div`
  padding: 15px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

export function Contact() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const toggleFAQ1 = () => {
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
    setIsOpen3(false);
  };

  const toggleFAQ2 = () => {
    setIsOpen1(false);
    setIsOpen2(!isOpen2);
    setIsOpen3(false);
  };

  const toggleFAQ3 = () => {
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen3(!isOpen3);
  };

  return (
    <Container>
      <h1>FAQ</h1>
      <FAQItem>
        <Question onClick={toggleFAQ1}>
          질문 1: 여기에 질문을 입력하세요.
        </Question>
        <Answer isOpen={isOpen1}>
          답변 1: 여기에 해당 질문에 대한 답변을 입력하세요.
        </Answer>
      </FAQItem>
      <FAQItem>
        <Question onClick={toggleFAQ2}>
          질문 2: 여기에 질문을 입력하세요.
        </Question>
        <Answer isOpen={isOpen2}>
          답변 2: 여기에 해당 질문에 대한 답변을 입력하세요.
        </Answer>
      </FAQItem>
      <FAQItem>
        <Question onClick={toggleFAQ3}>
          질문 3: 여기에 질문을 입력하세요.
        </Question>
        <Answer isOpen={isOpen3}>
          답변 3: 여기에 해당 질문에 대한 답변을 입력하세요.
        </Answer>
      </FAQItem>
    </Container>
  );
}
