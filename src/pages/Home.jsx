import Hero        from '../components/Hero'
import Stats       from '../components/Stats'
import Solucao     from '../components/Solucao'
import Diferencial from '../components/Diferencial'
import Publico     from '../components/Publico'
import Galeria     from '../components/Galeria'
import Equipe      from '../components/Equipe'
import Contato     from '../components/Contato'
import { MEMBROS } from '../services/membros'

/** Página pública: Landing Page completa */
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Solucao />
      <Diferencial />
      <Publico />
      <Galeria />
      <Equipe membros={MEMBROS} />
      <Contato membros={MEMBROS} />
    </>
  )
}
