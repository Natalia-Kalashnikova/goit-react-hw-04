import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { AiFillLike } from "react-icons/ai";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
};

  const ImageModal=({ isOpen, onClose, regular, altDescription, likes, user })=> {
     return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image Modal"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      overlayClassName={css.Overlay}
      className={css.Modal}
      bodyOpenClassName={css.modalOpen}
    >      
        <div className={css.container}>
          <img className={css.img} src={regular} alt={altDescription} />
          <ul className={css.list}>
            <li className={css.item}><AiFillLike /> <span className={css.text}>{likes}</span></li>
            <li className={css.item}>Author:<p className={css.text}> {user}</p></li>
          </ul>
        </div>      
    </Modal>
  );
}

export default ImageModal;