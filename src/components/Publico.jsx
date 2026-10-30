import SectionHeader from './SectionHeader'

const DORES  = ['Foto da lousa saiu torta ou ilegível','Galeria misturada com memes e selfies','Sem tempo para copiar tudo à mão','Não encontra a foto quando precisa revisar']
const OUTROS = [
  { i: '', t: 'Professores',             d: 'Geram o conteúdo fotografado — quadros, slides e materiais que os alunos precisam registrar.' },
  { i: '', t: 'Criadores de Conteúdo',    d: 'Usam a câmera como ferramenta de trabalho e precisam de recursos avançados de forma rápida.' },
  { i: '', t: 'Profissionais em formação', d: 'Pessoas que estudam e trabalham ao mesmo tempo e precisam otimizar cada minuto do dia.' },
]

export default function Publico() {
  return (
    <section id="publico" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="Público-Alvo" titulo="Feito para quem não para" sub="O JOVI IA foi pensado para estudantes que conciliam estudos, trabalho e vida social — sempre em movimento." />
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <article className="relative bg-surface border-2 border-brand rounded-3xl p-8 overflow-hidden">
            <span className="absolute top-4 right-4 bg-brand text-white text-xs font-semibold px-3 py-1 rounded-full">Principal</span>
            <h3 className="text-navy text-2xl font-bold mb-3">Estudante Full-Time</h3>
            <p className="text-slate-500 mb-5">Jovens universitários que fotografam quadros, slides e cadernos o tempo todo e precisam transformar essas fotos em material de estudo de verdade.</p>
            <ul className="flex flex-col gap-2">
              {DORES.map(d => <li key={d} className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy">{d}</li>)}
            </ul>
          </article>
          <div className="flex flex-col gap-4">
            {OUTROS.map(o => (
              <article key={o.t} className="bg-surface border border-slate-200 rounded-2xl p-5 flex gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/10 transition">
                <div><h4 className="font-bold text-navy mb-1">{o.t}</h4><p className="text-slate-500 text-sm">{o.d}</p></div>
              </article>
            ))}
            <div className="bg-brand rounded-2xl p-6 text-center text-white">
              <strong className="block text-5xl font-extrabold leading-none mb-2">73%</strong>
              <span className="text-brand-pale text-sm">dos usuários usam apenas o modo automático da câmera</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
