// import ReactModal from "react-modal";
import { useState } from "react";

export function Modal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div>
        <button onClick={openModal}>Modal Open</button>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>모달 제목</h2>
          <p>모달 내용</p>
          <button onClick={closeModal}>닫기</button>
        </Modal>
      </div>
    </>
  );
}
