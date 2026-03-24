import { Routes, Route } from "react-router-dom";

// --- Import Pages ---
import { LoginPage } from "./components/auth/loginPage.jsx"
import { SignUpPage } from "./components/auth/createAccount.jsx"
import { MainLayout } from "./components/menu bar/MainLayout.jsx";
import { Timer } from "./components/timer/study.jsx"
import { Tasks } from "./components/tasks/tasks.jsx"
import { Settings } from './components/settings/settings.jsx'
import { Stats } from './components/stats/stats.jsx'

// Contexts
import AppProvider from "./contexts/app/AppProvider.jsx";


const ComingSoon = () => { return <h1>Coming soon...</h1> }

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/"
        element={
          <AppProvider>
            <MainLayout />
          </AppProvider>
        }
      >
        <Route index element={<ComingSoon />} />
        <Route path="home" element={<ComingSoon />} />
        <Route path="study" element={<Timer />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="calendar" element={<ComingSoon />} />
        <Route path="stats" element={<Stats />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<ComingSoon />} />
        <Route path="about" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
