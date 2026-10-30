import { useCapturas } from '../hooks/useCapturas'
import { MATERIAS, ACOES, CORES_MATERIA } from '../services/api'

/** Página privada: Histórico, estatísticas e lixeira */
export default function Historico() {
  const { capturas, naLixeira, restaurar, esvaziar, loading, total } = useCapturas()

  // Math: contagem por matéria e por ação, com percentual arredondado
  const porMateria = MATERIAS.map(m => {
    const n = capturas.filter(c => c.materia === m).length
    return { m, n, pct: capturas.length ? Math.round((n / capturas.length) * 100) : 0 }
  }).sort((a,b) => b.n - a.n)

  const porAcao = ACOES.map(a => ({ a, n: capturas.filter(c => c.acao === a).length }))
  const totalChars = capturas.reduce((s, c) => s + c.chars, 0)
  const mediaChars = capturas.length ? Math.round(totalChars / capturas.length) : 0

  return (
    <section className="min-h-screen bg-surface pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <span className="inline-block bg-brand-pale text-brand text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Área privada</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-2">Histórico e Estatísticas</h1>
        <p className="text-slate-500 mb-10">Números de uso por categoria e itens excluídos recuperáveis.</p>

        {loading ? <p className="text-slate-500">Carregando...</p> : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[['','Capturas ativas',capturas.length],['','Na lixeira',naLixeira.length],['','Total de caracteres',totalChars.toLocaleString('pt-BR')],['','Média por captura',mediaChars]].map(([i,l,v]) => (
                <div key={l} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <strong className="block text-3xl font-extrabold text-brand mt-2">{v}</strong>
                  <span className="text-slate-500 text-sm">{l}</span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="font-bold text-navy mb-5">Capturas por matéria</h2>
                <div className="flex flex-col gap-3">
                  {porMateria.map(x => (
                    <div key={x.m}>
                      <div className="flex justify-between text-sm mb-1"><span className={`font-semibold px-2 py-0.5 rounded ${CORES_MATERIA[x.m]}`}>{x.m}</span><span className="text-slate-500">{x.n} · {x.pct}%</span></div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-brand rounded-full transition-all" style={{width:`${x.pct}%`}} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="font-bold text-navy mb-5">Capturas por ação de IA</h2>
                <div className="flex flex-col gap-3">
                  {porAcao.map(x => (
                    <div key={x.a} className="flex items-center justify-between bg-surface rounded-xl px-4 py-3">
                      <span className="font-semibold text-navy text-sm">{x.a}</span>
                      <span className="bg-brand text-white text-sm font-bold px-3 py-1 rounded-full">{x.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-navy">Lixeira ({naLixeira.length})</h2>
                {naLixeira.length > 0 && <button onClick={esvaziar} className="text-sm text-brand font-semibold hover:underline">Restaurar todos</button>}
              </div>
              {naLixeira.length === 0 ? <p className="text-slate-500 text-sm">Nenhum item excluído. Os itens que você excluir no Dashboard aparecem aqui.</p> : (
                <div className="flex flex-col gap-2">
                  {naLixeira.map(c => (
                    <div key={c.id} className="flex items-center justify-between bg-surface rounded-xl px-4 py-3 gap-4">
                      <div className="min-w-0"><span className={`text-xs font-semibold px-2 py-0.5 rounded ${CORES_MATERIA[c.materia]}`}>{c.materia}</span> <span className="text-sm text-navy truncate">{c.titulo}</span></div>
                      <button onClick={()=>restaurar(c.id)} className="shrink-0 text-sm bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-green-200 transition">Restaurar</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
