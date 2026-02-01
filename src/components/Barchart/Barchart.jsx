import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./Barchart.module.css";
import { useHabitContext } from "../../context/habitContext";

export default function BarChartComponent() {
  const { lastWeekTotals } = useHabitContext();

  const data = [
    { name: "Reading", value: lastWeekTotals.reading },
    { name: "Exercise", value: lastWeekTotals.exercise },
    { name: "Meditation", value: lastWeekTotals.meditation },
  ];

  return (
    <div className={styles.barChart}>
      <h2>Top Habits (Last Week)</h2>

      <div className={styles.barWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              width={100}
              dataKey="name"
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="value" fill="#8884d8" barSize={25} radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
