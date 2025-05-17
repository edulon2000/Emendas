import EmendaForm from "@/components/EmendaForm";
import { Emenda } from "@/data/emendas";
import { useNavigate } from "react-router-dom";

export default function NovaEmenda() {
  const navigate = useNavigate();

  const handleSubmit = (data: Emenda) => {
    // Aqui você pode salvar via API ou em memória
    console.log("Nova emenda:", data);
    navigate("/emendas"); // volta para lista
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-xl font-bold mb-4">Nova Emenda</h1>
      <EmendaForm onSubmit={handleSubmit} />
    </div>
  );
}
