import {Modal, Button} from "react-bootstrap";
import styles from "./confirmDialog.module.css"
function ConfirmDialog(){
    return(
        <Modal
        size="sm"
        show={false}
        onHide={() => {}}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure to delete the selected tasks?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <div className="d-flex justify-content-evenly">
        <Button className={styles.deleteButton}>Delete</Button>
        <Button className={styles.cancelButton}>Cancel</Button>
        </div>
        </Modal.Body>
      </Modal>
    );
}

export default ConfirmDialog;