import { useState } from 'react'
import SectionHeader from './SectionHeader'

const TELAS = [
  { n: '01', t: 'Câmera com Modo IA',       d: 'Detecção automática de documento com cantos azuis e mini menu de ações.', tipo: 'camera' },
  { n: '02', t: 'Captura e Processamento',  d: 'Animação de carregamento enquanto a IA processa a imagem via Gemini API.', tipo: 'proc' },
  { n: '03', t: 'Resultado com OCR',        d: 'Texto extraído, tag de matéria e botões de exportação para Notion ou Drive.', tipo: 'result' },
  { n: '04', t: 'Histórico por Matéria',    d: 'Biblioteca organizada automaticamente com filtros e busca por conteúdo.', tipo: 'hist' },
]

function Mini({ tipo }) {
  const base = 'w-[130px] h-[240px] rounded-[22px] border-2 border-brand overflow-hidden flex flex-col shadow-xl shadow-black/30'
  const top  = 'bg-navy px-2 py-1.5 flex justify-between items-center text-[8px] text-white font-semibold'
  if (tipo === 'camera') return (
    <div className={`${base} bg-[#111827]`}>
      <div className={top}><span>9:41</span><span className="text-[9px] font-bold">JOVI IA</span><span></span></div>
      <div className="bg-brand/90 text-white text-[8px] font-semibold px-2 py-0.5 mx-2 my-1 rounded-lg text-center">Conteúdo detectado</div>
      <div className="flex-1 mx-2.5 my-1 relative bg-[#1A1A2E] rounded-md">
        <div className="absolute inset-1.5 flex flex-col gap-1 justify-center">{[85,70,78,65].map((w,i)=><div key={i} className="h-0.5 bg-white/20 rounded" style={{width:`${w}%`}}/>)}</div>
        <div className="absolute left-[10%] right-[10%] h-px top-[40%] bg-gradient-to-r from-transparent via-brand to-transparent opacity-70"/>
      </div>
      <div className="bg-dark/95 px-1.5 py-1.5 flex flex-col items-center gap-1">
        <div className="flex gap-1.5 text-[7px] text-slate-500"><span>Foto</span><span className="text-brand font-bold">IA</span><span>Mais</span></div>
        <div className="w-[26px] h-[26px] rounded-full border border-white flex items-center justify-center"><div className="w-[18px] h-[18px] rounded-full bg-brand"/></div>
      </div>
    </div>
  )
  if (tipo === 'proc') return (
    <div className={`${base} bg-[#111827]`}>
      <div className={top}><span>9:41</span><span className="text-[9px] font-bold">Processando...</span><span/></div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1 p-2">
        <p className="text-white text-[8px] text-center">A IA está organizando suas anotações...</p>
        <div className="w-4/5 h-[3px] bg-slate-800 rounded overflow-hidden"><div className="h-full w-[63%] bg-brand"/></div>
        <p className="text-amber-400 text-[7px]">Imagem não salva na galeria</p>
      </div>
      <div className="bg-dark px-2 py-1.5 flex gap-1"><div className="flex-1 bg-slate-800 text-slate-400 text-[8px] font-semibold text-center py-1 rounded-md">Cancelar</div><div className="flex-1 bg-brand text-white text-[8px] font-semibold text-center py-1 rounded-md">Usar foto</div></div>
    </div>
  )
  if (tipo === 'result') return (
    <div className={`${base} bg-surface`}>
      <div className={top}><span>←</span><span className="text-[9px] font-bold">Resultado IA</span><span/></div>
      <div className="flex-1 px-2 py-1.5 flex flex-col gap-1">
        <div className="h-12 bg-slate-300 rounded-md shrink-0"/>
        <div className="flex gap-0.5"><span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-lg bg-brand-pale text-brand">Física</span><span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-lg bg-green-100 text-green-700">Resumido</span></div>
        <div className="bg-white rounded-md p-1.5 border-l-2 border-brand flex-1"><p className="text-brand text-[7px] font-bold mb-1">Resumo gerado pela IA</p>{[95,80,88,72,85].map((w,i)=><div key={i} className="h-[2.5px] bg-slate-300 rounded mb-0.5" style={{width:`${w}%`}}/>)}</div>
      </div>
      <div className="bg-white px-2 py-1.5 flex gap-0.5 border-t border-slate-200"><div className="flex-1 bg-brand-pale text-brand text-[7px] font-semibold text-center py-1 rounded">Copiar</div><div className="flex-1 bg-brand text-white text-[7px] font-semibold text-center py-1 rounded">Salvar</div><div className="flex-1 bg-brand-pale text-brand text-[7px] font-semibold text-center py-1 rounded">Notion</div></div>
    </div>
  )
  return (
    <div className={`${base} bg-surface`}>
      <div className={top}><span/><span className="text-[9px] font-bold">Histórico</span><span>+</span></div>
      <div className="flex-1 px-1.5 py-1.5 flex flex-col gap-1">
        <div className="bg-white border border-slate-200 rounded-lg px-1.5 py-1 text-[7px] text-slate-500">Buscar nos resumos...</div>
        <div className="flex gap-0.5"><span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-lg bg-brand-pale text-brand">Todos</span><span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-lg bg-slate-100 text-slate-500">Física</span></div>
        <div className="grid grid-cols-2 gap-0.5 flex-1">
          {[['bg-blue-100','','Física'],['bg-green-100','','Cálculo'],['bg-amber-100','','Química'],['bg-slate-100','+','']].map(([bg,i,n],k)=>(
            <div key={k} className={`${bg} rounded-lg p-1 flex flex-col items-center gap-0.5`}>{n&&<p className="text-[7px] font-bold text-navy">{n}</p>}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Galeria() {
  const [ativa, setAtiva] = useState(null)
  return (
    <section id="galeria" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="Galeria" titulo="Veja o protótipo em ação" sub="4 telas navegáveis desenvolvidas no Figma, cobrindo todo o fluxo do Modo IA." />
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {TELAS.map(t => (
            <article key={t.n} onClick={() => setAtiva(ativa===t.n?null:t.n)} className={`bg-white border rounded-3xl p-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center cursor-pointer transition hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/10 ${ativa===t.n?'border-brand':'border-slate-200'}`}>
              <div className="flex justify-center"><Mini tipo={t.tipo} /></div>
              <div className="text-center sm:text-left">
                <span className="inline-block bg-brand-pale text-brand text-xs font-bold px-3 py-1 rounded-full mb-2">{t.n}</span>
                <h3 className="font-bold text-navy mb-2">{t.t}</h3>
                <p className="text-slate-500 text-sm">{t.d}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center">
          <a href="https://www.figma.com/design/AQ9DinKnuI6V1tQcUPmyw9" target="_blank" rel="noreferrer" className="inline-block bg-brand hover:bg-brand-light text-white font-semibold px-7 py-3.5 rounded-xl transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/40">Ver protótipo completo no Figma</a>
        </div>
      </div>
    </section>
  )
}
