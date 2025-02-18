"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  chartData: Array<object>;
}
const salesData = [
  {
    name: 5,
    property: 2,
  },
  {
    name: 6,
    property: 7,
  },
  {
    name: 7,
    property: 2,
  },
  {
    name: 8,
    property: 2,
  },
  {
    name: 9,
    property: 2,
  },
  {
    name: 10,
    property: 2,
  },
  {
    name: 11,
    property: 2,
  },
];

const LineChartComponent = ({ chartData }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={
          {
            // left: -40,
          }
        }
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="property" stroke="#2563EB" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
