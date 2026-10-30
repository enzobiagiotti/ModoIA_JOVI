const ACOES = ['Resumir', 'Extrair', 'Explicar', 'Perguntas']

export default function PhoneMockup() {
  return (
    <div className="w-[240px] h-[480px] sm:w-[260px] sm:h-[520px] bg-[#0A0A1A] rounded-[38px] border-2 border-brand relative overflow-hidden animate-phoneFloat shrink-0" style={{ animation: 'phoneFloat 4s ease-in-out infinite, phoneBorder 3s ease-in-out infinite' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0A0A1A] rounded-b-2xl z-10" />
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-navy via-[#111827] to-dark">
          <div className="absolute left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-brand-light to-transparent animate-scanLine shadow-[0_0_8px_rgba(59,143,232,0.8)]" />
          <div className="absolute left-[12%] right-[12%] top-[18%] bottom-[28%] bg-brand/5">
            {['top-0 left-0 border-t-2 border-l-2','top-0 right-0 border-t-2 border-r-2','bottom-0 left-0 border-b-2 border-l-2','bottom-0 right-0 border-b-2 border-r-2'].map((c,i)=>(
              <div key={i} className={`absolute w-[18px] h-[18px] border-brand animate-blink ${c}`} />
            ))}
            <div className="absolute inset-2.5 flex flex-col gap-2 justify-center">
              {[88,75,82,70,85].map((w,i)=><div key={i} className="h-[3px] bg-white/20 rounded" style={{width:`${w}%`}} />)}
            </div>
          </div>
          <div className="absolute top-[12%] left-1/2 bg-brand/90 text-white text-[10px] font-semibold px-3.5 py-1 rounded-full whitespace-nowrap z-10 animate-chipPop">Documento detectado</div>
        </div>
        <div className="bg-dark/95 px-2.5 pt-2 pb-3 flex flex-col items-center gap-1.5">
          <p className="text-slate-500 text-[9px]">O que você quer fazer?</p>
          <div className="flex gap-1.5">
            {ACOES.map((a,i)=><span key={a} className={`text-[9px] font-semibold px-2.5 py-1 rounded-full ${i===0?'bg-brand text-white':'bg-slate-800 text-slate-400'}`}>{a}</span>)}
          </div>
          <div className="w-11 h-11 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-brand animate-shutterPulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
