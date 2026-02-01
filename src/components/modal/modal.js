// import style from "./modal.module.css";
import Modal from "react-modal";
import { useHabitContext } from "../../context/habitContext";

Modal.setAppElement("#root");

export default function ModalWrapper({ children }) {

  const { isModalOpen, setIsModalOpen} = useHabitContext();
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const customStyles = {
    content: {
      width: "95%",
      maxWidth: "572px",
      top: "50%",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      height: "fit-content",
      maxHeight: "90vh",
      background: "rgba(239, 239, 239, 0.85)",
      border: "0",
      borderRadius: "15px",
      padding: "2rem",
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      {children}
    </Modal>
  );
}
