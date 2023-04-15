import { useState } from "react";
import { Button } from "react-bootstrap";
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import styles from "./deleteSelected.module.css";

function DeleteSelected(props) {

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const toggleConfirmDialog = () => {
        setIsConfirmDialogOpen(!isConfirmDialogOpen);
    };


    return (
        <>
            <Button
                className={styles.deleteSelected}
                onClick={toggleConfirmDialog}
                disabled={props.disabled}
            >
                Delete selected
            </Button>
            {isConfirmDialogOpen && (
                <ConfirmDialog
                    tasksCount={props.tasksCount}
                    onCancel={toggleConfirmDialog}
                    onSubmit={() => {
                        props.onSubmit();
                        toggleConfirmDialog();
                    }}
                />
            )}
        </>
    );
}

export default DeleteSelected;