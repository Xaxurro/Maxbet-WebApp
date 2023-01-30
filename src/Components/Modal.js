import "./Modal.css"
import Button from "./Button";
import styled from "styled-components";


const ContenedorModal = styled.div`
  border-Radius: 10px;
  
`

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <ContenedorModal className="modal-main">
          {children}
          <Button type="button" onClick={handleClose}>
            Cerrar
          </Button>
        </ContenedorModal>
      </div>
    );
  };

  export default Modal