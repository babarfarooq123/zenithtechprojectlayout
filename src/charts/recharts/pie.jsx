// import React from 'react';
// import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Sector  } from 'recharts';

// const data01 = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group E', value: 278 },
//     { name: 'Group F', value: 189 },
// ];

// const data02 = [
//     { name: 'Group A', value: 2400 },
//     { name: 'Group B', value: 4567 },
//     { name: 'Group C', value: 1398 },
//     { name: 'Group D', value: 9800 },
//     { name: 'Group E', value: 3908 },
//     { name: 'Group F', value: 4800 },
// ];

// const PieReChart = () => {

//     const renderActiveShape = props => {
//         const RADIAN = Math.PI / 180;
//         const {
//           cx,
//           cy,
//           innerRadius,
//           outerRadius,
//           startAngle,
//           endAngle,
//           midAngle
//         } = props;
//         const sin = Math.sin(-RADIAN * midAngle);
//         const cos = Math.cos(-RADIAN * midAngle);
//         const sx = cx + (outerRadius - 40) * cos;
//         const sy = cy + (outerRadius - 40) * sin;

//         return (
//           <Sector
//             cx={sx}
//             cy={sy}
//             innerRadius={20}
//             outerRadius={outerRadius}
//             startAngle={startAngle}
//             endAngle={endAngle}
//             fill="red"
//           />
//         );
//       };

//     const onMouseOver = (event, d) => {
//         console.log("RE-PIE: ", event, d)
//         renderActiveShape(event)
//     }

//     return (
//         <>
//             <ResponsiveContainer width="100%" height="100%">
//                 <PieChart width={400} height={400}>
//                     <Pie
//                         dataKey="value"
//                         isAnimationActive={false}
//                         data={data01}
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={80}
//                         fill="#8884d8"
//                         label
//                         onMouseOver={onMouseOver}
//                         activeShape={renderActiveShape}
//                     />
//                     <Tooltip />
//                     {/* <Cell style={{outline: 'none'}} key={curr} fill={{content: content[curr].color}} /> */}
//                 </PieChart>
//             </ResponsiveContainer>
//         </>
//     );
// }

// export default PieReChart;






import React, { useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];

const PieReChart = () => {
    const [activeIndex,] = useState(null);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div style={{ height: "calc(100% - 32px - 16px - 24px)" }}>
            <ResponsiveContainer width="100%"
                minHeight={260}
                style={{ height: "calc(100% - 40px)" }}
            // height="100%"
            >
                <PieChart
                    // width={400} height="100%">
                    width="100%" height="100%">
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data01}
                        cx="50%"
                        cy="50%"
                        // outerRadius={activeIndex === 0 ? 100 : 80}
                        fill="#8884d8"
                        labelLine={false}
                        // outerRadius={80}
                        label={renderCustomizedLabel}
                    >
                        {data01.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieReChart;
