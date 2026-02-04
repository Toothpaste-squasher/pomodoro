import React from 'react';
import {NavLink} from 'react-router-dom'
import { House, Info, Settings, NotebookPen, ChartColumn, User, Calendar, ListTodo } from 'lucide-react';



const MenuBar = ({ currentPage }) => {
  const MENU_ITEMS = [
    { id: 'home', icon: <House />, label: 'Home'},
    { id: 'study', icon: <NotebookPen />, label: 'Study'},
    { id: 'tasks', icon: <ListTodo />, label: 'Tasks'},
    { id: 'calendar', icon: <Calendar />, label: 'Calendar'},
    { id: 'stats', icon: <ChartColumn />, label: 'Stats'},
    { id: 'settings', icon: <Settings />, label: 'Settings'},
    { id: 'profile', icon: <User />, label: 'Profile'},
    { id: 'about', icon: <Info />, label: 'About'},
  ];

  const handleClick = (item) => {
    console.log(item);
  }


  return (      
    <div className='menu-bar'>
      {MENU_ITEMS.map((item) => {
        return (
          <NavLink
            key={item.id} 
            className={`menu-item ${item.id === currentPage ? 'active' : ''}`} 
            to={`/${item.id}`}
          >
            {item.icon}
          </NavLink>
        )
      })}
    </div>)
}

export {MenuBar};