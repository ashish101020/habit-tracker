import styles from "./transcation.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";

export default function HabitCard({ details, handleDelete, handleEdit }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardInfo}>
          <p className={styles.cardTitle}>{details.description}</p>
          <div className={styles.habitList}>
            {details.habits.map((habit, index) => (
              <span key={index} className={styles.habitTag}>
                {habit }
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.cardInner}>
        <p className={styles.cardDate}>{details.date}</p>

        <div className={styles.cardButtonWrapper}>
          <button className={styles.cardDelete} onClick={handleDelete}>
            <IoMdCloseCircleOutline />
          </button>

          <button className={styles.cardEdit} onClick={handleEdit}>
            <MdOutlineModeEdit />
          </button>
        </div>
      </div>
    </div>
  );
}
