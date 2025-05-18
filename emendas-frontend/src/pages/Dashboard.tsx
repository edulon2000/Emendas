import { Emenda } from "@/data/emendas";
import EmendaTable from "@/components/EmendaTable";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { deleteEmenda, getEmendas } from "@/services/emendaService";
import { StatusEmenda } from "@/enums/statusEmenda";
import { useNavigate } from "react-router-dom";
import { BarChart3, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [emendas, setEmendas] = useState<Emenda[]>([]);

  useEffect(() => {
    async function fetchEmendas() {
      try {
        const data = await getEmendas();
        setEmendas(data);
      } catch (error) {
        console.error("Erro ao carregar emendas", error);
      }
    }
    fetchEmendas();
  }, []);

  const total = emendas.length;
  const emPendente = emendas.filter((e) => e.status === StatusEmenda.Pendente).length;
  const emAprovada = emendas.filter((e) => e.status === StatusEmenda.Aprovada).length;
  const emRejeitada = emendas.filter((e) => e.status === StatusEmenda.Rejeitada).length;

  const emendasPorAno = emendas.reduce((acc, emenda) => {
    const ano = new Date(emenda.data).getFullYear();
    acc[ano] = (acc[ano] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const chartData = Object.entries(emendasPorAno).map(([ano, total]) => ({
    ano,
    total,
  }));

  async function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir essa emenda?")) {
      await deleteEmenda(id);
      setEmendas((prev) => prev.filter((e) => e.id !== id));
    }
  }

  function handleEdit(id: number) {
    navigate(`/emendas/${id}/editar`);
  }

  function handleDetail(id: number) {
    navigate(`/emendas/${id}`);
  }

  const cards = [
    {
      label: "Total",
      value: total,
      icon: BarChart3,
      color: "bg-gradient-to-r from-pink-500 to-pink-400",
    },
    {
      label: "Pendentes",
      value: emPendente,
      icon: Clock,
      color: "bg-gradient-to-r from-yellow-400 to-yellow-300",
    },
    {
      label: "Aprovadas",
      value: emAprovada,
      icon: CheckCircle2,
      color: "bg-gradient-to-r from-green-500 to-green-400",
    },
    {
      label: "Rejeitadas",
      value: emRejeitada,
      icon: XCircle,
      color: "bg-gradient-to-r from-red-500 to-red-400",
    },
  ];

  return (
    <main className="flex-1 p-6 sm:p-10 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="text-sm text-gray-500 uppercase">Senador</p>
        <h1 className="text-4xl font-bold text-gray-800">Humberto Costa</h1>
      </motion.div>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`rounded-xl text-white shadow-lg p-6 flex items-center gap-4 ${color}`}
          >
            <Icon className="w-8 h-8" />
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-3xl font-bold">{value}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Gráfico */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-10"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Emendas por Ano</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="ano" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#ec4899" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Tabela */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Últimas Emendas</h2>
        <EmendaTable
          emendas={emendas}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={handleDetail}
        />
      </motion.div>
    </main>
  );
}
