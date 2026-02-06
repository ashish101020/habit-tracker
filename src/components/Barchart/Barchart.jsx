import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
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
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#8884d8"
              barSize={18}
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
