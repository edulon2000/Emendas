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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getEmendaById(Number(id))
        .then((data) => {
          setEmenda(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Erro ao carregar emenda");
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (data: Emenda) => {
    try {
      await updateEmenda(data.id, data);
      navigate("/emendas");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar a emenda.");
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!emenda) return <div>Emenda não encontrada</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Editar Emenda</h1>
      <EmendaForm initialData={emenda} onSubmit={handleSubmit} />
    </div>
  );
}
