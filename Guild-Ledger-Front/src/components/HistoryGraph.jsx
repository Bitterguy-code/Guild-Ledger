import { PureComponent } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Currency } from './utils';
import SearchBar from './searchbar';
import api from '../api';


export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div className='custom-tooltip'>
                <p className='label'>{new Date(label).toLocaleDateString}</p>
                {payload.map((entry, index) => {
                    const value = Currency(entry.value)
                    return (
                        <div key={index} style={{ color: entry.color }}>
                            {entry.name}: {value.gold}g {value.silver}s {value.copper}c
                        </div>
                    )
                })}
            </div>
        );
    }
    return null;
}

export default class HistoryGraph extends PureComponent {
    state = {
        chartData: []
    }

    handleItemSelect = async (item) => {
        try {
            const encodedName = encodeURIComponent(item.name)
            const response = await api.get(`/items/history/${encodedName}`);
            
            const transformedData = response.data.history.map(entry => ({
                date: entry.date,
                sell_price_avg: Number(entry.sell_price_avg)
            }))

                this.setState({ chartData: transformedData})
        } catch (error) {
            console.error('Error loading history: ', error)
        }
            
    }
    
    render() {
        return (
            <div>
            <SearchBar onItemSelect={this.handleItemSelect} />
            <ResponsiveContainer width='100%' height='100%' minWidth='700px' minHeight='500px'>
                
                <LineChart
                    width={500}
                    height={300}
                    data={this.state.chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='date'
                            tickFormatter={(dateStr) => {
                        return dateStr.split('T')[0]
                    }}    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line dataKey='sell_price_avg' name='Average Sell' stroke='#8884d8' />
                </LineChart>
                </ResponsiveContainer>
                </div>
        );
    }
}