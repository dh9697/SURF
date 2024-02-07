import styled from "styled-components";
import { AuthContext } from "../../../AuthContext";
import { useContext, useState } from "react";

const Container = styled.div``;
const InputBox = styled.div``;
const Input = styled.input``;
const Button = styled.button``;
const PostBox = styled.div``;

export function AfterInquiries() {
  const { user } = useContext(AuthContext);
  const [qnas, setQnas] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [editQuestionText, setEditQuestionText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); // 수정 중인 질문의 인덱스

  const addQnA = () => {
    if (!questionText) {
      return;
    }

    const newQnA = {
      name: user.name,
      questionText: questionText,
      time: new Date().toISOString().split("T")[0],
    };
    setQnas([...qnas, newQnA]);
    setQuestionText("");
  };

  const startEdit = (index) => {
    setEditingIndex(index); // 수정 중인 질문의 인덱스 설정
    setEditQuestionText(qnas[index].questionText); // 수정할 질문의 내용을 입력창에 표시
  };

  const finishEdit = () => {
    // 수정 완료 후 해당 질문의 내용과 시간을 업데이트하고 수정 중인 상태를 해제
    const updatedQnas = [...qnas];
    updatedQnas[editingIndex] = {
      ...updatedQnas[editingIndex],
      questionText: editQuestionText,
      time: new Date().toISOString().split("T")[0],
    };
    setQnas(updatedQnas);
    setEditingIndex(null);
    setEditQuestionText("");
  };

  const deleteQnA = (index) => {
    const updatedQnas = [...qnas];
    updatedQnas.splice(index, 1);
    setQnas(updatedQnas);
  };

  return (
    <>
      <Container>
        <p>수강 문의.</p>
        <InputBox>
          <Input
            type="text"
            placeholder="하고 싶은 질문을 남겨 주세요."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <Button onClick={addQnA}>등록</Button>
        </InputBox>
        <PostBox>
          {qnas.map((qna, index) => (
            <div key={index}>
              <p className="name">{qna.name}</p>
              {editingIndex === index ? ( // 수정 중인 질문의 경우 입력창 표시
                <Input
                  type="text"
                  value={editQuestionText}
                  onChange={(e) => setEditQuestionText(e.target.value)}
                />
              ) : (
                <p className="questionText">{qna.questionText}</p>
              )}
              <p className="time">{qna.time}</p>
              <Button
                onClick={() =>
                  editingIndex === index ? finishEdit() : startEdit(index)
                }
              >
                {editingIndex === index ? "수정 완료" : "수정"}
              </Button>
              <Button onClick={() => deleteQnA(index)}>삭제</Button>
            </div>
          ))}
        </PostBox>
      </Container>
    </>
  );
}
