import EmendaForm from "@/components/EmendaForm";
import { useParams, useNavigate } from "react-router-dom";
import { Emenda } from "@/data/emendas";
import { useEffect, useState } from "react";
import { getEmendaById, updateEmenda } from "@/services/emendaService";

export default function EditarEmenda() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [emenda, setEmenda] = useState<Emenda | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmenda() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getEmendaById(Number(id));
        setEmenda(data);
      } catch (err) {console.error(err);
  alert("Erro ao atualizar a emenda.");
      } finally {
        setLoading(false);
      }
    }
    fetchEmenda();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!emenda) return <div>Emenda não encontrada</div>;

  const handleSubmit = async (data: Emenda) => {
    try {
      await updateEmenda(data.id, data); // Atualiza via API
      navigate("/emendas");
    } catch (err) {console.error(err);
  alert("Erro ao atualizar a emenda.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-xl font-bold mb-4">Editar Emenda</h1>
      <EmendaForm initialData={emenda} onSubmit={handleSubmit} />
    </div>
  );
}
