
import React, { useMemo, useState } from 'react'; 
import EmendaForm from "@/components/EmendaForm";
import { Emenda } from "@/data/emendas";
import { useNavigate } from "react-router-dom";
import { createEmenda } from '@/services/emendaService';
import { toast } from 'sonner'; 
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { StatusEmenda } from '@/enums/statusEmenda';

export default function NovaEmenda() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialDataForNew: Omit<Emenda, "id"> = useMemo(() => ({
    numero: "",
    autor: "",
    descricao: "",
    valor: 0,
    status: StatusEmenda.Pendente,
    municipio: "",
    data: new Date().toISOString().split('T')[0],
  }), []);

  const handleSubmit = async (data: Omit<Emenda, "id">) => {
    setIsSubmitting(true);
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
    <div className="max-w-xl mx-auto mt-8 pb-12">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Nova Emenda</h1>
        <Button
          onClick={() => navigate("/emendas")}
          variant="ghost"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar
        </Button>
      </div>
      <EmendaForm initialData={initialDataForNew} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
