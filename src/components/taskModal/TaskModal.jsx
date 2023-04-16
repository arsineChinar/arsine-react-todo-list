import { useState, useEffect } from "react";
import { Col, InputGroup, Form, Button, Modal } from "react-bootstrap";
import styles from "./taskModal.module.css";


function TaskModal(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    return (

        <Modal
            size="md"
            show={true}
            onHide={props.onCancel}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className="d-flex justify-content-evenly">
                    <Button
                        className={styles.saveButton}
                        onClick={props.onSubmit}
                    >
                        Save
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

export default TaskModal;