import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Task from "../task/Task";
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import DeleteSelected from "../deleteSelected/DeleteSelected";
import TaskApi from "../../api/taskApi";
import TaskModal from "../taskModal/TaskModal";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./todo.module.css";

const taskApi = new TaskApi();

function Todo() {

    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    useEffect(() => {
        taskApi.getAll().then((tasks) => {
            setTasks(tasks);
        });
    }, []);


    const onAddNewTask = (newTask) => {

        taskApi.add(newTask)
            .then((task) => {
                const tasksCopy = [...tasks];
                tasksCopy.push(task);
                setTasks(tasksCopy);
                setIsAddTaskModalOpen(false);
                toast.info('The task has been added successfully!');
            })
            .catch((err) => {
                toast.error(err.message)
            });
    };

    const onTaskDelete = (taskId) => {
        taskApi
            .delete(taskId)
            .then(() => {
                const newTasks = tasks.filter((task) => task._id !== taskId);
                setTasks(newTasks);
                if (selectedTasks.has(taskId)) {
                    const newSelectedTasks = new Set(selectedTasks);
                    newSelectedTasks.delete(taskId);
                    setSelectedTasks(newSelectedTasks);
                }
                toast.info('The task has been deleted successfully!');
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };


    const onTaskSelect = (taskId) => {
        const selectedTasksCopy = new Set(selectedTasks);
        if (selectedTasksCopy.has(taskId)) {
            selectedTasksCopy.delete(taskId);
        } else {
            selectedTasksCopy.add(taskId);
        }
        setSelectedTasks(selectedTasksCopy);
    };

    const deleteSelectedTasks = () => {
        taskApi
            .deleteMany([...selectedTasks])
            .then(() => {
                const newTasks = [];
                const deletedTasksCount = selectedTasks.size;
                tasks.forEach((task) => {
                    if (!selectedTasks.has(task._id)) {
                        newTasks.push(task);
                    }
                });
                setTasks(newTasks);
                setSelectedTasks(new Set());
                toast.info(`${deletedTasksCount} tasks have been deleted successfully!`);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const selectAllTasks = () => {
        const taskIds = tasks.map((task) => task._id);
        setSelectedTasks(new Set(taskIds));
    };

    const resetSelectedTasks = () => {
        setSelectedTasks(new Set());
    };


    return (

        <Container>
            <Row className="m-3">
                <Col xs={12} sm={4} className="text-center mb-2">
                    <Button
                        className={styles.addButton}
                        onClick={() => setIsAddTaskModalOpen(true)}
                    >
                        Add new task
                    </Button>
                </Col>
                <Col xs={12} sm={4} className="text-center mb-2">
                    <Button
                        className={styles.selectButton}
                        onClick={selectAllTasks}
                    >
                        Select all
                    </Button>
                </Col>
                <Col xs={12} sm={4} className="text-center mb2">
                    <Button
                        className={styles.resetButton}
                        onClick={resetSelectedTasks}
                    >
                        Reset selected
                    </Button>
                </Col>
            </Row>

            <Row>
                {tasks.map((task) => {
                    return (
                        <Task
                            data={task}
                            key={task._id}
                            onTaskDelete={setTaskToDelete}
                            onTaskSelect={onTaskSelect}
                            checked={selectedTasks.has(task._id)}
                        />
                    );
                })}
            </Row>
            <DeleteSelected
                disabled={!selectedTasks.size}
                tasksCount={selectedTasks.size}
                onSubmit={deleteSelectedTasks}
            />
            {taskToDelete && (
                <ConfirmDialog
                    tasksCount={1}
                    onCancel={() => setTaskToDelete(null)}
                    onSubmit={() => {
                        onTaskDelete(taskToDelete);
                        setTaskToDelete(null);
                    }}
                />
            )}
            {
                isAddTaskModalOpen &&
                <TaskModal
                    onCancel={() => setIsAddTaskModalOpen(false)}
                    onSave={onAddNewTask}
                />
            }
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Container>
    );

}

export default Todo;