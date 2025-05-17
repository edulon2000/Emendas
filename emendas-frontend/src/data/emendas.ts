export interface Emenda {
    id: number
    autor: string
    descricao: string
    valor: number
    status: string
  }
  
  export const emendasMock: Emenda[] = [
    {
      id: 1,
      autor: "João da Silva",
      descricao: "Construção de escola municipal",
      valor: 500000,
      status: "Aprovada",
    },
    {
      id: 2,
      autor: "Maria Oliveira",
      descricao: "Reforma de posto de saúde",
      valor: 250000,
      status: "Pendente",
    },
    {
      id: 3,
      autor: "Carlos Souza",
      descricao: "Asfaltamento de vias públicas",
      valor: 800000,
      status: "Rejeitada",
    },
  ]
  