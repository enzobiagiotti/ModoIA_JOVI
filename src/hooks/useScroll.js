import { useState, useEffect } from 'react'

/** Hook customizado: retorna true quando a página rolou além de `limite`px */
export function useScroll(limite = 50) {
  const [rolou, setRolou] = useState(false)
  useEffect(() => {
    const fn = () => setRolou(window.scrollY > limite)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [limite])
  return rolou
}
