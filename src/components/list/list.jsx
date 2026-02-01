import styles from "./list.module.css";
import { useEffect, useState } from "react";
import Pagination from "../pagination/pagination";
import HabitCard from "../transcation/transcation";
import { useHabitContext } from "../../context/habitContext";

export default function DataList() {

  const { habits, setHabits, setIsDisplayEditor, setIsModalOpen } = useHabitContext();

  
  const [currentDatas, setcurrentDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const maxRecords = 3;
  const [totalPages, setTotalPages] = useState(0);

  const handleDelete = (id) => {
    setHabits((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    setIsModalOpen(true)
    setIsDisplayEditor(true);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * maxRecords;
    const endIndex = Math.min(currentPage * maxRecords, habits.length);

    setcurrentDatas([...habits].slice(startIndex, endIndex));
    setTotalPages(Math.ceil(habits.length / maxRecords));
  }, [currentPage, habits]);

  // update page if all items on current page have been deleted
  useEffect(() => {
    if (totalPages < currentPage && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [totalPages]);

  return (
    <div className={styles.transactionsWrapper}>
      <h2>Recent Habit Completions</h2>

      {habits.length > 0 ? (
        <div className={styles.list}>
          <div>
            {currentDatas.map((d) => (
              <HabitCard
                details={d}
                key={d.id}
                handleDelete={() => handleDelete(d.id)}
                handleEdit={() => handleEdit(d.id)}
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
          <p>No transactions!</p>
        </div>
      )}

    </div>
  );
}
