import { NavLink } from 'react-router-dom'
import { House, Info, Settings, NotebookPen, ChartColumn, User, Calendar, ListTodo } from 'lucide-react';
import s from './menuBar.module.scss';


const MenuBar = () => {
  const MENU_ITEMS = [
    { id: 'home', icon: <House />, label: 'Home' },
    { id: 'study', icon: <NotebookPen />, label: 'Study' },
    { id: 'tasks', icon: <ListTodo />, label: 'Tasks' },
    { id: 'calendar', icon: <Calendar />, label: 'Calendar' },
    { id: 'stats', icon: <ChartColumn />, label: 'Stats' },
    { id: 'settings', icon: <Settings />, label: 'Settings' },
    { id: 'profile', icon: <User />, label: 'Profile' },
    { id: 'about', icon: <Info />, label: 'About' },
  ];

  return (
    <div className={s.menu}>
      {MENU_ITEMS.map((item) => {
        return (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            className={({ isActive }) => isActive ? `${s.menuItem} ${s.active}` : s.menuItem}
            title={item.label}
          >
            {item.icon}
          </NavLink>
        )
      })}
    </div>)
}

export { MenuBar };