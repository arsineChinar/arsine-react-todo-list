import {
    Col,
    Button,
    Card,
    Form
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css"

function Task(props) {
    const task = props.data;

    return (
        <Col xs={12} sm={6} md={4} lg={3}>
            <Card className={styles.card} border="primary" >
                <Card.Body>
                    <div className={styles.actionCheckbox}>
                        <Form.Check className={styles.selectTask} />
                    </div>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        Description
                    </Card.Text>
                    <div className={styles.actionButtons}>
                        <Button className={styles.editButton}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button  className={styles.deleteButton}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                    </div>

                </Card.Body>
            </Card>
        </Col>
    );
}

export default Task;