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
import Profile from './pages/Profile'
import { AuthProvider } from './AuthContext';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DecadeChart from './pages/DecadeChart'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Appbar />}>
            <Route index element={<StartGame />} />
            <Route path="/decadechart" element={<DecadeChart />}/>
            <Route path ="/devpage" element={<DevLandingPage />}/>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/:gamemode/:token" element={<MainGame />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="resetpassword" element={<ForgotPassword />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}