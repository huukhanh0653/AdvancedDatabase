"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, Legend, Rectangle, XAxis, YAxis } from 'recharts'

const fetchData = () => {

}

const data = [
  {
    name: "Jan",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    Revenue: Math.floor(Math.random() * 5000) + 1000,
  },
]

const CustomTooltip = ({ active, payload, label }) => {
  console.log(active, payload, label)
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p className="label">Hello world</p>
        <p className="intro">How are u</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }
  return null;
}

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip  content={<CustomTooltip/>}/>
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