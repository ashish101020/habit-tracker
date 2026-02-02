import Card from "./card/card";
import styles from "./HabitTracker.module.css";
import HabitList from "./list/list";
import Modal from "./modal/modal";
import PieChart from "./PieChart/piechart";
import BarChart from "./Barchart/Barchart";
import AddHabitForm from "./forms/AddHabitform/addHabit";

function HabitTracker() {
  return (
    <div className={styles.container}>
      <h1>Habit Tracker</h1>

      {/* Cards and pie chart wrapper */}

      <div className={styles.cardsWrapper}>
        <Card />

        <PieChart />

        <BarChart />
      </div>

      <div className={styles.habitsWrapper}>
        <HabitList />
      </div>

      {/* Modals */}

      <Modal>
        <AddHabitForm />
      </Modal>
    </div>
  );
}
export default HabitTracker;
