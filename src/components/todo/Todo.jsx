import { Component } from "react";
import {
    Container,
    Row,
    Col,
    InputGroup,
    Form,
    Button,
    Card
} from "react-bootstrap";
import { idGenerator } from "../../utils/helpers";
import Task from "../task/Task";
import styles from "./todo.module.css";

class Todo extends Component {
    state = {
        tasks: [],
        newTaskTitle: "",
    };

    handleInputChange = (event) => {
        const newTaskTitle = event.target.value;
        this.setState({
            newTaskTitle
        });
    };

    handleInputKeyDown = (event) => {
        if(event.key === "Enter"){
            this.addNewTask();
        }
    };

    addNewTask = () => {
        const trimmedTitle = this.state.newTaskTitle.trim();
    if(!trimmedTitle){
      return;
    }
        const newTask = {
            id: idGenerator(),
            title: trimmedTitle
        };
        const tasks = [...this.state.tasks];
        tasks.push(newTask);
        this.setState({
            tasks,
            newTaskTitle: '',
        });
    };

    render() {

        const isAddNewTaskButtonDisabled = !this.state.newTaskTitle.trim();

        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs="12" sm="8" md="6">
                        <InputGroup className="mb-3 mt-4">
                            <Form.Control
                                placeholder="Task Title"
                                onChange={this.handleInputChange}
                                onKeyDown={this.handleInputKeyDown}
                                value={this.state.newTaskTitle}
                            />
                            <Button
                                className={styles.addButton}
                                onClick={this.addNewTask}
                                disabled={isAddNewTaskButtonDisabled}
                            >
                                Add
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    {this.state.tasks.map((task) => {
                        return (
                            <Task data={task} key={task.id} />
                        );
                    })}
                </Row>
            </Container>
        );
    }
}

export default Todo;