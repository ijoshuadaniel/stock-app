import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface props {
  stockData: string[];
  labels: string[];
}

const StockLineChart: React.FC<props> = ({ stockData, labels }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: stockData,
        borderColor: "#2ECC71",
        borderWidth: 1,
        fill: true,
        pointRadius: 0,
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { display: true },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      line: {
        borderJoinStyle: "round" as const,
      },
    },
  };

  return (
    <div style={{ height: "250px", width: "100%", marginBottom: "-3rem" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default StockLineChart;
