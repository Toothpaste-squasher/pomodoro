import { Outlet } from "react-router-dom";
import { MenuBar } from "./menuBar";

export const MainLayout = () => {
  return (
    <div className="App">
      <MenuBar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  )
}