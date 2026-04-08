import { Routes, Route } from "react-router-dom";

// --- Import Pages ---
import { LoginPage } from "./pages/auth/loginPage.jsx"
import { SignUpPage } from "./pages/auth/createAccount.jsx"
import { MainLayout } from "./components/menuBar/mainLayout.jsx";
import { Timer } from "./pages/timer/timer.jsx"
import { Tasks } from "./pages/tasks/tasks.jsx"
import { Settings } from './pages/settings/settings.jsx'
import { Stats } from './pages/stats/stats.jsx'

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
