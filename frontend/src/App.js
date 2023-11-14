import Appbar from './components/Appbar'
import MainGame from './pages/MainGame'
import Login from './pages/Login'
import Registration from './pages/Register'
import About from './pages/About'
import NoPage from './pages/NoPage'
import ForgotPassword from './pages/ForgotPassword'
import DevLandingPage from './pages/DevLandingPage'
import ResetPassword from './pages/ResetPassword'
import StartGame from './pages/StartGame'
import { AuthProvider } from './AuthContext';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DecadePieChart from './pages/DecadePieChart'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Appbar />}>
            <Route index element={<DevLandingPage />} />
            <Route path="/decadepiechart" element={<DecadePieChart/>}/>
            <Route path ="/gameSelection" element={<StartGame/>}/>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/maingame/:token" element={<MainGame />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="resetpassword" element={<ForgotPassword />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}