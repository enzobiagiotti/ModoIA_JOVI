import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/** Rota privada: redireciona para /login se não estiver logado */
export default function PrivateRoute({ children }) {
  const { logado } = useAuth()
  const location = useLocation()
  if (!logado) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}
