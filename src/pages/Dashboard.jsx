import { useCapturas } from '../hooks/useCapturas'
import { useAuth } from '../hooks/useAuth'
import { MATERIAS, CORES_MATERIA } from '../services/api'

function CardCaptura({ c, onExcluir }) {
  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10 transition relative">
      {c.recente && <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">NOVO</span>}
      <div className="flex gap-2 flex-wrap">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CORES_MATERIA[c.materia]}`}>{c.materia}</span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{c.acao}</span>
      </div>
      <h3 className="font-bold text-navy leading-snug">{c.titulo}</h3>
      <p className="text-slate-500 text-sm line-clamp-3">{c.resumo}</p>
      <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-2 border-t border-slate-100">
        <span>{c.data} · {c.chars} chars</span>
        <button onClick={()=>onExcluir(c.id)} className="text-red-500 hover:text-red-700 font-semibold">Excluir</button>
      </div>
    </article>
  )
}

/** Página privada: Central de Conteúdo (consome API + localStorage) */
export default function Dashboard() {
  const { usuario } = useAuth()
  const { capturas, loading, erro, busca, setBusca, materia, setMateria, excluir, total, naLixeira } = useCapturas()

  return (
    <section className="min-h-screen bg-surface pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-block bg-brand-pale text-brand text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Área privada</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-navy">Olá, {usuario.nome.split(' ')[0]}! </h1>
            <p className="text-slate-500 mt-1">Sua central de conteúdo — tudo que a IA capturou para você.</p>
          </div>
          <div className="flex gap-3 text-sm">
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2"><strong className="text-brand text-xl">{total - naLixeira.length}</strong> <span className="text-slate-500">capturas</span></div>
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2"><strong className="text-red-500 text-xl">{naLixeira.length}</strong> <span className="text-slate-500">na lixeira</span></div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-3 mb-8">
          <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar nos resumos..." className="flex-1 px-4 py-2.5 bg-surface border border-slate-200 rounded-xl focus:outline-none focus:border-brand transition" />
          <div className="flex gap-2 flex-wrap">
            {['Todas', ...MATERIAS].map(m => (
              <button key={m} onClick={()=>setMateria(m)} className={`text-sm font-semibold px-4 py-2 rounded-full transition ${materia===m?'bg-brand text-white':'bg-surface text-slate-600 hover:bg-brand-pale'}`}>{m}</button>
            ))}
          </div>
        </div>

        {loading && <div className="text-center py-20 text-slate-500">Carregando capturas da API...</div>}
        {erro    && <div className="bg-red-50 border border-red-400 text-red-600 rounded-xl px-4 py-3">Erro ao carregar: {erro}</div>}
        {!loading && !erro && capturas.length === 0 && <div className="text-center py-20 text-slate-500">Nenhuma captura encontrada </div>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capturas.map(c => <CardCaptura key={c.id} c={c} onExcluir={excluir} />)}
        </div>

        <p className="text-center text-slate-400 text-xs mt-10">Dados consumidos da API pública JSONPlaceholder e transformados em capturas do JOVI IA.</p>
      </div>
    </section>
  )
}
