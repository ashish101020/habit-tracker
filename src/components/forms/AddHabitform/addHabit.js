import styles from "./addHabit.module.css";
import Button from "../../Button/Button";
import { useSnackbar } from "notistack";
import { useHabitContext } from "../../../context/habitContext";
import { useEffect } from "react";

export default function AddHabitForm() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    date,
    setDate,
    description,
    setDescription,
    selectedHabits,
    setSelectedHabits,
    setHabits,
    setIsModalOpen,
    setIsOpenHabitInput,
    editingHabit,
    setEditingHabit,
    isOpenEditor,
    setIsOpenEditor,
  } = useHabitContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ---------------- EDIT MODE ----------------
    if (isOpenEditor) {
      if (!editingHabit) return;

      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === editingHabit.id ? { ...habit, description, selectedHabits } : habit
        )
      );

      enqueueSnackbar("Description updated!", { variant: "success" });

      setEditingHabit(null);
      setDescription("");
      setIsOpenEditor(false);
      setIsModalOpen(false);
      return;
    }

    // ---------------- ADD MODE ----------------
    if (selectedHabits.length === 0) {
      enqueueSnackbar("Please select at least one habit", {
        variant: "warning",
      });
      return;
    }

    const newEntry = {
      id: Date.now(),
      date,
      description,
      habits: selectedHabits,
    };

    setHabits((prev) => [...prev, newEntry]);

    setSelectedHabits([]);
    setDescription("");
    setDate("");
    setIsOpenHabitInput(false);
    setIsModalOpen(false);

    enqueueSnackbar("Adds data successfully", { variant: "success" });
  };

  const handleCancel = () => {
    setIsOpenHabitInput(false);
    setIsModalOpen(false);
    setIsOpenEditor(false);
    setEditingHabit(null);
    setDescription("");
  };

  const handleCheckboxChange = (habit) => {
    setSelectedHabits((prev) =>
      prev.includes(habit) ? prev.filter((h) => h !== habit) : [...prev, habit]
    );
  };

  useEffect(() => {
    if (editingHabit) {
      setDescription(editingHabit.description);
      setDate(editingHabit.date);
      setSelectedHabits(editingHabit.habits);
    }
  }, [editingHabit, setDescription, setDate, setSelectedHabits]);

  return (
    <div className={styles.formWrapper}>
      <h2>{isOpenEditor ? "Edit Habit" : "What Did You Do Today?"}</h2>

      <form onSubmit={handleSubmit}>
        {/* DATE */}
        <input
          type="date"
          value={date}
          name="date"
          onChange={(e) => !isOpenEditor && setDate(e.target.value)}
          required
          disabled={isOpenEditor}
        />

        {/* CHECKBOXES */}
        <div className={styles.checkboxGroup}>
          <label htmlFor="reading">
            <input
              id="reading"
              type="checkbox"
              name="reading"
              checked={selectedHabits.includes("reading")}
              // onChange={() => !isOpenEditor && handleCheckboxChange("reading")}
              onChange={() => handleCheckboxChange("reading")}
              disabled={isOpenEditor}
            />
            Reading
          </label>

          <label htmlFor="exercise">
            <input
              id="exercise"
              type="checkbox"
              name="exercise"
              checked={selectedHabits.includes("exercise")}
              // onChange={() => !isOpenEditor && handleCheckboxChange("exercise")}
              onChange={() => handleCheckboxChange("exercise")}
              disabled={isOpenEditor}
            />
            Exercise
          </label>

          <label htmlFor="meditation">
            <input
              id="meditation"
              type="checkbox"
              name="meditation"
              checked={selectedHabits.includes("meditation")}
              // onChange={() => !isOpenEditor && handleCheckboxChange("meditation")}
              onChange={() => handleCheckboxChange("meditation")}
              disabled={isOpenEditor}
            />
            Meditation
          </label>
        </div>

        {/* DESCRIPTION */}
        <input
          type="text"
          placeholder="Enter a short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="submit" variant="primary" shadow>
            {isOpenEditor ? "Update" : "Submit"}
          </Button>

          <Button variant="secondary" shadow handleClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
