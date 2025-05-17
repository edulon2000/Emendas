import EmendaForm from "@/components/EmendaForm";
import { useParams, useNavigate } from "react-router-dom";
import { Emenda, emendasMock } from "@/data/emendas";

export default function EditarEmenda() {
  const { id } = useParams();
  const navigate = useNavigate();
  const emenda = emendasMock.find((e) => e.id === Number(id));

  if (!emenda) return <div>Emenda não encontrada</div>;

  const handleSubmit = (data: Emenda) => {
    // Atualiza a emenda via API ou estado
    console.log("Editar emenda:", data);
    navigate("/emendas");
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-xl font-bold mb-4">Editar Emenda</h1>
      <EmendaForm initialData={emenda} onSubmit={handleSubmit} />
    </div>
  );
}
