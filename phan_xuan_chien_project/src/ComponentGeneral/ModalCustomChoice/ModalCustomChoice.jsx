import PropTypes from "prop-types";
import "./ModalCustomChoice.styles.scss";
import { CButton, CLabel, CSpinner } from "@coreui/react";
import { FaExclamationTriangle, FaCheck, FaTimes } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Translation } from "react-i18next";
import { useEffect } from "react";
import { useRef } from "react";

const languageResource = {
  GeneralConfiguration_Close: "Đóng",
  GeneralConfiguration_Confirm: "Xác nhận",
};

const ModalCustomChoice = (props) => {
  const {
    title,
    isIcon,
    message,
    question,
    submitButtonText,
    onSubmitButtonClick,
  } = props;

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
    <Translation>
      {(t) => (
        <Modal
          id={"ModalCustomChoice"}
          show={isShowModal}
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
            <CLabel className="d-flex justify-content-center">{message}</CLabel>
            <br />
            <CLabel className="text-center font-weight-bold d-flex justify-content-center">
              {question}
            </CLabel>
            <br />
            {strError && (
              <CLabel className="text-center text-danger d-flex justify-content-center">
                {strError}
              </CLabel>
            )}
          </Modal.Body>
          <Modal.Footer className="modal-btn-container-grid-fractional">
            <CButton
              color="primary"
              onClick={onClickSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <CSpinner
                  className="mr-2"
                  tag="span"
                  size="sm"
                  color="secondary"
                />
              ) : (
                <FaCheck className="mb-1 mr-1" size="13" />
              )}{" "}
              {/* {submitButtonText ?? t(languageResource.GeneralConfiguration_Confirm)} */}
              Yes
            </CButton>
            <CButton color="danger" onClick={onCloseModal}>
              <FaTimes size="13" className="mb-1 mr-1" />
              {/* {t(languageResource.GeneralConfiguration_Close)} */}
              Cancel
            </CButton>
          </Modal.Footer>
        </Modal>
      )}
    </Translation>
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
  title: <FaExclamationTriangle size={20} />,
};

export default ModalCustomChoice;
