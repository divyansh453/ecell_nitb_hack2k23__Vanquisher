import { fontWeight } from '@mui/system';
import React from 'react';
import "../styles/RecordsData.css";

const RecordsData = (props) => {
  return (
    <div className='records_data'>
      <div className='records_status'>
        <p><span style={{color:'green'}}>Status  : </span>{props.status}</p>
      </div>
      <div className='records_details'>
        <p>{props.name}</p>
        <p>{props.company}</p>
        <p>{props.package}</p>
        <p>{props.type}</p>
      </div>
    </div>
  )
}

export default RecordsData