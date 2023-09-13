import { memo } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

function CustomModal(props) {
  const {
    isShow,
    renderHeaderModal,
    renderBodyModal,
    renderFooterModal,
    isAnimation,
    modalSize,
    componentModalID,
    footerPosition,
    showCloseBtn,
    isScrollable,
  } = props;

  return (
    <Modal
      id={componentModalID}
      size={modalSize}
      show={isShow}
      animation={isAnimation}
      centered
      scrollable={isScrollable}
    >
      <Modal.Header closeButton={showCloseBtn}>
        <Modal.Title>{renderHeaderModal()}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">{renderBodyModal()}</Modal.Body>
      <Modal.Footer style={{ display: "flex", justifyContent: footerPosition }}>
        {renderFooterModal()}
      </Modal.Footer>
    </Modal>
  );
}

const arrFooterPosition = ["center", "left", "right"];
const arrModalSize = ["xl", "sm", "lg"];

CustomModal.propTypes = {
  showCloseBtn: PropTypes.bool,
  isShow: PropTypes.bool,
  footerPosition: PropTypes.oneOf(arrFooterPosition),
  modalSize: PropTypes.oneOf(arrModalSize),
  isAnimation: PropTypes.bool,

  componentModalID: PropTypes.string,

  renderHeaderModal: PropTypes.func,
  renderBodyModal: PropTypes.func,
  renderFooterModal: PropTypes.func,
  isScrollable: PropTypes.string,
};

CustomModal.defaultProps = {
  footerPosition: arrFooterPosition[0],
  modalSize: arrModalSize[0],
  showCloseBtn: false,
  renderHeaderModal: () => {},
  renderBodyModal: () => {},
  renderFooterModal: () => {},
};

export default memo(CustomModal);
