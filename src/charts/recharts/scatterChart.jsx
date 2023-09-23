import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

const data = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const ReScatterChart = () => {
    const language = useSelector(state => state.zenithReducer);

    return (
        <div style={{ height: "calc(100% - 32px - 16px - 24px)" }}>
            {/* <button style={{ height: "20px" }} onClick={() => {
                    if (document.getElementsByClassName('scatterPlotLine')[0].style.display === 'none')
                        document.getElementsByClassName('scatterPlotLine')[0].style.display = 'block';
                    else
                        document.getElementsByClassName('scatterPlotLine')[0].style.display = 'none'
                }}>Toggle Path</button> */}
            <ResponsiveContainer width="100%" minHeight={260}>

                <ScatterChart>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                    <YAxis style={{ textAnchor: language?.language === "ar" ? "start" : "end" }} type="number" dataKey="y" name="weight" unit="kg" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="A school" data={data} fill="#8884d8">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ReScatterChart;