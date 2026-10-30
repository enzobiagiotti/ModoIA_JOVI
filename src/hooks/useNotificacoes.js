import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

/**
 * Hook customizado: gera avisos a partir das capturas e álbuns
 * (itens antigos sem revisão, álbuns vazios, novidades) e controla
 * quais foram lidos — tudo no localStorage.
 */
export function useNotificacoes(capturas, albuns) {
  const [lidas, setLidas] = useLocalStorage('jovia_notif_lidas', [])

  const notificacoes = useMemo(() => {
    const lista = []
    // Capturas recentes → novidade
    capturas.filter(c => c.recente).slice(0, 2).forEach(c =>
      lista.push({ id: `nova-${c.id}`, tipo: 'novidade', icone: '', titulo: 'Nova captura processada', desc: c.titulo }))
    // Capturas com data antiga (Math: dias desde a data) → lembrete de revisão
    capturas.forEach(c => {
      const [d, m, y] = c.data.split('/').map(Number)
      const dias = Math.floor((Date.now() - new Date(y, m - 1, d)) / 86400000)
      if (dias >= 20) lista.push({ id: `rev-${c.id}`, tipo: 'revisao', icone: '', titulo: `Revisar ${c.materia}`, desc: `"${c.titulo}"tem ${dias} dias sem revisão.` })
    })
    // Álbuns vazios
    albuns.filter(a => a.itens.length === 0).forEach(a =>
      lista.push({ id: `vazio-${a.id}`, tipo: 'album', icone: '', titulo: `Álbum "${a.nome}"está vazio`, desc: 'Adicione capturas pelo Dashboard.' }))
    // Lembrete de privacidade
    const publicos = albuns.filter(a => !a.privado).length
    if (publicos > 0) lista.push({ id: 'priv', tipo: 'privacidade', icone: '', titulo: `${publicos} álbum(ns) público(s)`, desc: 'Revise o que está visível para outras pessoas.' })
    return lista
  }, [capturas, albuns])

  const naoLidas = notificacoes.filter(n => !lidas.includes(n.id))
  const marcarLida = id => setLidas(l => [...new Set([...l, id])])
  const marcarTodas = () => setLidas(notificacoes.map(n => n.id))

  return { notificacoes, naoLidas, marcarLida, marcarTodas }
}
