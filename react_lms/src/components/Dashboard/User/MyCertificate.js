import styled from "styled-components";
import suryo from "../../image/suryo.webp";

const Header = styled.div``;
const CertificateImageStyled = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

export function MyCertificate() {
  return (
    <>
      <Header>수료증 화면을 수정해야 돼요</Header>
      <CertificateImageStyled src={suryo} alt="수료증 이미지" />
    </>
  );
}
