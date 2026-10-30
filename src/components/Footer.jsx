import { Link } from 'react-router-dom'
import { IconLinkedin, IconGithub } from './Icons'

export default function Footer({ membros }) {
  return (
    <footer className="bg-[#0A1628] text-slate-500 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-8 mb-10">
          <div>
            <span className="block text-white text-xl font-bold mb-3">JOVI <span className="text-brand-light">IA</span></span>
            <p className="text-sm">A câmera que pensa junto com você.</p>
            <p className="text-sm text-brand-light">Projeto FIAP × JOVI Smartphone 2026</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-bold mb-1">Navegação</h4>
            {[['/#solucao','A Solução'],['/#publico','Público-Alvo'],['/#galeria','Galeria'],['/#equipe','Nossa Equipe'],['/#contato','Contato']].map(([h,l])=><a key={h} href={h} className="text-sm hover:text-white transition">{l}</a>)}
            <Link to="/dashboard" className="text-sm hover:text-white transition">Dashboard </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-bold mb-1">Tecnologias</h4>
            {['React','Tailwind CSS','React Router','Vite','Gemini API'].map(t=><span key={t} className="text-sm">{t}</span>)}
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-bold mb-1">Equipe</h4>
            {membros.map(m => (
              <div key={m.rm} className="flex justify-between items-center text-sm">
                <span>{m.nome}</span>
                <div className="flex gap-1.5">
                  <a href={m.linkedin} target="_blank" rel="noreferrer" className="bg-white/10 text-xs font-bold px-1.5 py-0.5 rounded hover:bg-brand hover:text-white transition"><IconLinkedin width={16} height={16} /> LinkedIn</a>
                  <a href={m.github}   target="_blank" rel="noreferrer" className="bg-white/10 text-xs font-bold px-1.5 py-0.5 rounded hover:bg-brand hover:text-white transition"><IconGithub width={16} height={16} /> GitHub</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-sm">© 2026 JOVI IA — Turma 1ESPV FIAP | {membros.map(m=>m.nome.split(' ')[0]).join(' · ')}</div>
      </div>
    </footer>
  )
}
