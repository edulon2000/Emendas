import { useEffect, useState } from "react"
import EmendaTable from "@/components/EmendaTable"
import { Emenda } from "@/data/emendas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { deleteEmenda, getEmendas } from "@/services/emendaService"

export default function Emendas() {
  const [filtro, setFiltro] = useState("")
  const [emendas, setEmendas] = useState<Emenda[]>([])
  const navigate = useNavigate();
useEffect(() => {
    async function fetchEmendas() {
      try {
        const data = await getEmendas();
        setEmendas(data);
      } catch (error) {
        console.error("Erro ao carregar emendas:", error);
      }
    }
    fetchEmendas();
  }, []);

  const emendasFiltradas = emendas.filter((e) =>
    e.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
    e.autor.toLowerCase().includes(filtro.toLowerCase())
  )

  async function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir essa emenda?")) {
      await deleteEmenda(id)
      // Atualiza lista removendo a emenda deletada
      setEmendas(prev => prev.filter(emenda => emenda.id !== id))
    }
  }

  function handleEdit(id: number) {
  navigate(`/emendas/${id}/editar`);
}

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Gerenciador de Emendas</h1>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Buscar por autor ou descrição"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <Button className="btn btn-primary mb-4"
      onClick={() => navigate("/emendas/novo")}>
          Nova Emenda
        </Button>
      </div>

      <EmendaTable
        emendas={emendasFiltradas}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  )
}
