import { useState, useEffect } from 'react'

/**
 * Hook customizado: consome qualquer API via fetch.
 * Retorna dados, loading e erro — o componente só cuida do visual.
 */
export function useFetch(url) {
  const [dados,   setDados]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro,    setErro]    = useState(null)

  useEffect(() => {
    let ativo = true
    setLoading(true)
    setErro(null)

    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`Erro ${r.status}`)
        return r.json()
      })
      .then(json => { if (ativo) setDados(json) })
      .catch(e  => { if (ativo) setErro(e.message) })
      .finally(() => { if (ativo) setLoading(false) })

    return () => { ativo = false }
  }, [url])

  return { dados, loading, erro }
}
