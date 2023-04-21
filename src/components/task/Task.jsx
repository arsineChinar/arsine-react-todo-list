import {memo} from "react";
import PropTypes from 'prop-types';
import { formatDate } from "../../utils/helpers";
import { Col, Button, Card, Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "./task.module.css"

function Task(props) {
    const task = props.data;

    return (
        <Col xs={12} sm={6} md={4} lg={3}>
            <Card className={styles.card}>
                <Card.Body>
                    <div className={styles.actionCheckbox}>
                        <Form.Check 
                        className={styles.selectTask} 
                        onClick={()=>props.onTaskSelect(task._id)}
                        />
                    </div>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                    <Card.Text>Status: {task.status}</Card.Text>
                    <Card.Text>Created At: {formatDate(task.created_at)}</Card.Text>
                    <Card.Text>Deadline: {formatDate(task.date)}</Card.Text>
                    <div className={styles.actionButtons}>
                        <Button className={styles.editButton}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button  
                        className={styles.deleteButton}
                        onClick={()=>props.onTaskDelete(task._id)}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                    </div>

                </Card.Body>
            </Card>
        </Col>
    );
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    onTaskSelect: PropTypes.func.isRequired,
    };

export default memo(Task);