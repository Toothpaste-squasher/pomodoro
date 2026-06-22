import { Outlet } from "react-router-dom";
import { MenuBar } from "../menuBar/menuBar";

export const MainLayout = () => {
  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  )
}