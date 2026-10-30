export default function SectionHeader({ tag, titulo, sub, light = false }) {
  return (
    <div className="text-center mb-12">
      <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-3 ${light ? 'bg-brand-light/20 text-brand-pale' : 'bg-brand-pale text-brand'}`}>{tag}</span>
      <h2 className={`text-3xl md:text-4xl font-extrabold mb-3 leading-tight ${light ? 'text-white' : 'text-navy'}`}>{titulo}</h2>
      {sub && <p className={`max-w-xl mx-auto ${light ? 'text-brand-pale' : 'text-slate-500'}`}>{sub}</p>}
    </div>
  )
}
