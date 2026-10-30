import { useState, useEffect } from 'react'

/**
 * Hook customizado: sincroniza um estado React com o localStorage.
 * Separa a lógica de persistência da parte visual.
 */
export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave)
      return salvo !== null ? JSON.parse(salvo) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(valor))
  }, [chave, valor])

  return [valor, setValor]
}
