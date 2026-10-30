import { useState } from 'react'
import SectionHeader from './SectionHeader'
import { IconLinkedin, IconGithub } from './Icons'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ASSUNTOS = ['Dúvida sobre o projeto', 'Sugestão de melhoria', 'Parceria / Colaboração', 'Outro']

export default function Contato({ membros }) {
  const [msgs, setMsgs] = useLocalStorage('jovia_mensagens', [])
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '' })
  const [ok, setOk] = useState(false)
  const [erro, setErro] = useState('')

  const change = e => { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setErro('') }
  const submit = e => {
    e.preventDefault()
    if (!form.nome.trim())         return setErro('Informe seu nome.')
    if (!form.email.includes('@')) return setErro('Informe um e-mail válido.')
    if (form.mensagem.length < 10) return setErro('Mensagem muito curta (mín. 10 caracteres).')
    setMsgs(m => [...m, { ...form, id: Math.floor(Math.random() * 1e6), data: new Date().toLocaleString('pt-BR') }])
    setOk(true); setForm({ nome: '', email: '', assunto: '', mensagem: '' })
    setTimeout(() => setOk(false), 4000)
  }

  const input = 'w-full px-4 py-3 bg-surface border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 focus:bg-white transition'

  return (
    <section id="contato" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="Contato" titulo="Fale com a equipe" sub="Tem alguma dúvida, sugestão ou quer saber mais sobre o JOVI IA? Entre em contato!" />
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <div>
            <h3 className="text-navy text-xl font-bold mb-6">Informações de contato</h3>
            {[['','Instituição','FIAP — Faculdade de Informática e Administração Paulista'],['','Curso','Engenharia de Software — Turma 1ESPV'],['','Challenge','JOVI Smartphone — Câmera Inteligente 2026']].map(([i,t,d]) => (
              <div key={t} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl mb-3">
                <div><strong className="block text-navy text-sm">{t}</strong><span className="text-slate-500 text-sm">{d}</span></div>
              </div>
            ))}
            {msgs.length > 0 && <div className="bg-green-50 border border-green-500 text-green-700 text-sm font-semibold rounded-xl px-4 py-2.5 mb-3">{msgs.length} mensagem{msgs.length>1?'s':''} salva{msgs.length>1?'s':''} no localStorage</div>}
            <h4 className="text-navy font-bold mt-6 mb-3">Redes sociais da equipe</h4>
            <div className="flex flex-col gap-2">
              {membros.map(m => (
                <div key={m.rm} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5">
                  <span className="text-navy text-sm font-semibold">{m.nome}</span>
                  <div className="flex gap-2">
                    <a href={m.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center bg-brand-pale border border-brand rounded-lg hover:bg-brand transition"><IconLinkedin width={16} height={16} className="text-brand" /></a>
                    <a href={m.github}   target="_blank" rel="noreferrer" className="w-8 h-8 flex items-center justify-center bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-800 transition"><IconGithub width={16} height={16} className="text-slate-800" /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={submit} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col gap-4">
            {ok   && <div className="bg-green-50 border border-green-500 text-green-700 text-sm font-semibold rounded-xl px-4 py-3">Mensagem enviada e salva com sucesso!</div>}
            {erro && <div className="bg-red-50 border border-red-400 text-red-600 text-sm font-semibold rounded-xl px-4 py-3">{erro}</div>}
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">Nome completo<input name="nome" value={form.nome} onChange={change} placeholder="Seu nome" className={input} /></label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">E-mail<input name="email" type="email" value={form.email} onChange={change} placeholder="seu@email.com" className={input} /></label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">Assunto
              <select name="assunto" value={form.assunto} onChange={change} className={input}><option value="">Selecione um assunto</option>{ASSUNTOS.map(a=><option key={a}>{a}</option>)}</select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">Mensagem<textarea name="mensagem" rows={5} value={form.mensagem} onChange={change} placeholder="Escreva sua mensagem..." className={`${input} resize-y`} /></label>
            <button className="bg-brand hover:bg-brand-light text-white font-semibold py-3.5 rounded-xl transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/40">Enviar mensagem</button>
            <p className="text-slate-500 text-xs text-center -mt-2">Mensagem salva localmente via localStorage.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
