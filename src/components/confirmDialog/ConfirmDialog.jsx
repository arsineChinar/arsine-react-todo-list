import PropTypes from 'prop-types';
import { Modal, Button } from "react-bootstrap";
import styles from "./confirmDialog.module.css";


function ConfirmDialog(props) {
  return (
    <Modal
      size="md"
      show={true}
      onHide={props.onCancel}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure to delete {props.tasksCount} {props.tasksCount > 1 ? 'tasks' : 'task'}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className="d-flex justify-content-evenly">
          <Button
            className={styles.deleteButton}
            onClick={props.onSubmit}
          >
            Delete
          </Button>
          <Button
            className={styles.cancelButton}
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

ConfirmDialog.propTypes = {
  tasksCount: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ConfirmDialog;