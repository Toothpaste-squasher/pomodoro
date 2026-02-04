import React, { useState, useEffect, useRef, useCallback } from 'react';


import './tasksPage.scss'
import { TasksList } from './TasksList';

const Tasks = () => {
  return (
    <div className='tasks-page'>
      <div className='task-container'>
        <h1>Tasks</h1>
        <TasksList />
      </div>
    </div>
  )
};

export { Tasks };