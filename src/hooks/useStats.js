import { useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

/**
 * Hook customizado: gera estatísticas com Math.random/round e
 * conta visitas via localStorage. Atualiza a cada 30s.
 */
function gerar() {
  const base = { resumos: 1240, textos: 890, perguntas: 560, usuarios: 320 }
  return {
    resumos:   Math.round(base.resumos   + Math.random() * 50),
    textos:    Math.round(base.textos    + Math.random() * 40),
    perguntas: Math.round(base.perguntas + Math.random() * 30),
    usuarios:  Math.round(base.usuarios  + Math.random() * 20),
  }
}

export function useStats() {
  const [stats, setStats] = useState(gerar)
  const [visitas, setVisitas] = useLocalStorage('jovia_visitas', 0)

  useEffect(() => {
    setVisitas(v => v + 1)
    const id = setInterval(() => setStats(gerar()), 30000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fmt = n => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n

  return { stats, visitas, fmt }
}
