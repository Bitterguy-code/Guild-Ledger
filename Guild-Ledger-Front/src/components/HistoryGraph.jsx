import { PureComponent } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Currency } from './utils';
const testData = [
    {
        name: '01/01/2025',
        price: '12345'
    },
    {
        name: '01/02/2025',
        price: '23456'
    },
    {
        name: '01/03/2025',
        price: '34567'
    }
];

export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div>
                <span>{label}</span>
                <br />
                {payload.map((ele, index) => {
                    const price = Number(ele.value);
                    const value = Currency(price)
                    return (
                        <small key={index}>
                            {ele.name} : {value.gold}g {value.silver}s {value.copper}c
                        </small>
                    )
                })}
            </div>
        );
    }
    return null;
}

export default class HistoryGraph extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width='100%' height='100%' minWidth='700px' minHeight='500px'>
                <LineChart
                    width={500}
                    height={300}
                    data={testData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line dataKey='price' stroke='#8884d8' />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}