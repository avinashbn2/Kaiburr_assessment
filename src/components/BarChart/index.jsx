import React, { useContext, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import StatContext from '../../context/StatContext';

const GroupedBarChart = ({filteredData}) => {
  const [data, setData] = useState([])
  const values = useContext(StatContext)
  console.log(values, filteredData)
  useEffect(() => {

    const salaries = []
    const names = []

    filteredData && filteredData.forEach(d=> {
      salaries.push(d.salary)
      names.push(d.name)
    })
    
    const salaryChart = {
      x: names,
      y: salaries,
      name: 'Salary',
      type: 'bar',
      marker: {color: '#805AD5'},

    }
    setData([salaryChart])
  }, [filteredData])

  return (
    <Plot
      data={data}
      
      layout={{ width: 500, height: 500, title: 'Employee salary chart', 
      
   }} />
  )
}


export default GroupedBarChart