import styled from "styled-components";
// import { TestWave } from "./TestWave";

const Container = styled.div``;

const IntroduceSurf = styled.div`
  padding: 50px 200px;
  width: 100%;
  background-color: #3182f6;
  color: white;
`;

const Introduce = styled.div`
  width: 100%;
  font-size: 18px;
  margin-bottom: 60px;
`;

const LeftText = styled.div`
  flex: 1;
  line-height: 2;
  padding: 10px;
  background-color: transparent;
  margin: 10px;
  &.left {
    text-align: left;
    width: 70%;
  }
`;

const RightText = styled.div`
  flex: 1;
  line-height: 2;
  padding: 10px;
  background-color: transparent;
  margin-left: auto;
  &.right {
    text-align: right;
    width: 70%;
  }
`;

const StyledH1 = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: white;
  /* 원하는 다른 스타일 속성들을 추가할 수 있습니다 */
`;

export function AboutSurf() {
  return (
    <>
      <Container>
        <IntroduceSurf>
          <Introduce>
            <LeftText className="left">
              <StyledH1>What is SURF?</StyledH1>
              사용자 맞춤형 영어 학습 경험을 제공하는 혁신적인 온라인
              플랫폼입니다. 우리의 플랫폼은 다양한 학습 리소스, 인터랙티브한
              콘텐츠, 그리고 실시간 피드백 시스템을 통해 학습자들이 자신만의
              학습 경로를 만들 수 있게 지원합니다.
            </LeftText>
            <RightText className="right">
              <StyledH1>Why Choose SURF?</StyledH1>
              SURF를 선택하는 이유는 단순히 영어 단어나 문법을 배울 목적을
              넘어서, 진정한 언어의 이해와 응용 능력을 키우기 위한 효과적인
              방법을 제공하기 때문입니다. 또한, SURF는 학습자의 관심사와 목표에
              맞게 맞춤화된 학습 경험을 제공하여 지루함 없이 지속적인 학습을
              가능하게 합니다.
            </RightText>
            <LeftText className="left">
              <StyledH1>Who is SURF For?</StyledH1>
              SURF를 선택하는 이유는 단순히 영어 단어나 문법을 배울 목적을
              넘어서, 진정한 언어의 이해와 응용 능력을 키우기 위한 효과적인
              방법을 제공하기 때문입니다. 또한, SURF는 학습자의 관심사와 목표에
              맞게 맞춤화된 학습 경험을 제공하여 지루함 없이 지속적인 학습을
              가능하게 합니다.
            </LeftText>
            <RightText className="right">
              <StyledH1>Where Can You Use SURF?</StyledH1>
              SURF는 온라인 기반으로 언제 어디서나 접근이 가능합니다. 모바일,
              태블릿, 데스크톱 등 다양한 디바이스에서 SURF의 리소스와 콘텐츠에
              쉽게 접근할 수 있어 학습의 유연성을 높여줍니다.
            </RightText>
            <LeftText className="left">
              <StyledH1>When to Use SURF?</StyledH1>
              SURF는 24/7 학습의 기회를 제공합니다. 사용자들은 자신의 시간과
              속도에 맞춰 언제든지 학습을 진행하고, 필요에 따라 학습 계획을
              조절할 수 있습니다.
            </LeftText>
            <RightText className="right">
              <StyledH1>How Does SURF Work?</StyledH1>
              SURF의 핵심 기능은 개인화된 학습 경험을 제공하는 것입니다. AI
              기반의 추천 시스템, 실시간 피드백 메커니즘, 그리고 다양한 학습
              모듈을 통해 사용자는 자신의 학습 스타일과 목표에 맞는 최적의 학습
              경로를 설정하고 실행할 수 있습니다. SURF와 함께라면, 언어 학습은
              지루한 과제가 아닌 즐거운 여정이 될 것입니다.
            </RightText>
          </Introduce>
        </IntroduceSurf>
      </Container>
    </>
  );
}
