// src/enums/statusEmenda.ts
export enum StatusEmenda {
  EmAnalise = 0,
  EmExecucao = 1,
  Aprovado = 2,
}

export function getStatusLabel(status: StatusEmenda): string {
  switch(status) {
    case StatusEmenda.EmAnalise: return "Em Análise"
    case StatusEmenda.EmExecucao: return "Em Execução"
    case StatusEmenda.Aprovado: return "Aprovado"
    default: return "Desconhecido"
  }
}