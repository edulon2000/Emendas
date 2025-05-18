import { StatusEmenda } from "@/enums/statusEmenda"

export type Status = 0 | 1 | 2

export interface Emenda {
  id?: number
  numero: string
  autor: string
  descricao: string
  valor: number
  status: StatusEmenda
  municipio: string
  data: string // yyyy-MM-dd
}

