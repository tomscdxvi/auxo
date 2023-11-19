import React from 'react'
import { Bar } from 'react-chartjs-2';

export default function CustomBarChart({ chartData }) {
    return <Bar data={chartData} />
}
