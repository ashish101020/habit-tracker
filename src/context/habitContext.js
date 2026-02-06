import { createContext, useContext, useState, useEffect, useMemo, } from "react";

const HabitContext = createContext();

const HabitProvider = ({ children }) => {

  //Habit Input Data
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenHabitInput, setIsOpenHabitInput] = useState(false);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingHabit, setEditingHabit] = useState(null);
const [isOpenEditor, setIsOpenEditor] = useState(false);

  

  const habitTotals = useMemo(() => {
    const totals = {
      reading: 0,
      exercise: 0,
      meditation: 0,
    };

    habits.forEach((entry) => {
      entry.habits.forEach((habit) => {
        if (totals.hasOwnProperty(habit)) {
          totals[habit] += 1;
        }
      });
    });

    return totals;
  }, [habits]);

  const lastWeekTotals = useMemo(() => {
  const totals = {
    reading: 0,
    exercise: 0,
    meditation: 0,
  };

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);

  habits.forEach((entry) => {
    const entryDate = new Date(entry.date);

    if (entryDate >= sevenDaysAgo && entryDate <= today) {
      entry.habits.forEach((habit) => {
        if (totals.hasOwnProperty(habit)) {
          totals[habit] += 1;
        }
      });
    }
  });

  return totals;
}, [habits]);



  useEffect(() => {
  localStorage.setItem("habits", JSON.stringify(habits));
}, [habits]);


  return (
    <HabitContext.Provider
  value={{
    isModalOpen,
    setIsModalOpen,
    isOpenHabitInput,
    setIsOpenHabitInput,

    isOpenEditor,
    setIsOpenEditor,
    editingHabit,
    setEditingHabit,

    date,
    setDate,
    description,
    setDescription,
    selectedHabits,
    setSelectedHabits,
    habits,
    setHabits,

    habitTotals,
    lastWeekTotals
  }}
>

      {children}
    </HabitContext.Provider>
  );
};

const useHabitContext = () => {
  return useContext(HabitContext);
};

export { HabitProvider, useHabitContext };
