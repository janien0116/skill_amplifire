import { Modal, Button } from 'react-bootstrap';

const ConfirmationDialog = (props) => {
  const { show, message, onConfirm, onCancel } = props;

  return (
    <Modal show={show} onHide={onCancel} id="modal-handler">
        <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body id="dialog">{message}</Modal.Body>
        <Modal.Footer className='p-0'>
            <Button variant="secondary" onClick={onCancel}>
            Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm}>
            Confirm
            </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationDialog