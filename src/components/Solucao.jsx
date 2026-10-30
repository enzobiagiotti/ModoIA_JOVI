import SectionHeader from './SectionHeader'
import { IconResumo, IconTexto, IconCerebro, IconGlobo, IconPergunta, IconCalendario } from './Icons'

const ACOES = [
  { Icone: IconResumo, cor: 'text-blue-600', t: 'Fazer Resumo',       d: 'Resume o conteúdo da foto em tópicos claros e objetivos, sem precisar copiar nada.', bg: 'bg-blue-50' },
  { Icone: IconTexto, cor: 'text-green-600', t: 'Extrair Texto',      d: 'OCR offline transforma imagem em texto editável, sem internet e com privacidade total.', bg: 'bg-green-50' },
  { Icone: IconCerebro, cor: 'text-purple-600', t: 'Explicar Conteúdo', d: 'A IA explica o que está escrito na foto de forma simples e contextualizada.', bg: 'bg-purple-50' },
  { Icone: IconGlobo, cor: 'text-amber-600', t: 'Traduzir',           d: 'Traduz o texto da foto para qualquer idioma com um único toque.', bg: 'bg-amber-50' },
  { Icone: IconPergunta, cor: 'text-rose-600', t: 'Gerar Perguntas',    d: 'Cria questões de revisão com base no conteúdo fotografado para fixar o aprendizado.', bg: 'bg-rose-50' },
  { Icone: IconCalendario, cor: 'text-teal-600', t: 'Sync Calendário',   d: 'Detecta a matéria pelo calendário e salva automaticamente na pasta correta.', bg: 'bg-teal-50' },
]
const PASSOS = [
  { n: '1', t: 'Seleciona', d: 'Abre a câmera e escolhe o Modo IA' },
  { n: '2', t: 'Escolhe',   d: 'Seleciona a ação no mini menu' },
  { n: '3', t: 'Captura',   d: 'Bate a foto normalmente' },
  { n: '4', t: 'Resultado', d: 'IA entrega o resultado em segundos' },
]

function CardAcao({ Icone, cor, t, d, bg }) {
  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10 transition">
      <div className={`w-14 h-14 ${bg} ${cor} rounded-xl flex items-center justify-center mb-4`}><Icone width={26} height={26} /></div>
      <h3 className="font-bold text-navy mb-2">{t}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{d}</p>
    </article>
  )
}

export default function Solucao() {
  return (
    <section id="solucao" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="A Solução" titulo="Um menu de IA dentro da câmera" sub="Igual ao menu de efeitos do iPhone — só que ao invés de efeitos visuais, o usuário escolhe o que a IA vai fazer com a foto." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ACOES.map(a => <CardAcao key={a.t} {...a} />)}
        </div>
        <div className="bg-navy rounded-3xl p-8 md:p-10 text-center">
          <h3 className="text-white text-xl font-bold mb-8">Como funciona em 4 passos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PASSOS.map(p => (
              <article key={p.n} className="bg-white/5 border border-brand-light/30 rounded-2xl p-6 hover:bg-brand-light/15 transition">
                <div className="w-11 h-11 bg-brand rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">{p.n}</div>
                <h4 className="text-white font-bold mb-1">{p.t}</h4>
                <p className="text-brand-pale text-sm">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
