import styles from "./pagination.module.css";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

export default function Pagination({ updatePage, currentPage, totalPages }) {
  return (
    <div className={styles.paginationWrapper}>
      <button onClick={() => updatePage((p) => p - 1)} disabled={currentPage === 1}>
        <IoIosArrowRoundBack />
      </button>

      <p>{currentPage} / {totalPages}</p>

      <button onClick={() => updatePage((p) => p + 1)} disabled={currentPage === totalPages}>
        <IoIosArrowRoundForward />
      </button>
    </div>
  );
}
