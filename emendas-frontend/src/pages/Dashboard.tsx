import { Emenda } from "@/data/emendas"
import EmendaTable from "@/components/EmendaTable"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useEffect, useState } from "react";
import { deleteEmenda, getEmendas } from "@/services/emendaService";


export default function Dashboard() {

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
  const total = emendas.length
  const emExecucao = emendas.filter((e) => e.status === 1).length
  const emAnalise = emendas.filter((e) => e.status === 0).length

  const emendasPorAno = emendas.reduce((acc, emenda) => {
    const ano = new Date(emenda.data).getFullYear()
    acc[ano] = (acc[ano] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  const chartData = Object.entries(emendasPorAno).map(([ano, total]) => ({
    ano,
    total,
  }))
  async function handleDelete(id: number) {
  if (window.confirm("Tem certeza que deseja excluir essa emenda?")) {
    await deleteEmenda(id); // função que chama o backend
    setEmendas((prev) => prev.filter((e) => e.id !== id)); // atualiza a lista
  }
}

  return (
    <main className="flex-1 p-10 bg-[#f8f9fc] min-h-screen">
      <div className="mb-8">
        <p className="text-center text-sm text-gray-500 uppercase">Senador</p>
        <h1 className="text-center text-3xl font-bold text-gray-800">Humberto Costa</h1>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Emendas", value: total },
          { label: "Em Execução", value: emExecucao },
          { label: "Em Análise", value: emAnalise },
        ].map(({ label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white rounded-xl shadow p-6 text-center"
          >
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className="text-4xl font-bold mt-2 text-gray-900">{value}</p>
          </motion.div>
        ))}
      </section>

      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Emendas por Ano</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="ano" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#ec4899"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Últimas Emendas</h2>
        <EmendaTable
          emendas={emendas}
          onEdit={(id) => console.log("Editar", id)}
          onDelete={handleDelete}
        />
      </div>
    </main>
  )
}
