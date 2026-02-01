import styles from "./addHabit.module.css";
import Button from "../../Button/Button";
import { useSnackbar } from "notistack";
import { useHabitContext } from "../../../context/habitContext";

export default function AddHabitForm() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    date,
    setDate,
    description,
    setDescription,
    selectedHabits,
    setSelectedHabits,
    setCategoryHabits,
    setHabits,
    setIsModalOpen,
    setIsOpenHabitInput
  } = useHabitContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedHabits.length === 0) {
      enqueueSnackbar("Please select at least one habit", { variant: "warning" });
      return;
    }

    const newEntry = {
      id: Date.now(),
      date,
      description,
      habits: selectedHabits,
    };

    // Save history
        setHabits((prev) => [...prev, newEntry]);

    // Update totals
    setCategoryHabits((prev) => {
      const updated = { ...prev };
      selectedHabits.forEach((habit) => {
        updated[habit] += 1;
      });
      return updated;
    });

    // Reset form
    setSelectedHabits([]);
    setDescription("");
    setDate("");
    setIsOpenHabitInput(false);

    enqueueSnackbar("Habit data added!", { variant: "success" });
  };

  const handleCancel=() => {setIsOpenHabitInput(false)
              setIsModalOpen(false)};

  const handleCheckboxChange = (habit) => {
    setSelectedHabits((prev) =>
      prev.includes(habit) ? prev.filter((h) => h !== habit) : [...prev, habit]
    );
  };

  return (
    <div className={styles.formWrapper}>
      <h3>What Did You Do Today</h3>

      <form onSubmit={handleSubmit}>
        {/* Date Input */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {/* Checkboxes */}
        <label>
          <input
            type="checkbox"
            name="reading"
            checked={selectedHabits.includes("reading")}
            onChange={() => handleCheckboxChange("reading")}
          />
          Reading
        </label>

        <label>
          <input
            type="checkbox"
            name="exercise"
            checked={selectedHabits.includes("exercise")}
            onChange={() => handleCheckboxChange("exercise")}
          />
          Exercise
        </label>

        <label>
          <input
            type="checkbox"
            name="meditation"
            checked={selectedHabits.includes("meditation")}
            onChange={() => handleCheckboxChange("meditation")}
          />
          Meditation
        </label>

        {/* Description */}
        <input
          type="text"
          placeholder="Enter a short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="submit" variant="primary" shadow>
            Submit
          </Button>

          <Button variant="secondary" shadow handleClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
