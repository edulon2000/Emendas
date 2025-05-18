import React from 'react'; // Importe React
import EmendaForm from "@/components/EmendaForm";
import { Emenda } from "@/data/emendas";
import { useNavigate } from "react-router-dom";
import { createEmenda } from '@/services/emendaService';
import { toast } from 'sonner'; 

export default function NovaEmenda() {
  const navigate = useNavigate();

  
  const handleSubmit = async (data: Omit<Emenda, "id">) => {
    try {
      const novaEmendaCriada = await createEmenda(data as Emenda);
      console.log("Nova emenda cadastrada com sucesso:", novaEmendaCriada);
      toast.success("Emenda cadastrada com sucesso!");
      navigate("/emendas");
    } catch (error) {
      console.error("Erro ao cadastrar emenda:", error);
      toast.error("Erro ao cadastrar emenda. Tente novamente.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-xl font-bold mb-4">Nova Emenda</h1>
      {}
      <EmendaForm onSubmit={handleSubmit} />
    </div>
  );
}