import React, { useState, useMemo } from "react"
import { Emenda } from "@/data/emendas"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusEmenda } from "@/enums/statusEmenda"

interface Props {
  emendas: Emenda[]
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onDetail: (id: number) => void

}

function getStatusLabel(status: StatusEmenda): { label: string; colorClass: string } {
  switch (status) {
    case StatusEmenda.Pendente:
      return { label: "Pendente", colorClass: "text-yellow-700 bg-yellow-100" }
    case StatusEmenda.Rejeitada:
      return { label: "Rejeitada", colorClass: "text-blue-700 bg-blue-100" }
    case StatusEmenda.Aprovada:
      return { label: "Aprovada", colorClass: "text-green-700 bg-green-100" }
    default:
      return { label: "Desconhecido", colorClass: "text-gray-700 bg-gray-100" }
  }
}


export default function EmendaTable({ emendas, onEdit, onDelete, onDetail  }: Props) {
  const [statusFilter, setStatusFilter] = useState<StatusEmenda | "">("")
  const [municipioFilter, setMunicipioFilter] = useState<string>("")

  // opções únicas de status presentes nos dados para filtro
  const statusOptions = useMemo<StatusEmenda[]>(() => {
  const uniqueStatus = Array.from(new Set(emendas.map(e => e.status)))
  return uniqueStatus.sort((a, b) => a.localeCompare(b))
}, [emendas])


  // opções únicas de municípios presentes nos dados para filtro
  const municipioOptions = useMemo(() => {
    const uniqueMunicipios = Array.from(new Set(emendas.map(e => e.municipio)))
    return uniqueMunicipios.sort()
  }, [emendas])

  // emendas filtradas
  const filteredEmendas = useMemo(() => {
    return emendas.filter((emenda) => {
      const statusMatch = statusFilter === "" || emenda.status === statusFilter
      const municipioMatch = municipioFilter === "" || emenda.municipio === municipioFilter
      return statusMatch && municipioMatch
    })
  }, [emendas, statusFilter, municipioFilter])

  return (
    <Card>
      <CardContent className="overflow-x-auto p-6">
        {/* FILTROS */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div>
            <label htmlFor="statusFilter" className="block mb-1 font-semibold text-gray-700">
              Filtrar por Status
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusEmenda)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Todos</option>
              {statusOptions.map((status) => {
                const label = getStatusLabel(status as StatusEmenda).label
                return (
                  <option key={status} value={status}>
                    {label}
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <label htmlFor="municipioFilter" className="block mb-1 font-semibold text-gray-700">
              Filtrar por Município
            </label>
            <select
              id="municipioFilter"
              value={municipioFilter}
              onChange={(e) => setMunicipioFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Todos</option>
              {municipioOptions.map((municipio) => (
                <option key={municipio} value={municipio}>
                  {municipio}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABELA */}
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="py-3 px-4">Autor</th>
              <th className="py-3 px-4">Descrição</th>
              <th className="py-3 px-4">Município</th>
              <th className="py-3 px-4">Valor (R$)</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Data</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmendas.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  Nenhuma emenda encontrada.
                </td>
              </tr>
            )}
            {filteredEmendas.map((emenda) => {
              const statusInfo = getStatusLabel(emenda.status)
              return (
                <tr
                  key={emenda.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4">{emenda.autor}</td>
                  <td className="py-3 px-4 max-w-xs truncate" title={emenda.descricao}>
                    {emenda.descricao}
                  </td>
                  <td className="py-3 px-4">{emenda.municipio}</td>
                  <td className="py-3 px-4 font-mono">
                    {emenda.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.colorClass}`}
                    >
                      {statusInfo.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">{new Date(emenda.data).toLocaleDateString("pt-BR")}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => onDetail(emenda.id)}>
                        Detalhar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => onEdit(emenda.id)}>
                        Editar
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => onDelete(emenda.id)}>
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
