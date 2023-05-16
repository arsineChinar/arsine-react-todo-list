import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Task from "../../components/task/Task";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";
import DeleteSelected from "../../components/deleteSelected/DeleteSelected";
import TaskApi from "../../api/taskApi";
import TaskModal from "../../components/taskModal/TaskModal";
import Filters from "../../components/filters/Filters";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./todo.module.css";

const taskApi = new TaskApi();

function Todo() {

    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [editableTask, setEditableTask] = useState(null);

    const getTasks = (filters) => {
        taskApi
            .getAll(filters)
            .then((tasks) => {
                setTasks(tasks);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    useEffect(() => {
        getTasks();
    }, []);


    const onAddNewTask = (newTask) => {

        taskApi
            .add(newTask)
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

    const onEditTask = (editedTask) => {
        taskApi
            .update(editedTask)
            .then((task) => {
                const newTasks = [...tasks];
                const foundIndex = newTasks.findIndex((t) => t._id === task._id);
                newTasks[foundIndex] = task;
                toast.info(`Task has been updated successfully!`);
                setTasks(newTasks);
                setEditableTask(null);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const onFilter = (filters) => {
        getTasks(filters);
    };

    return (

        <Container>
            <Row>
               
            </Row>
            <Row className={`${styles.buttonsLocation} mb-2`}>
                <Col xs={4} className={`${styles.location} mb-2`}>
                    <Button
                        className={styles.addButton}
                        onClick={() => setIsAddTaskModalOpen(true)}
                    >
                        Add new task
                    </Button>
                </Col>
                <Col xs={4} className={`${styles.location} mb-2`}>
                    <Button
                        className={styles.selectButton}
                        onClick={selectAllTasks}
                    >
                        Select all
                    </Button>
                </Col>
                <Col xs={4} className={`${styles.location} mb-2`}>
                    <Button
                        className={styles.resetButton}
                        onClick={resetSelectedTasks}
                    >
                        Reset selected
                    </Button>
                </Col>
            </Row>
            <Row>
                <Filters onFilter={onFilter} />
            </Row>
            <Row>
                {tasks.map((task) => {
                    return (
                        <Task
                            data={task}
                            key={task._id}
                            onTaskDelete={setTaskToDelete}
                            onTaskSelect={onTaskSelect}
                            onTaskEdit={setEditableTask}
                            checked={selectedTasks.has(task._id)}
                            onStatusChange={onEditTask}
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
                isAddTaskModalOpen && (
                    <TaskModal
                        onCancel={() => setIsAddTaskModalOpen(false)}
                        onSave={onAddNewTask}
                    />
                )}
            {
                editableTask && (
                    <TaskModal
                        onCancel={() => setEditableTask(null)}
                        onSave={onEditTask}
                        data={editableTask}
                    />
                )}
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