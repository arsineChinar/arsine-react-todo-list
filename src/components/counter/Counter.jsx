import styles from "./counter.module.css";
import { Button } from "react-bootstrap";
import { useState } from "react";

function Counter() {
    const [values, setValues] = useState({
        counter: 0,
        text: "Zero"
    });

    const decreaseNumber = () => {
        const newCounter = values.counter - 1;
        const newText = (newCounter <= 0) ? (newCounter === 0 ? "Zero" : "Negative") : "Positive";
        setValues({
            counter: newCounter,
            text: newText
        })
    };

    const increaseNumber = () => {
        const newCounter = values.counter + 1;
        const newText = (newCounter >= 0) ? (newCounter === 0 ? "Zero" : "Positive") : "Negative";

        setValues({
            counter: newCounter,
            text: newText
        })
    };

    return (
        <div className={styles.counterBody}>
            <Button
                className="m-2 btn-warning"
                onClick={decreaseNumber}
            >
                -
            </Button>
            <span
                className={styles.counter}
            >
                {values.counter}
            </span>
            <Button
                className="m-2 btn-warning"
                onClick={increaseNumber}
            >
                +
            </Button>

            <div className={styles.counter}>
                {values.text}
            </div>
        </div>

    );
}

export default Counter;