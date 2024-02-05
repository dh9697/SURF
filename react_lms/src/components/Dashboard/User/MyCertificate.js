import styled from "styled-components";
import 귀찮네 from "../../image/귀찮네.webp";

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
      <CertificateImageStyled src={귀찮네} alt="수료증 이미지" />
    </>
  );
}
