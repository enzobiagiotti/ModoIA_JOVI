import { useMemo, useState } from 'react'
import { useFetch } from './useFetch'
import { useLocalStorage } from './useLocalStorage'
import { API_CAPTURAS, MATERIAS, ACOES } from '../services/api'

/**
 * Hook customizado: transforma os posts da API pública (JSONPlaceholder)
 * em "capturas"do JOVI IA, com matéria e ação atribuídas via Math.
 * Também gerencia busca, filtro e lixeira (localStorage).
 */
export function useCapturas() {
  const { dados, loading, erro } = useFetch(API_CAPTURAS)
  const [busca,   setBusca]   = useState('')
  const [materia, setMateria] = useState('Todas')
  const [lixeira, setLixeira] = useLocalStorage('jovia_lixeira', [])

  const capturas = useMemo(() => {
    if (!dados) return []
    return dados.map((post, i) => {
      const seed = post.id * 7919
      const mat  = MATERIAS[seed % MATERIAS.length]
      const acao = ACOES[Math.floor((seed / 3) % ACOES.length)]
      const dias = Math.floor(seed % 30)
      const data = new Date(); data.setDate(data.getDate() - dias)
      return {
        id:      post.id,
        titulo:  post.title.charAt(0).toUpperCase() + post.title.slice(1, 42),
        resumo:  post.body,
        materia: mat,
        acao,
        data:    data.toLocaleDateString('pt-BR'),
        chars:   Math.round(post.body.length * 4.7),
        recente: i < 4,
      }
    })
  }, [dados])

  const visiveis = useMemo(() => {
    return capturas
      .filter(c => !lixeira.includes(c.id))
      .filter(c => materia === 'Todas' || c.materia === materia)
      .filter(c =>
        c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        c.resumo.toLowerCase().includes(busca.toLowerCase())
      )
  }, [capturas, lixeira, materia, busca])

  const naLixeira = capturas.filter(c => lixeira.includes(c.id))

  const excluir   = id => setLixeira(l => [...l, id])
  const restaurar = id => setLixeira(l => l.filter(x => x !== id))
  const esvaziar  = () => setLixeira([])

  return {
    capturas: visiveis, todas: capturas, naLixeira, loading, erro,
    busca, setBusca, materia, setMateria,
    excluir, restaurar, esvaziar,
    total: capturas.length,
  }
}
