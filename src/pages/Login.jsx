import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { USUARIOS } from '../services/api'

/** Página pública: Login */
export default function Login() {
  const { login, logado } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destino  = location.state?.from?.pathname || '/dashboard'

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro,  setErro]  = useState('')

  if (logado) { navigate(destino, { replace: true }); return null }

  const submit = e => {
    e.preventDefault()
    const r = login(email, senha)
    if (r.ok) navigate(destino, { replace: true })
    else setErro(r.erro)
  }

  const preencher = u => { setEmail(u.email); setSenha(u.senha); setErro('') }
  const input = 'w-full px-4 py-3 bg-surface border border-slate-200 rounded-xl focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition'

  return (
    <section className="min-h-screen bg-gradient-to-br from-navy via-[#1A2F5E] to-navy flex items-center justify-center px-6 pt-24 pb-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-navy mt-2">Entrar no JOVI <span className="text-brand">IA</span></h1>
            <p className="text-slate-500 text-sm mt-1">Acesse sua central de conteúdo</p>
          </div>
          {erro && <div className="bg-red-50 border border-red-400 text-red-600 text-sm font-semibold rounded-xl px-4 py-3 mb-4">{erro}</div>}
          <form onSubmit={submit} className="flex flex-col gap-4">
            <label className="text-sm font-semibold text-navy flex flex-col gap-1.5">E-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com" className={input} required /></label>
            <label className="text-sm font-semibold text-navy flex flex-col gap-1.5">Senha<input type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="••••••" className={input} required /></label>
            <button className="bg-brand hover:bg-brand-light text-white font-semibold py-3.5 rounded-xl transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/40 mt-2">Entrar</button>
          </form>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center mb-3">Usuários de teste — clique para preencher:</p>
            <div className="flex flex-col gap-2">
              {USUARIOS.map(u => (
                <button key={u.email} type="button" onClick={()=>preencher(u)} className="text-left bg-surface hover:bg-brand-pale border border-slate-200 rounded-xl px-4 py-2.5 text-sm transition">
                  <span className="font-semibold text-navy">{u.nome}</span> <span className="text-slate-500">— {u.email} / {u.senha}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="text-center text-sm text-slate-500 mt-6"><Link to="/" className="text-brand font-semibold hover:underline">← Voltar para o site</Link></p>
        </div>
      </div>
    </section>
  )
}
