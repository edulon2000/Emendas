import EmendaForm from "@/components/EmendaForm";
import { useParams, useNavigate } from "react-router-dom";
import { Emenda } from "@/data/emendas";
import { useEffect, useState } from "react";
import { getEmendaById, updateEmenda } from "@/services/emendaService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
    // Usa o id da URL (do useParams) que você já tem
    const idNum = Number(id);
    if (isNaN(idNum)) throw new Error("ID inválido");

    // Garante que o objeto enviado tem o id correto
    const dataToSend = { ...data, id: idNum };

    await updateEmenda(idNum, dataToSend);
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
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-bold">Editar Emenda</h1>
    <Button
      onClick={() => navigate("/emendas")}
      variant="ghost"
      className="text-sm text-gray-600 hover:text-gray-900"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      Voltar
    </Button>
  </div>
  <EmendaForm initialData={emenda} onSubmit={handleSubmit} />
</div>
  );
}
