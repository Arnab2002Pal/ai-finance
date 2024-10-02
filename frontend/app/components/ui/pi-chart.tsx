import { userFinancialInfoState } from '@/app/store/atoms/financialAtom';
import React from 'react';
import { Pie, PieChart, Tooltip, Legend, Cell } from 'recharts';
import { useRecoilValue } from 'recoil';

const PiChart = () => {
  const investment = useRecoilValue(userFinancialInfoState) 
  const {WhereToInvest} = useRecoilValue(userFinancialInfoState).investmentAdvice  
  console.log(investment);
  
  if (WhereToInvest == undefined) return null
  
  const data01 = [
    { name: WhereToInvest.Option1.Name, value: WhereToInvest.Option1.Amount },
    { name: WhereToInvest.Option2.Name, value: WhereToInvest.Option2.Amount },
  
  ];

  const data02 = [
    {name: "Percentage" ,  value: parseInt(WhereToInvest.Option1.PercentageAllocation) },
    { name: "Percentage",  value: parseInt(WhereToInvest.Option2.PercentageAllocation) },
    
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28AE5', '#F85F73'];

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Investment Distribution</h2>
      <PieChart width={730} height={400}>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={110}
          fill="#82ca9d"
          // label
        >
          {data02.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {/* <Legend verticalAlign="top" height={36} /> */}
      </PieChart>
    </div>
  );
};

export default PiChart;
