import { useCapturas } from '../hooks/useCapturas'
import { useAlbuns } from '../hooks/useAlbuns'
import { useNotificacoes } from '../hooks/useNotificacoes'

const COR = { novidade: 'bg-green-100 text-green-700', revisao: 'bg-amber-100 text-amber-700', album: 'bg-blue-100 text-blue-700', privacidade: 'bg-purple-100 text-purple-700' }

/** Página privada: Notificações e privacidade */
export default function Notificacoes() {
  const { todas, loading } = useCapturas()
  const { albuns, togglePrivado } = useAlbuns()
  const { notificacoes, naoLidas, marcarLida, marcarTodas } = useNotificacoes(todas, albuns)

  return (
    <section className="min-h-screen bg-surface pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <span className="inline-block bg-brand-pale text-brand text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Área privada</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-2">Notificações & Privacidade</h1>
        <p className="text-slate-500 mb-8">Avisos sobre seus itens e controle do que é público ou privado.</p>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-start">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-navy">Avisos <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{naoLidas.length}</span></h2>
              {naoLidas.length > 0 && <button onClick={marcarTodas} className="text-sm text-brand font-semibold hover:underline">Marcar todas como lidas</button>}
            </div>
            {loading ? <p className="text-slate-500 text-sm">Carregando...</p> : notificacoes.length === 0 ? <p className="text-slate-500 text-sm">Tudo em dia! </p> : (
              <div className="flex flex-col gap-2">
                {notificacoes.map(n => { const lida = !naoLidas.includes(n); return (
                  <div key={n.id} className={`flex gap-3 rounded-xl px-4 py-3 border ${lida ? 'bg-surface border-transparent opacity-60' : 'bg-white border-brand-light/40'}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap"><strong className="text-navy text-sm">{n.titulo}</strong><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${COR[n.tipo]}`}>{n.tipo}</span></div>
                      <p className="text-slate-500 text-sm truncate">{n.desc}</p>
                    </div>
                    {!lida && <button onClick={()=>marcarLida(n.id)} className="text-xs text-brand font-semibold shrink-0">Lida</button>}
                  </div>
                )})}
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-bold text-navy mb-5">Privacidade dos álbuns</h2>
            <div className="flex flex-col gap-2">
              {albuns.map(a => (
                <div key={a.id} className="flex items-center justify-between bg-surface rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg" style={{background:a.cor}} /><span className="font-semibold text-navy text-sm">{a.nome}</span></div>
                  <button onClick={()=>togglePrivado(a.id)} className={`relative w-12 h-6 rounded-full transition ${a.privado?'bg-brand':'bg-slate-300'}`} title={a.privado?'Privado':'Público'}>
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${a.privado?'left-6':'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">Álbuns privados ficam visíveis só para você. Preferências salvas no localStorage.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
