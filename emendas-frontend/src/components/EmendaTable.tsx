import { Emenda } from "@/data/emendas"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  emendas: Emenda[]
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export default function EmendaTable({ emendas, onEdit, onDelete }: Props) {
  return (
    <Card>
      <CardContent className="overflow-x-auto p-4">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b">
              <th>Autor</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {emendas.map((emenda) => (
              <tr key={emenda.id} className="border-b hover:bg-zinc-50">
                <td>{emenda.autor}</td>
                <td>{emenda.descricao}</td>
                <td>R$ {emenda.valor.toLocaleString()}</td>
                <td>{emenda.status}</td>
                <td>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(emenda.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(emenda.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
