import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Voice from './pages/Voice'
import Archive from './pages/Archive'
import Industry from './pages/Industry'
import Customer from './pages/Customer'
import DecisionChain from './pages/DecisionChain'
import Bottleneck from './pages/Bottleneck'
import Topics from './pages/Topics'
import Growth from './pages/Growth'
import SettingsPage from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/voice" element={<Voice />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/industry" element={<Industry />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/decision-chain" element={<DecisionChain />} />
      <Route path="/bottleneck" element={<Bottleneck />} />
      <Route path="/topics" element={<Topics />} />
      <Route path="/growth" element={<Growth />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}
