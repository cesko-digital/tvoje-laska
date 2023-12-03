//TODO: Nutno pořádně upravit!!!
//TODO: Vyřešit, jak skrýt legendu

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const dataValues = [30, 70];
const total = dataValues.reduce((acc, value) => acc + value, 0);

const data: ChartData<"bar"> = {
  labels: ["Nevyplněno", "Vyplněno"],
  datasets: [
    {
      label: "% vyplnění",
      data: dataValues.map(value => (value / total) * 100),
      backgroundColor: ["#E0E0E0", "#8240FF"],
      borderWidth: 0,
      borderRadius: 5,
    },
  ],
};

const options: ChartOptions<"bar"> = {
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += `${context.parsed.y}%`;
          }
          return label;
        },
      },
    },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
      beginAtZero: true,
      max: 100,
    },
  },
  /*  scales: {
    y: {
      beginAtZero: true,
      max: 100,
    },
  }, */
};

const VerticalBarChart = () => {
  return <Bar data={data} options={options} height={300} width={300} className="mx-auto" />;
};

export default VerticalBarChart;
