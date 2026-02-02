import React from "react";
import Button from "../Button/Button";
import styles from "./Card.module.css";
import { useHabitContext } from "../../context/habitContext";

function Card({ buttonType, success = true }) {
  const { setIsOpenHabitInput, setIsModalOpen, setIsOpenEditor } = useHabitContext();

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Update Today's Progress</h3>
      <Button
        handleClick={() => {
          setIsModalOpen(true);
          setIsOpenHabitInput(true);
          setIsOpenEditor(false);
        }}
        style={buttonType}
      >
        + Add data
      </Button>
    </div>
  );
}

export default Card;
