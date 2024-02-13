import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const DescriptionText = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  margin-bottom: 10px;
`;

const QuestionInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const OptionInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const AddOptionButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-start;

  &:hover {
    background-color: #0056b3;
  }
`;

export function AdminLevelTestManage() {
  return (
    <Container>
      <Section>
        <TitleInput type="text" placeholder="레벨 테스트 제목" />
        <DescriptionText placeholder="레벨 테스트 설명, 영상, 사진" />
      </Section>
      <Section>
        <QuestionInput type="text" placeholder="질문" />
        <OptionInput type="text" placeholder="선택지" />
        <OptionInput type="text" placeholder="선택지" />
        <OptionInput type="text" placeholder="선택지" />
        <OptionInput type="text" placeholder="선택지" />
        <AddOptionButton>선택지 추가</AddOptionButton>
      </Section>
      <SubmitButton>등록</SubmitButton>
    </Container>
  );
}
