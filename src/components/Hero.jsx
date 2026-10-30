import { Link } from 'react-router-dom'
import PhoneMockup from './PhoneMockup'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-navy via-[#1A2F5E] to-navy bg-[length:200%_200%] animate-gradShift text-white pt-36 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="text-center md:text-left animate-fadeUp">
          <span className="inline-block bg-brand-light/20 border border-brand-light/40 text-brand-pale px-4 py-1.5 rounded-full text-sm font-semibold mb-5">FIAP × JOVI Smartphone 2026</span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
            A câmera que <span className="text-brand-light">pensa junto</span> com você
          </h1>
          <p className="text-brand-pale text-lg mb-8">
            Modo IA nativo no JOVI. Aponte, escolha a ação e deixa a IA trabalhar: resumir, extrair texto, explicar e muito mais — tudo em segundos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#solucao" className="bg-brand hover:bg-brand-light text-white font-semibold px-7 py-3.5 rounded-xl transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/40">Conhecer a solução</a>
            <Link to="/dashboard" className="border border-brand-light text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-brand-light/15 transition hover:-translate-y-0.5">Acessar Dashboard</Link>
          </div>
        </div>
        <div className="flex justify-center animate-slideRight">
          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}
