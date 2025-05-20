
import React, { useState, useMemo } from "react"
import { Emenda } from "@/data/emendas"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusEmenda } from "@/enums/statusEmenda"

// Imports removidos:
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";

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
      return { label: "Rejeitada", colorClass: "text-blue-700 bg-blue-100" } // Ajustado para azul para diferenciar do vermelho de destructive
    case StatusEmenda.Aprovada:
      return { label: "Aprovada", colorClass: "text-green-700 bg-green-100" }
    default:
      return { label: "Desconhecido", colorClass: "text-gray-700 bg-gray-100" }
  }
}


export default function EmendaTable({ emendas, onEdit, onDelete, onDetail }: Props) {
  const [statusFilter, setStatusFilter] = useState<StatusEmenda | "">("")
  const [municipioFilter, setMunicipioFilter] = useState<string>("")

  const statusOptions = useMemo<StatusEmenda[]>(() => {
    const uniqueStatus = Array.from(new Set(emendas.map(e => e.status)))
    return uniqueStatus.sort((a, b) => a.localeCompare(b))
  }, [emendas])

  const municipioOptions = useMemo(() => {
    const uniqueMunicipios = Array.from(new Set(emendas.map(e => e.municipio)))
    return uniqueMunicipios.sort()
  }, [emendas])

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
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtrar por Status</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusEmenda | "")}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Todos os Status</option>
              {statusOptions.map((status) => {
                const statusInfo = getStatusLabel(status as StatusEmenda);
                return (
                  <option key={status} value={status}>
                    {statusInfo.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label htmlFor="municipioFilter" className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtrar por Município</label>
            <select
              id="municipioFilter"
              value={municipioFilter}
              onChange={(e) => setMunicipioFilter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Todos os Municípios</option>
              {municipioOptions.map((municipio) => (
                <option key={municipio} value={municipio}>
                  {municipio}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
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
                <td colSpan={7} className="text-center py-6 text-gray-500 dark:text-gray-400">
                  Nenhuma emenda encontrada para os filtros aplicados.
                </td>
              </tr>
            )}
            {filteredEmendas.map((emenda) => {
              const statusInfo = getStatusLabel(emenda.status)
              return (
                <tr
                  key={emenda.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
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

