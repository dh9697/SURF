import styled from "styled-components";
import wave from "../image/wave.png";

const Container = styled.div`
  width: 100%;
  & .innerWrapper {
    display: flex;
    flex-direction: column;
    flex: 1 1 0px;
    gap: 2rem;
  }
`;

const InputBox = styled.div`
  display: flex;
  gap: 1rem;
  height: 50px;
  & .date {
    text-align: center;
    line-height: 50px;
    width: 100px;
    background-color: lightblue; // 배경색을 원하는 색상으로 설정
    border: none;
  }
  & input {
    flex: 1;
  }
`;

const RealTimeBox = styled.div`
  height: 300px;
  background-color: #3182f6;
  & .wave {
    height: 100%;
    background: url(${wave}) no-repeat center;
    .title {
      height: 50px;
    }
    .resolve {
      height: 250px;
      background-color: gray;
      opacity: 0.5;
      padding: 0 40px;
    }
  }
`;

const AccumBox = styled.div``;

export function TodayResolutions() {
  return (
    <>
      <Container>
        <div className="innerWrapper">
          <h1>오늘의 각오</h1>
          <InputBox>
            <div className="date">오늘 날짜</div>
            <input type="text" placeholder="오늘의 각오를 적어 주세요!" />
            <button>파이팅</button>
          </InputBox>
          <RealTimeBox>
            <div className="wave">
              <div className="title">실시간 오늘의 각오</div>
              <div className="resolve">아 춥다 시발</div>
            </div>
          </RealTimeBox>
          <AccumBox>
            <div>지금까지의 오늘의 각오</div>
            <table>
              <colgroup>
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 300 + "px" }} />
                <col style={{ width: 130 + "px" }} />
                <col style={{ width: 130 + "px" }} />
              </colgroup>
              <tbody>
                <tr>
                  <td>9342</td>
                  <td>당장 널 만나러 가지 않으면</td>
                  <td>이찬혁</td>
                  <td>2024-02-05</td>
                </tr>
              </tbody>
            </table>
          </AccumBox>
        </div>
      </Container>
    </>
  );
}
