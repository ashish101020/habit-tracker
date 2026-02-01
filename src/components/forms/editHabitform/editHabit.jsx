import styles from "./addHabit.module.css";
import Button from "../../Button/Button";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useHabitContext } from "../../../context/habitContext";

export default function EditHabitForm() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    setIsModalOpen,
    isOpenEditor,
    setIsOpenEditor,
    editingHabit,
    setEditingHabit,
    setHabits,
    description,
    setDescription,
  } = useHabitContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editingHabit) return;

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === editingHabit.id
          ? { ...habit, description }
          : habit
      )
    );

    enqueueSnackbar("Description updated!", { variant: "success" });

    setEditingHabit(null);
    setDescription("");
    setIsOpenEditor(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsOpenEditor(false);
    setIsModalOpen(false);
    setEditingHabit(null);
  };

  useEffect(() => {
    if (editingHabit) {
      setDescription(editingHabit.description);
    }
  }, [editingHabit, setDescription]);

  return (
    <div className={styles.formWrapper}>
      <h3>Edit Habit</h3>

      <form onSubmit={handleSubmit}>
        <input type="date" value={editingHabit?.date || ""} disabled />

        <label>
          <input
            type="checkbox"
            checked={editingHabit?.habits.includes("reading") || false}
            disabled
          />
          Reading
        </label>

        <label>
          <input
            type="checkbox"
            checked={editingHabit?.habits.includes("exercise") || false}
            disabled
          />
          Exercise
        </label>

        <label>
          <input
            type="checkbox"
            checked={editingHabit?.habits.includes("meditation") || false}
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

        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="submit" variant="primary" shadow>
            Save
          </Button>

          <Button variant="secondary" shadow handleClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
