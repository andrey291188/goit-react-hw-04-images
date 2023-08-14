import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from '../styles.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root')

const Modal = ({imgModal, toggleModal}) => {

  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const backdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

    return createPortal(
      <div className={css.Overlay} onClick={backdropClick}>
        <div className={css.Modal}>
          <img src={imgModal.largeImageURL} alt={imgModal.tags} />
        </div>
      </div>, modalRoot);
};

export default Modal;

Modal.propTypes = {
  imgModal: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
}