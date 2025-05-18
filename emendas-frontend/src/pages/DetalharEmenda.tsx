import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEmendaById } from "@/services/emendaService";
import { Emenda } from "@/data/emendas";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

function formatarValorBR(valor: number) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function DetalharEmenda() {
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
        .catch(() => {
          setError("Erro ao carregar a emenda.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Carregando...
      </div>
    );
  }

  if (error || !emenda) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        {error || "Emenda não encontrada."}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      <Card className="border border-gray-200 shadow-lg">
        <CardContent className="p-8 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Detalhes da Emenda
            </h1>
            <Button
              onClick={() => navigate("/emendas")}
              variant="ghost"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Número</p>
              <p className="text-lg font-semibold text-gray-800">{emenda.numero}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Autor</p>
              <p className="text-lg font-semibold text-gray-800">{emenda.autor}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Município</p>
              <p className="text-lg font-semibold text-gray-800">{emenda.municipio}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Data</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(emenda.data).toLocaleDateString("pt-BR")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Valor</p>
              <p className="text-lg font-semibold text-gray-800">
                R$ {formatarValorBR(emenda.valor)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`text-lg font-semibold ${
                  emenda.status === "APROVADA"
                    ? "text-green-600"
                    : emenda.status === "REJEITADA"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {emenda.status}
              </span>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-500">Descrição</p>
            <p className="text-base text-gray-700 leading-relaxed">
              {emenda.descricao}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
