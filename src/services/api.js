/**
 * Camada de serviços: URLs e constantes da API.
 * API pública de terceiros: JSONPlaceholder (posts → capturas).
 */
export const API_CAPTURAS = 'https://jsonplaceholder.typicode.com/posts?_limit=12'

export const MATERIAS = ['Física', 'Cálculo', 'Química', 'Português', 'História', 'Biologia']

export const ACOES = ['Resumo', 'Extrair Texto', 'Explicar', 'Perguntas', 'Traduzir']

export const CORES_MATERIA = {
  'Física':    'bg-blue-100 text-blue-700',
  'Cálculo':   'bg-green-100 text-green-700',
  'Química':   'bg-amber-100 text-amber-700',
  'Português': 'bg-purple-100 text-purple-700',
  'História':  'bg-rose-100 text-rose-700',
  'Biologia':  'bg-teal-100 text-teal-700',
}

/** Usuários mockados para autenticação (sem back-end) */
export const USUARIOS = [
  { email: 'aluno@fiap.com.br', senha: '123456', nome: 'Aluno FIAP',  role: 'aluno' },
  { email: 'admin@jovi.com',    senha: 'admin123', nome: 'Admin JOVI', role: 'admin' },
]
