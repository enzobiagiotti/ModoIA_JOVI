import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useScroll } from '../hooks/useScroll'

const LINKS = [
  { to: '/#solucao', label: 'A Solução' },
  { to: '/#publico', label: 'Público-Alvo' },
  { to: '/#galeria', label: 'Galeria' },
  { to: '/#equipe',  label: 'Nossa Equipe' },
  { to: '/#contato', label: 'Contato' },
]

export default function Header() {
  const [aberto, setAberto] = useState(false)
  const rolou = useScroll(50)
  const { logado, usuario, logout } = useAuth()
  const navigate = useNavigate()

  const sair = () => { logout(); navigate('/'); setAberto(false) }

  return (
    <header className={`fixed top-0 inset-x-0 z-50 bg-navy/95 backdrop-blur border-b border-brand-light/20 transition-shadow ${rolou ? 'shadow-2xl' : ''}`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <span></span> JOVI <span className="text-brand-light">IA</span>
        </Link>

        <ul className={`${aberto ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 right-0 bg-navy md:bg-transparent p-6 md:p-0 gap-4 md:gap-8 border-t border-brand-light/20 md:border-0`}>
          {LINKS.map(l => (
            <li key={l.to}>
              <a href={l.to} onClick={() => setAberto(false)} className="text-brand-pale hover:text-white transition">
                {l.label}
              </a>
            </li>
          ))}
          {logado && (
            <>
              <li><NavLink to="/dashboard" onClick={() => setAberto(false)} className={({isActive}) => `${isActive ? 'text-white font-semibold' : 'text-brand-pale'} hover:text-white transition`}>Dashboard</NavLink></li>
              <li><NavLink to="/historico" onClick={() => setAberto(false)} className={({isActive}) => `${isActive ? 'text-white font-semibold' : 'text-brand-pale'} hover:text-white transition`}>Histórico</NavLink></li>
              <li><NavLink to="/albuns" onClick={() => setAberto(false)} className={({isActive}) => `${isActive ? 'text-white font-semibold' : 'text-brand-pale'} hover:text-white transition`}>Álbuns</NavLink></li>
              <li><NavLink to="/notificacoes" onClick={() => setAberto(false)} className={({isActive}) => `${isActive ? 'text-white font-semibold' : 'text-brand-pale'} hover:text-white transition`}>Avisos</NavLink></li>
            </>
          )}
        </ul>

        <div className="flex items-center gap-3">
          {logado ? (
            <>
              <span className="hidden sm:block text-brand-pale text-sm">{usuario.nome}</span>
              <button onClick={sair} className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-lg transition">Sair</button>
            </>
          ) : (
            <Link to="/login" className="bg-brand hover:bg-brand-light text-white text-sm font-semibold px-4 py-2 rounded-lg transition">Entrar</Link>
          )}
          <button onClick={() => setAberto(o => !o)} className="md:hidden text-white text-2xl" aria-label="Menu">
            {aberto ? '' : ''}
          </button>
        </div>
      </nav>
    </header>
  )
}
