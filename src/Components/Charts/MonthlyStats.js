import React from 'react'
import { RootState } from '../../Context/Context'
import axios from 'axios'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Center } from '@chakra-ui/react';

function MonthlyStats({usages}) {

  return (
    // <ResponsiveContainer width="100%" height="100%">
    <Center>

        <AreaChart
          width={500}
          height={300}
          data={usages}
          margin={{ right: 30 }}
        >
          <YAxis/>
          <XAxis dataKey="month" />
          <CartesianGrid />
          <Tooltip />
          <Legend />

          <Area
            type="monotone"
            dataKey="min"
            stroke="#7c3aed"
            fill="#8b5cf6"
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="avg"
            stroke="#2563eb"
            fill="#3b82f6"
            stackId="1"
          />

          <Area
            type="monotone"
            dataKey="max"
            stroke="#78dca9"
            fill="#78dca9"
            stackId="1"
          />
        </AreaChart>
    </Center>
    // </ResponsiveContainer>
  )
}

export default MonthlyStats