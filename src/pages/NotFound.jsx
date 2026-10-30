import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section className="min-h-screen bg-navy flex flex-col items-center justify-center text-center px-6">
      <span className="text-8xl font-extrabold text-brand-light">404</span>
      <h1 className="text-white text-2xl font-bold mt-4">Página não encontrada</h1>
      <p className="text-brand-pale mt-2 mb-8">O conteúdo que você procura não existe ou foi movido.</p>
      <Link to="/" className="bg-brand hover:bg-brand-light text-white font-semibold px-7 py-3.5 rounded-xl transition">← Voltar para o início</Link>
    </section>
  )
}
