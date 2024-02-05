import styled from "styled-components";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

const StartBtn = styled(NavLink)``;

export function LevelTestMain() {
  return (
    <>
      <h1>LEVEL TEST</h1>
      <p>
        SURF만의 기술로 정확한 당신의 영어 레벨을
        <br /> 읽기, 듣기, 쓰기의 세 가지 영역으로 진단해 드립니다.
      </p>
      <StartBtn to={"/level_test_start"}>무료 레벨 테스트 시작</StartBtn>
      <h2>나에게 맞는 진짜 영어를 찾아보세요</h2>
      <p>내 영어 실력은 물론, 나에게 맞는 상품과 맞춤 강의를 제공합니다.</p>
      <button>나에게 맞는 강의 찾기</button>
    </>
  );
}
