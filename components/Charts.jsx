import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Charts() {
  const data = [
    {
      value: 0,
      date: 2021,
    },
    {
      value: 50,
      date: 2022,
    },
    {
      value: 100,
      date: 2023,
    },
    {
      value: 150,
      date: 2024,
    },
    {
      value: 200,
      date: 2025,
    },
    {
      value: 250,
      date: 2026,
    },
  ];
  return (
    <>
      <ResponsiveContainer width="100%" height="100%" aspect={1 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#5550bd" />
          <Line type="monotone" dataKey={"value"} stroke="#5550bd" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
