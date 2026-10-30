import { useStats } from '../hooks/useStats'

export default function Stats() {
  const { stats, visitas, fmt } = useStats()
  const itens = [
    { v: stats.resumos,   l: 'Resumos gerados',      i: '' },
    { v: stats.textos,    l: 'Textos extraídos',     i: '' },
    { v: stats.perguntas, l: 'Perguntas criadas',    i: '' },
    { v: stats.usuarios,  l: 'Usuários ativos',      i: '' },
    { v: visitas,         l: 'Visitas nesta página', i: '' },
  ]
  return (
    <section className="bg-navy py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-3">
          {itens.map(x => (
            <div key={x.l} className="flex flex-col items-center gap-1 p-5 bg-white/5 border border-brand-light/20 rounded-xl text-center hover:bg-brand-light/10 transition">
              <strong className="text-3xl font-extrabold text-brand-light leading-none">{fmt(x.v)}</strong>
              <span className="text-xs text-slate-400">{x.l}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-500 text-xs">* Estatísticas geradas com Math.random() — atualizam a cada 30s</p>
      </div>
    </section>
  )
}
