import SectionHeader from './SectionHeader'

const ROWS = [
  ['iPhone — menu só muda o visual da foto',    'Menu processa o conteúdo com IA'],
  ['Google Lens — precisa sair da câmera',      'Nativo dentro da câmera JOVI'],
  ['CamScanner — app separado, fricção extra',  'Zero fricção, zero app extra'],
  ['Câmera padrão — não age sobre o conteúdo', 'IA age no momento da captura'],
  ['Nenhum — explica o que cada modo faz',      'Mini-tutorial na primeira ativação'],
]

export default function Diferencial() {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader light tag="Diferencial" titulo="Por que o JOVI IA é diferente?" />
        <div className="grid md:grid-cols-2 gap-0.5 rounded-2xl overflow-hidden border border-brand-light/20">
          <div className="bg-white/5 p-8">
            <h4 className="text-white text-center font-bold mb-6 pb-3 border-b border-white/10">Concorrentes</h4>
            {ROWS.map(([l]) => <div key={l} className="flex gap-3 py-2.5 text-slate-300 text-sm border-b border-white/5 last:border-0">{l}</div>)}
          </div>
          <div className="bg-brand/15 p-8">
            <h4 className="text-white text-center font-bold mb-6 pb-3 border-b border-white/10">JOVI IA</h4>
            {ROWS.map(([,r]) => <div key={r} className="flex gap-3 py-2.5 text-white font-medium text-sm border-b border-white/5 last:border-0">{r}</div>)}
          </div>
        </div>
      </div>
    </section>
  )
}
