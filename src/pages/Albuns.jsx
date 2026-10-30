import { useState } from 'react'
import { useAlbuns } from '../hooks/useAlbuns'
import { useCapturas } from '../hooks/useCapturas'
import { CORES_MATERIA } from '../services/api'

const CORES = ['#1A6BCC', '#0D9488', '#7C3AED', '#F59E0B', '#EC4899', '#16A34A']

/** Página privada: Organização livre — álbuns criados pelo usuário */
export default function Albuns() {
  const { albuns, criar, renomear, excluir, togglePrivado, adicionarItem, removerItem, moverItem } = useAlbuns()
  const { todas, loading } = useCapturas()
  const [nome, setNome] = useState('')
  const [cor, setCor] = useState(CORES[0])
  const [ativo, setAtivo] = useState(null)
  const [editando, setEditando] = useState(null)

  const album = albuns.find(a => a.id === ativo)
  const byId = id => todas.find(c => c.id === id)

  const submit = e => { e.preventDefault(); if (nome.trim()) { criar(nome.trim(), cor); setNome('') } }

  return (
    <section className="min-h-screen bg-surface pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <span className="inline-block bg-brand-pale text-brand text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Área privada</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-2">Meus Álbuns</h1>
        <p className="text-slate-500 mb-8">Crie pastas, mova capturas e reorganize na ordem que quiser.</p>

        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 mb-8">
          <input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Nome do novo álbum" className="flex-1 px-4 py-2.5 bg-surface border border-slate-200 rounded-xl focus:outline-none focus:border-brand" />
          <div className="flex gap-2 items-center">
            {CORES.map(c => <button type="button" key={c} onClick={()=>setCor(c)} className={`w-7 h-7 rounded-full border-2 ${cor===c?'border-navy scale-110':'border-transparent'}`} style={{background:c}} />)}
          </div>
          <button className="bg-brand hover:bg-brand-light text-white font-semibold px-6 py-2.5 rounded-xl transition">+ Criar</button>
        </form>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 items-start">
          <div className="flex flex-col gap-3">
            {albuns.map(a => (
              <article key={a.id} onClick={()=>setAtivo(a.id)} className={`bg-white border rounded-2xl p-4 cursor-pointer transition hover:-translate-y-0.5 hover:shadow-lg ${ativo===a.id?'border-brand shadow-lg shadow-brand/10':'border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg" style={{background:a.cor}}></div>
                  <div className="flex-1 min-w-0">
                    {editando===a.id
                      ? <input autoFocus defaultValue={a.nome} onBlur={e=>{renomear(a.id,e.target.value||a.nome);setEditando(null)}} onKeyDown={e=>e.key==='Enter'&&e.target.blur()} onClick={e=>e.stopPropagation()} className="w-full px-2 py-1 border border-brand rounded-lg text-sm" />
                      : <h3 className="font-bold text-navy truncate">{a.nome}</h3>}
                    <span className="text-xs text-slate-500">{a.itens.length} item(ns) · {a.privado ? 'Privado' : 'Público'}</span>
                  </div>
                  <div className="flex gap-1" onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>setEditando(a.id)} title="Renomear" className="w-8 h-8 rounded-lg bg-surface hover:bg-brand-pale"></button>
                    <button onClick={()=>togglePrivado(a.id)} title="Privacidade" className="w-8 h-8 rounded-lg bg-surface hover:bg-brand-pale">{a.privado?'':''}</button>
                    <button onClick={()=>{excluir(a.id); if(ativo===a.id) setAtivo(null)}} title="Excluir" className="w-8 h-8 rounded-lg bg-surface hover:bg-red-100"></button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 min-h-[300px]">
            {!album ? <p className="text-slate-500 text-sm">Selecione um álbum à esquerda para ver e organizar os itens.</p> : (
              <>
                <h2 className="font-bold text-navy text-xl mb-1">{album.nome}</h2>
                <p className="text-slate-500 text-sm mb-5">Use ↑ ↓ para reorganizar manualmente.</p>
                {album.itens.length === 0 && <p className="text-slate-400 text-sm mb-5">Nenhuma captura ainda.</p>}
                <div className="flex flex-col gap-2 mb-6">
                  {album.itens.map((id, i) => { const c = byId(id); if (!c) return null; return (
                    <div key={id} className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${CORES_MATERIA[c.materia]}`}>{c.materia}</span>
                      <span className="flex-1 text-sm text-navy truncate">{c.titulo}</span>
                      <button onClick={()=>moverItem(album.id,id,-1)} disabled={i===0} className="w-7 h-7 rounded-lg bg-white border border-slate-200 disabled:opacity-30">↑</button>
                      <button onClick={()=>moverItem(album.id,id,1)} disabled={i===album.itens.length-1} className="w-7 h-7 rounded-lg bg-white border border-slate-200 disabled:opacity-30">↓</button>
                      <button onClick={()=>removerItem(album.id,id)} className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-red-100"></button>
                    </div>
                  )})}
                </div>
                <h3 className="font-semibold text-navy text-sm mb-2">Adicionar captura</h3>
                {loading ? <p className="text-slate-500 text-sm">Carregando...</p> : (
                  <div className="flex flex-wrap gap-2">
                    {todas.filter(c => !album.itens.includes(c.id)).map(c => (
                      <button key={c.id} onClick={()=>adicionarItem(album.id,c.id)} className="text-xs bg-surface hover:bg-brand-pale border border-slate-200 rounded-full px-3 py-1.5 transition">+ {c.titulo.slice(0,28)}…</button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
