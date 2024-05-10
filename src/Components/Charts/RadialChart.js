import React from 'react'
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts'

function RadialChart({data, type}) {

  return (
    <div>
        <RadarChart outerRadius={90} width={500} height={400} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={type} />
            <PolarRadiusAxis angle={0} />
            <Legend />
            
            <Radar dataKey="usage.avg" fill="teal" fillOpacity={0.6} />
            <Radar dataKey="usage.min" fill="red" fillOpacity={0.5} />
            <Radar dataKey="usage.max" fill="blue" fillOpacity={0.5} />
            <Legend />

        </RadarChart>
    </div>
  )
}

export default RadialChart