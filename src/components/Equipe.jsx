import SectionHeader from './SectionHeader'
import { IconLinkedin, IconGithub } from './Icons'

function CartaoMembro({ iniciais, nome, rm, role, desc, linkedin, github, cor }) {
  return (
    <article className="bg-surface border border-slate-200 rounded-3xl p-6 text-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/10 transition">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-4" style={{ background: cor }}>{iniciais}</div>
      <h3 className="font-bold text-navy">{nome}</h3>
      <span className="block text-slate-500 text-xs mb-2">{rm}</span>
      <p className="text-brand text-sm font-semibold mb-3">{role}</p>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
      <div className="flex flex-col gap-2">
        <a href={linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 bg-brand-pale text-brand border border-brand text-xs font-semibold py-2 rounded-full hover:bg-brand hover:text-white transition"><IconLinkedin width={16} height={16} /> LinkedIn</a>
        <a href={github}   target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold py-2 rounded-full hover:bg-slate-800 hover:text-white transition"><IconGithub width={16} height={16} /> GitHub</a>
      </div>
    </article>
  )
}

export default function Equipe({ membros }) {
  return (
    <section id="equipe" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="Nossa Equipe" titulo="Quem construiu o JOVI IA" sub="Estudantes de Engenharia de Software da FIAP — Turma 1ESPV" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {membros.map(m => <CartaoMembro key={m.rm} {...m} />)}
        </div>
      </div>
    </section>
  )
}
