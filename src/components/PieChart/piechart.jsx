import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useHabitContext } from "../../context/habitContext";
import styles from "./piechart.module.css";


const COLORS = ["#A000FF", "#FF9304", "#FDE006"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartComponent() {
  const { habitTotals } = useHabitContext();

  const data = [
    { name: "Reading", value: habitTotals.reading },
    { name: "Exercise", value: habitTotals.exercise },
    { name: "Meditation", value: habitTotals.meditation },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.pieChart}>
      <h2>Average Completions</h2>

      <div className={styles.pieWrapper}>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={total === 0 ? false : renderCustomizedLabel}
              outerRadius={80}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend iconType="rect" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
