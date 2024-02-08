import styled from "styled-components";
// import { useContext, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { AuthContext } from "../../../AuthContext";
import {
  apiGetQnABoardsByCourse,
  apiGetQnARepliesByQnABoardId,
} from "../../RestApi";

const Container = styled.div`
  width: 100%; //inner? 그걸로 해결하면 좋을 듯
`;
const NumBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

const NumWrap = styled.div`
  display: flex;
  &.before {
    background-color: lightgoldenrodyellow;
  }
  &.after {
    background-color: lightseagreen;
  }
`;

const NumTitle = styled.div``;
const CountNum = styled.div``;
const QnABox = styled.div`
  background-color: lightblue;
`;
const SingleQnA = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid darkgray;
`;
const QnAwrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Textwrap = styled.div`
  background-color: lightsteelblue;
`;
const QnATitle = styled.div``;
const QnAText = styled.div`
  margin-left: 20px; //들여쓰기 느낌
`;
const AnswerStatus = styled.div`
  background-color: blueviolet;
`;
const ReplyBox = styled.div`
  display: flex;
`;
const ReplyText = styled.input.attrs({ type: "text" })`
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const ReplyButton = styled.button``;

export function InstructorQnAManage() {
  return (
    <>
      <Container>
        <p>Q&A 관리</p>
        <NumBox>
          <NumWrap className="before">
            <NumTitle>수강 전 문의</NumTitle>
            <CountNum>34</CountNum>
          </NumWrap>
          <NumWrap className="after">
            <NumTitle>수강 문의</NumTitle>
            <CountNum>34</CountNum>
          </NumWrap>
        </NumBox>
        <QnABox>
          <p>QnA 남겨요</p>
          <SingleQnA>
            <QnAwrap>
              <Textwrap>
                <QnATitle>강의명: 토익 850+ 자기 전 5 문제만 풀고 자</QnATitle>
                <QnAText>
                  강의명을 왜 이렇게 결정하신 건지 물어봐도 되나요?
                </QnAText>
              </Textwrap>
              <AnswerStatus>미답변</AnswerStatus>
            </QnAwrap>
            <ReplyBox>
              <ReplyText placeholder="답변을 입력해 주세요" />
              <ReplyButton>등록</ReplyButton>
            </ReplyBox>
          </SingleQnA>
        </QnABox>
      </Container>
    </>
  );
}
