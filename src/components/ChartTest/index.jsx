import React, { PureComponent } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "",
    uv: 600,
  },
  {
    name: "",
    uv: 800,
  },
  {
    name: "",
    uv: 1000,
  },
  {
    name: "",
    uv: 1200,
  },
  {
    name: "",
    uv: 1500,
  },
  {
    name: "",
    uv: 0,
  },
  {
    name: "",
    uv: 3000,
  },
];

export default class ChartTest extends PureComponent {
  render() {
    return (
      <ResponsiveContainer className="pointer-events-none m-auto w-full" width="99%" height="100%">
        <AreaChart width={500} height={81} data={data}>
          <Area type="monotone" dataKey="uv" stroke="#90caf93b" fill="#90caf926" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
