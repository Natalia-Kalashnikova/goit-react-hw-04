import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { AiFillLike } from "react-icons/ai";

Modal.setAppElement("#root");

  const ImageModal=({ isOpen, onRequestClose, imageInfo })=> {
  const { imageUrl, altDescription, authorName, likes } = imageInfo || {};

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      overlayClassName="Overlay"
      className="Modal"
    >
      {imageUrl && (
        <div className={css.container}>
          <img src={imageUrl} alt={altDescription} />
          <ul className={css.list}>
            <li className={css.item}><AiFillLike /> <span className={css.text}>{likes}</span></li>            
            <li className={css.item}>Author:<p className={css.text}> {authorName}</p></li>
          </ul>
        </div>
      )}
    </Modal>
  );
}

export default ImageModal;

