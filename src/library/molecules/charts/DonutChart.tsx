//TODO: Nutno pořádně upravit!!!

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const dataValues = [30, 70];
const total = dataValues.reduce((acc, value) => acc + value, 0);

const data: ChartData<"doughnut"> = {
  labels: ["Nevyplněno", "Vyplněno"],
  datasets: [
    {
      label: "% vyplnění",
      data: dataValues.map(value => (value / total) * 100),
      backgroundColor: ["#E0E0E0", "#8240FF"],
      borderWidth: 0,
      /*  borderRadius: 30,
      offset: 2, */
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed !== null) {
            label += new Intl.NumberFormat("en-US", { style: "percent", minimumFractionDigits: 0 }).format(
              context.parsed / 100,
            );
          }
          return label;
        },
      },
    },
    legend: {
      display: false,

      // TODO: Doplnit popisky
      /* labels: {
        generateLabels: function (chart: ChartTypeRegistry["doughnut"]["chart"]) {
        
          return (
            chart.data.labels?.map((label, index) => {
              return {
                text: `${label}: ${chart.data.datasets[0].data[index]}%`,
                fillStyle: chart.data.datasets[0].backgroundColor[index],
              };
            }) || []
          );
        },
      }, */
    },
  },
  cutout: "75%",
};

const DonutChart = () => {
  return <Doughnut data={data} options={options} height={300} width={300} className="mx-auto" />;
};

export default DonutChart;
