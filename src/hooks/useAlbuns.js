import { useLocalStorage } from './useLocalStorage'

/**
 * Hook customizado: álbuns/pastas criados pelo próprio usuário.
 * Lógica de criar, renomear, excluir, mover capturas e alternar privacidade.
 * Persistido no localStorage.
 */
export function useAlbuns() {
  const [albuns, setAlbuns] = useLocalStorage('jovia_albuns', [
    { id: 1, nome: 'Provas P1', cor: '#1A6BCC', privado: false, itens: [] },
    { id: 2, nome: 'Revisão',   cor: '#0D9488', privado: true,  itens: [] },
  ])

  const criar = (nome, cor = '#1A6BCC') =>
    setAlbuns(a => [...a, { id: Math.floor(Math.random() * 1e6), nome, cor, privado: false, itens: [] }])

  const renomear = (id, nome) =>
    setAlbuns(a => a.map(x => x.id === id ? { ...x, nome } : x))

  const excluir = id => setAlbuns(a => a.filter(x => x.id !== id))

  const togglePrivado = id =>
    setAlbuns(a => a.map(x => x.id === id ? { ...x, privado: !x.privado } : x))

  const adicionarItem = (albumId, capturaId) =>
    setAlbuns(a => a.map(x =>
      x.id === albumId && !x.itens.includes(capturaId)
        ? { ...x, itens: [...x.itens, capturaId] } : x))

  const removerItem = (albumId, capturaId) =>
    setAlbuns(a => a.map(x =>
      x.id === albumId ? { ...x, itens: x.itens.filter(i => i !== capturaId) } : x))

  // Reorganizar manualmente: move item uma posição para cima/baixo
  const moverItem = (albumId, capturaId, dir) =>
    setAlbuns(a => a.map(x => {
      if (x.id !== albumId) return x
      const i = x.itens.indexOf(capturaId); const j = i + dir
      if (i < 0 || j < 0 || j >= x.itens.length) return x
      const itens = [...x.itens]; [itens[i], itens[j]] = [itens[j], itens[i]]
      return { ...x, itens }
    }))

  return { albuns, criar, renomear, excluir, togglePrivado, adicionarItem, removerItem, moverItem }
}
