import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import './ChartItem.css';

const ChartItem = (data) => {
    const prices = data.data.map(item => item.price);
    const title = data.data.map(item => item.title);
    const colors = [];
    let opacity = 1;

    prices.sort((a, b) => {
        return a - b;
    })

    const chooseColor = () => {
        for(let i = 0; i < prices.length; i++) {
            opacity = (i + 1) * 0.1;
            colors.push(`rgba(120, 40, 31, ${opacity})`)
        }
        return colors;
    }

    chooseColor();

    const dataItem = {
        labels: title,
        datasets: [{
            backgroundColor: colors,
            data: prices
        }]
    }
    
    return (
        <div className="ChartItem">
            <h1>Bar Chart</h1>
            <Bar data={dataItem}/>

            <h1>Pie Chart</h1>
            <Pie data={dataItem}/>
        </div>
    )
}

export default ChartItem;