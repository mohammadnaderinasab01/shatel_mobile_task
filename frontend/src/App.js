import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Route, Routes, Navigate } from "react-router-dom";
import Upload from "./pages/upload/Upload";
import NavBar from './components/Navbar/NavBar'
import SendMail from "./pages/send_mail/SendMail";

function App() {
  return (
    <>
    <ReactNotifications />
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/upload" element={<Upload/>} />
        <Route path="/send-mail" element={<SendMail/>} />
        <Route
          path="/"
          element={<Navigate to="/signup" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
