import styled from "styled-components";

const Container = styled.div``;
const InputBox = styled.div``;
const Input = styled.input``;
const Button = styled.button``;
const PostBox = styled.div``;

export function AfterInquiries() {
  return (
    <>
      <Container>
        <p>수강 문의.</p>
        <InputBox>
          <Input
            type="text"
            placeholder="하고 싶은 질문을 남겨 주세요."
            name="coursereview"
          />
          <Button>등록</Button>
        </InputBox>
        <PostBox>
          <div>
            <p>a 파트에서 뭐라고 하는지 잘 모르겠어요 ㅜㅜ 저만 바보인가요 </p>
            <Button>수정</Button>
            <Button>삭제</Button>
          </div>
        </PostBox>
      </Container>
    </>
  );
}
