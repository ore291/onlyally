import React from "react";
import { Bar } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);

export default function Charts({ data }) {
  const state = {
    labels: data.loading
      ? ["January", "February", "March", "April", "May"]
      : data.data.analytics.last_x_days_month,
    datasets: [
      {
        label: "Revenue",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: data.loading
          ? [65, 59, 80, 81, 56]
          : data.data.analytics.last_x_days_earning,
      },
    ],
  };
  return (
    <>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "last x days revenue",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </>
  );
}
