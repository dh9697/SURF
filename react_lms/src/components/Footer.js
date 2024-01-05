import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  width: 100vw;
  /* overflow-x: hidden;
  overflow-y: hidden; */
  /* min-height: calc(100vh - 30vh); // Footer 높이만큼 뺀 값으로 최소 높이 설정 */
  /* padding-bottom: 30vh; // Footer 높이만큼 padding-bottom 추가 */
`;

const FooterBox = styled.div`
  width: 100vw;
  height: 30vh;
  background-color: lightgray;
  position: absolute; // 절대 위치 설정
  bottom: 0; // 화면의 하단에 위치
  left: 0; // 왼쪽 끝에 위치
  z-index: 1000; // 다른 요소 위에 표시
`;

export function Footer() {
  const [footerPosition, setFooterPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      if (scrollY + windowHeight >= documentHeight - 30) {
        setFooterPosition(0);
      } else {
        setFooterPosition(-1000); // footer가 화면 밖으로 이동
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Container>
        <FooterBox></FooterBox>
      </Container>
    </>
  );
}
