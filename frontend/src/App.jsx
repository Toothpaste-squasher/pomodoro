import { MenuBar } from "./components/menu bar/pageChange.jsx";
import { Routes, Route, Router } from "react-router-dom";

// --- Import Pages ---
import { LoginPage } from "./components/auth/LoginPage.jsx"
import { Timer } from "./components/timer/study.jsx"
import { Tasks } from "./components/tasks/tasks.jsx"
import { Settings } from './components/settings/settings.jsx'

// --- Import contexts ---
import { AppProvider } from "./contexts/AppProvider.jsx";

const ComingSoon = () => { return <h1>Coming soon...</h1> }

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AppProvider />} />
        <Route path="/" element={<MenuBar />}>
          <Route path="study" element={<Timer />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="calendar" element={<ComingSoon />} />
          <Route path="stats" element={<ComingSoon />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<ComingSoon />} />
          <Route path="about" element={<ComingSoon />} />
        </Route>
      </Routes>
    </Router >
  );
}
