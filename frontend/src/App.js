import Appbar from './components/Appbar'
import Home from './components/Home'
import Login from './components/Login'
import Registration from './components/Register'
import About from './components/About'
import NoPage from './components/NoPage'
import ForgotPassword from './components/ForgotPassword'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Appbar />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="resetpassword" element={<ForgotPassword />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}