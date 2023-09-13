import PropTypes from "prop-types";
import "./ModalCustomChoice.styles.scss";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Button from "@mui/material/Button";

const ModalCustomChoice = (props) => {
  const { title, isIcon, message, question, onSubmitButtonClick, isShow2, onCloseModal } =
    props;

  const [isLoading, setIsLoading] = useState(false);
  const _isMounted = useRef(false);

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const onClickSubmit = async () => {
    if (_isMounted.current) {
      setIsLoading(true);
      await onSubmitButtonClick();
      setIsLoading(false);
    }
  };

  return (
    <Modal
      id={"ModalCustomChoice"}
      // show={isShowModal}
      show={isShow2}
      animation={true}
      centered
      size={"sm"}
    >
      <Modal.Header closeButton={false}>
        {isIcon ? (
          <div className="psc-choise-icon-header">{title}</div>
        ) : (
          <Modal.Title className="align-items-center m-0">
            <h4 className="m-0">{title}</h4>
          </Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body className="p-2">
        <label className="d-flex justify-content-center">{message}</label>
        <br />
        <label className="text-center font-weight-bold d-flex justify-content-center">
          {question}
        </label>
      </Modal.Body>
      <Modal.Footer className="modal-btn-container-grid-fractional">
        <Button
          className="m-1"
          variant="contained"
          onClick={onClickSubmit}
          disabled={isLoading}
        >
          Yes
        </Button>
        <Button
          className="m-1"
          variant="contained"
          color="error"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalCustomChoice.propTypes = {
  title: PropTypes.any,
  isIcon: PropTypes.bool,
  isShow2: PropTypes.bool,
  message: PropTypes.any,
  question: PropTypes.any,
  submitButtonText: PropTypes.any,
  onSubmitButtonClick: PropTypes.func,
  onCloseModal: PropTypes.func,
};

ModalCustomChoice.defaultProps = {
  onSubmitButtonClick: () => { },
  onCloseModal: () => { },
};

export default ModalCustomChoice;
