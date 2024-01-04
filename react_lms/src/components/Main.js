import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #3182f6;
`;

const Slogan = styled.div`
  width: 100vw;
  height: 80vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* 부모 요소에 대해 상대 위치 설정 */
  /* 사선 효과를 주는 clip-path 속성 */
  clip-path: polygon(0 0, 100% 0, 100% 55%, 0 100%);
  /* 첫 번째 자식 요소를 제외한 모든 자식 요소에 margin-top을 적용 */
  > :not(:first-child) {
    margin-top: 40px;
  }
`;

const Tagline = styled.p`
  margin-top: -10%;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
`;

const Catchphrase = styled.p`
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  line-height: 25px;
`;

export function Main() {
  return (
    <>
      <Container>
        <Slogan>
          <Tagline>
            Surf through English
            <br />
            Your Wave to Success Starts Here
          </Tagline>
          <Catchphrase>
            영어를 향한 파도를 타다
            <br />
            SURF와 함께라면 가능합니다
          </Catchphrase>
        </Slogan>
      </Container>
    </>
  );
}
