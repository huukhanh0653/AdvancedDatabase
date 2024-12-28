"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, Legend, Rectangle, XAxis, YAxis } from 'recharts'


function log(data) {
  console.log(data)
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p className="label">Date: {payload[0].payload.date}</p>
        <p className="intro">Revenue: {payload[0].payload.Revenue.toLocaleString(
          "vi-VN",
          { style: "currency", currency: "VND" }
        )} </p>
      </div>
    );
  }
  return null;
}

export function Overview(dailyRevenue) {
  return (
    <ResponsiveContainer width="100%" height={370}>
      <BarChart data={dailyRevenue ? dailyRevenue.dailyRevenue : []}>
        <YAxis
          stroke="#888888"
          color='red'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000000} tr`}
        />
        <Tooltip  content={<CustomTooltip />}/>
        <Legend />
        <Bar
          dataKey="Revenue"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="pink" stroke="blue"/>}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}