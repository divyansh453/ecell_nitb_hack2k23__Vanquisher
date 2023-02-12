import React, { useState } from 'react';
import "../styles/Statistics.css";
import { VictoryPie } from 'victory-pie';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2'
import { Chart,LinearScale, CategoryScale,BarElement ,legend, Title, Legend } from 'chart.js';
import axios from 'axios';
import Navbar from './Navbar';


let myData=[];
let bdata=[];

Chart.register(
  LinearScale,CategoryScale,BarElement,Legend,Title
  )
  
  const labels =['2019', '2020', '2021', '2022', '2023'];
  const options ={
    piugins : {
      legend:{
        position: 'top'
      },
      title :{
        display : true,
        Text :'Expense Traker'
      }
    }
  }
  
 let bardata=[];
  let data = {
  labels, 
  datasets : [
    {
      label : 'Placed',
      data : bardata,
      backgroundColor : 'grey'
    },
  
    {
      label : 'Unplaced',
      data : [170, 110, 125, 110, 120],
      backgroundColor : 'pink'
  
    }
  
  ]
  
  
  }
  
  
const Statistics = () => {

  const[smyData,setsmyData]=useState([]);
  const[bdata,setbdata]=useState([]);

  useEffect(()=>{
    axios.get("https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/skill_view/")
    .then((res)=>{
      // console.log(res.data);
      myData=res.data;
      // console.log(myData);
      for(let i=0;i<res.data.length;i++){
        myData[i]={
          x:`${res.data[i].skill}`,     
          y:res.data[i].rate,
        }
      }
      setsmyData(myData);
      // console.log(myData);
    }).catch((err)=>{
      console.log(err);
    })
  })
  useEffect(()=>{
    axios.get("https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/year_view/")
    .then((res)=>{
        for(let i=0;i<5;i++){
        bardata[i]=res.data[i].stu_no;
        }
        console.log(bardata);
        setbdata(bardata);
        data.datasets[0].data=bardata;
    }).catch((err)=>{
        console.log(err)
    })
})


  return (
  <>
    <h2 style={{textAlign:"center",fontSize:"2rem",marginBottom:"-2rem"}}>Pie Chart (Skills Based)</h2>
    <div className='piechart'>
      
       <div style={{ height: 620}}>
         <VictoryPie
          data={smyData}
          colorScale={["rgba(255, 99, 132, 0.2" , "rgba(255, 206, 86, 0.2" , "rgba(75, 192, 192, 0.2)","rgba(71, 152, 192, 0.2)","rgba(25, 62, 102, 0.2)"]}
          radius={100}
        />   
      </div>

   
    </div>
    <h2 style={{textAlign:"center",fontSize:"2rem",marginBottom:"2rem"}}>Graphical Representation(Placed Vs Unplaced)</h2>
    <div style={{width:"70%",margin:"auto"}}>
      <Bar options={options} data={data}/>
    </div>
    </>
  )
}

export default Statistics;