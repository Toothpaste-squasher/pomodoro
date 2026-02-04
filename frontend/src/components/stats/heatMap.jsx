import axios from 'axios';
import { useState } from 'react';

const API = axios.create({ baseURL: 'http://localhost:5001/api/sessions' })

export const HeatMap = () => {
  const [sessions, setSessions] = useState([])

  const updateHistory = () => {
    API.get('/').then((res) => {
      setSessions(res.data)
    })
      .catch((err) => {
        console.log(err)
      })
  }

  const calculateGrid = (history) => {

  }




  const grid = [
    [null, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0.5],
    [0, 0, 0, 0, null, null, null]
  ]


  return (
    <div className="heatmap-container">
      <div className='month-heatmap'>
        {grid.map((row) => {
          <div className='row'>
            {row.map((day) => {
              <div className='day'></div>
            })}
          </div>
        })}
      </div>
    </div>
  )
}