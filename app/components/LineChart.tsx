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
  dataKey: string;
}

const LineChartComponent = ({ chartData, dataKey }: Props) => {
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
        <Line
          type="monotone"
          dataKey="property"
          name={dataKey}
          stroke="#2563EB"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
