import styled, { keyframes } from "styled-components";
import wave from "./image/wave.png";
const Container = styled.div`
  width: 100%;
  height: calc(100vh - 654px);
  position: relative;
  background-color: #3182f6;
  overflow: hidden;
`;
const waveAni = keyframes`
0%{
  background-position-x: 0;
  background-position-x: 1000px;
}`;
const waveAni2 = keyframes`
0%{
  background-position-x: 0;
  background-position-x: -1000px;
}
`;
const Wave = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-image: url(${wave});
  background-size: 1000px 100px;
  &.wave1 {
    animation: ${waveAni} 30s linear infinite;
    z-index: 1000;
    opacity: 1;
    animation-delay: 0s;
  }
  &.wave2 {
    animation: ${waveAni2} 15s linear infinite;
    z-index: 999;
    opacity: 0.5;
    animation-delay: -5s;
  }
  &.wave3 {
    animation: ${waveAni} 30s linear infinite;
    z-index: 998;
    opacity: 0.2;
    animation-delay: -2s;
    bottom: 5px;
  }
  &.wave4 {
    animation: ${waveAni2} 15s linear infinite;
    z-index: 997;
    opacity: 0.7;
    animation-delay: -5s;
    bottom: 10px;
  }
`;

export function TestWave() {
  return (
    <>
      <Container>
        <Wave className="wave1"></Wave>
        <Wave className="wave2"></Wave>
        <Wave className="wave3"></Wave>
        <Wave className="wave4"></Wave>
      </Container>
    </>
  );
}
