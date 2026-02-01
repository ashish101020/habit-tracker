import styles from "./list.module.css";
import { useEffect, useState, useMemo } from "react";
import Pagination from "../pagination/pagination";
import HabitCard from "../transcation/transcation";
import { useHabitContext } from "../../context/habitContext";

export default function DataList() {
  const {
    habits,
    setHabits,
    setIsDisplayEditor,
    setIsModalOpen,
    setEditingHabit,
  } = useHabitContext();

  const [currentPage, setCurrentPage] = useState(1);
  const maxRecords = 3;

  const totalPages = Math.ceil(habits.length / maxRecords);

  const currentDatas = useMemo(() => {
    const startIndex = (currentPage - 1) * maxRecords;
    return habits.slice(startIndex, startIndex + maxRecords);
  }, [currentPage, habits]);

  const handleDelete = (id) => {
    setHabits((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
    setIsDisplayEditor(true);
  };

  // If last item on page deleted → go back one page
  useEffect(() => {
    if (currentPage > totalPages && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [habits, currentPage, totalPages]);

  return (
    <div className={styles.transactionsWrapper}>
      <h2>Recent Habit Completions</h2>

      {habits.length > 0 ? (
        <div className={styles.list}>
          <div>
            {currentDatas.map((d) => (
              <HabitCard
                key={d.id}
                details={d}
                handleDelete={() => handleDelete(d.id)}
                handleEdit={() => handleEdit(d)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              updatePage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className={styles.emptyTransactionsWrapper}>
          <p>No habits tracked yet!</p>
        </div>
      )}
    </div>
  );
}
