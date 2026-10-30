import { createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { USUARIOS } from '../services/api'

export const AuthContext = createContext(null)

/**
 * Provider de autenticação: guarda o usuário logado no localStorage.
 * A lógica (login/logout) fica aqui; as páginas só chamam os métodos.
 */
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useLocalStorage('jovia_usuario', null)

  const login = (email, senha) => {
    const u = USUARIOS.find(x => x.email === email && x.senha === senha)
    if (!u) return { ok: false, erro: 'E-mail ou senha inválidos.' }
    const { senha: _, ...semSenha } = u
    setUsuario(semSenha)
    return { ok: true }
  }

  const logout = () => setUsuario(null)

  return (
    <AuthContext.Provider value={{ usuario, logado: !!usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
