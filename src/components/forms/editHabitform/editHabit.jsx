import styles from "./addHabit.module.css";
import Button from "../../Button/Button";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useHabitContext } from "../../../context/habitContext";

export default function AddHabitForm() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    setIsDisplayEditor,
    setIsModalOpen,
    isDisplayEditor,
    setEditingHabit,
    setHabits,
    setDescription,
    description,
  } = useHabitContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isDisplayEditor) return;

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === isDisplayEditor.id ? { ...habit, description } : habit,
      ),
    );

    enqueueSnackbar("Description updated!", { variant: "success" });

    setEditingHabit(null);
    setDescription("");
    setIsDisplayEditor(false);
  };

  const handleCancel=() => {setIsDisplayEditor(false)
              setIsModalOpen(false)};
      

  useEffect(() => {
    if (isDisplayEditor) {
      setDescription(isDisplayEditor.description);
    }
  }, [isDisplayEditor, setDescription]);

  return (
    <div className={styles.formWrapper}>
      <h3>Edit Habit</h3>
      <form onSubmit={handleSubmit}>
        <input type="date" value={isDisplayEditor?.date || ""} disabled />

        <label>
          <input
            type="checkbox"
            checked={isDisplayEditor?.habits.includes("reading")}
            disabled
          />
          Reading
        </label>

        <label>
          <input
            type="checkbox"
            checked={isDisplayEditor?.habits.includes("exercise")}
            disabled
          />
          Exercise
        </label>

        <label>
          <input
            type="checkbox"
            checked={isDisplayEditor?.habits.includes("meditation")}
            disabled
          />
          Meditation
        </label>

        <input
          type="text"
          placeholder="Update description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div style={{ display: "flex" }}>
          <Button type="submit" style="primary" shadow>
            Upload
          </Button>

          <Button
            style="secondary"
            shadow
            handleClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
