export type Status = 0 | 1 | 2

export interface Emenda {
  id?: number
  numero: string
  autor: string
  descricao: string
  valor: number
  status: Status
  objetivo: string
  municipio: string
  data: string // yyyy-MM-dd
}

