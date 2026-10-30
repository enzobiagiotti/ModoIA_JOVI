import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Header    from './components/Header'
import Footer    from './components/Footer'
import Home      from './pages/Home'
import Login     from './pages/Login'
import Dashboard from './pages/Dashboard'
import Historico from './pages/Historico'
import Albuns    from './pages/Albuns'
import Notificacoes from './pages/Notificacoes'
import NotFound  from './pages/NotFound'
import { MEMBROS } from './services/membros'

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/"      element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas privadas — exigem login */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/historico" element={<PrivateRoute><Historico /></PrivateRoute>} />
          <Route path="/albuns"    element={<PrivateRoute><Albuns /></PrivateRoute>} />
          <Route path="/notificacoes" element={<PrivateRoute><Notificacoes /></PrivateRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer membros={MEMBROS} />
    </AuthProvider>
  )
}
