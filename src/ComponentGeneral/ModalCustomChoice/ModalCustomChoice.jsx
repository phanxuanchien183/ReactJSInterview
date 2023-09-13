import PropTypes from "prop-types";
import "./ModalCustomChoice.styles.scss";
// import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Button from "@mui/material/Button";

const ModalCustomChoice = (props) => {
  const { title, isIcon, message, question, onSubmitButtonClick } = props;

  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [strError, setStrError] = useState();
  const _isMounted = useRef(false);

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const onCloseModal = () => {
    _isMounted.current && setIsShowModal(false);
  };

  const onOpenModal = () => {
    _isMounted.current && setIsShowModal(true);
  };

  const onClickSubmit = async () => {
    if (_isMounted.current) {
      setIsLoading(true);
      await onSubmitButtonClick();
      setIsLoading(false);
    }
  };
  const setError = (value) => {
    setStrError(value);
  };
  if (props.refs?.current !== undefined && props.refs?.current !== null) {
    props.refs.current = {
      setIsLoading,
      onOpenModal,
      onCloseModal,
      onClickSubmit,
      setError,
    };
  }

  return (
    <></>
    // <Modal
    //   id={"ModalCustomChoice"}
    //   show={isShowModal}
    //   animation={true}
    //   centered
    //   size={"sm"}
    // >
    //   <Modal.Header closeButton={false}>
    //     {isIcon ? (
    //       <div className="psc-choise-icon-header">{title}</div>
    //     ) : (
    //       <Modal.Title className="align-items-center m-0">
    //         <h4 className="m-0">{title}</h4>
    //       </Modal.Title>
    //     )}
    //   </Modal.Header>
    //   <Modal.Body className="p-2">
    //     <label className="d-flex justify-content-center">{message}</label>
    //     <br />
    //     <label className="text-center font-weight-bold d-flex justify-content-center">
    //       {question}
    //     </label>
    //     <br />
    //     {strError && (
    //       <label className="text-center text-danger d-flex justify-content-center">
    //         {strError}
    //       </label>
    //     )}
    //   </Modal.Body>
    //   <Modal.Footer className="modal-btn-container-grid-fractional">
    //     <Button
    //       className="m-1"
    //       variant="contained"
    //       onClick={onClickSubmit}
    //       disabled={isLoading}
    //     >
    //       Yes
    //     </Button>{" "}
    //     <Button
    //       className="m-1"
    //       variant="contained"
    //       color="error"
    //       onClick={onCloseModal}
    //     >
    //       Cancel
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
  );
};

ModalCustomChoice.propTypes = {
  refs: PropTypes.any.isRequired,
  title: PropTypes.any,
  isIcon: PropTypes.bool,
  message: PropTypes.any,
  question: PropTypes.any,
  submitButtonText: PropTypes.any,
  onSubmitButtonClick: PropTypes.func,
};

ModalCustomChoice.defaultProps = {
  onSubmitButtonClick: () => {},
};

export default ModalCustomChoice;
