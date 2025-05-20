
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
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import { deleteEmenda, getEmendas } from "@/services/emendaService";
import { StatusEmenda } from "@/enums/statusEmenda";
import { useNavigate } from "react-router-dom";
import { BarChart3, CheckCircle2, Clock, DollarSign, TrendingUp, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS_PIE = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Cores para gráfico de pizza

export default function Dashboard() {
  const navigate = useNavigate();
  const [emendas, setEmendas] = useState<Emenda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmendas() {
      try {
        setLoading(true);
        const data = await getEmendas();
        setEmendas(data);
      } catch (error) {
        console.error("Erro ao carregar emendas", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEmendas();
  }, []);

  const stats = useMemo(() => {
    const total = emendas.length;
    const emPendente = emendas.filter((e) => e.status === StatusEmenda.Pendente).length;
    const emAprovada = emendas.filter((e) => e.status === StatusEmenda.Aprovada).length;
    const emRejeitada = emendas.filter((e) => e.status === StatusEmenda.Rejeitada).length;
    const valorTotal = emendas.reduce((sum, e) => sum + e.valor, 0);
    return { total, emPendente, emAprovada, emRejeitada, valorTotal };
  }, [emendas]);

  const yearlyEvolutionData = useMemo(() => {
    const dataByYear: Record<number, { ano: number; valorTotal: number; quantidade: number }> = {};
    emendas.forEach((emenda) => {
      const ano = new Date(emenda.data).getFullYear();
      if (!dataByYear[ano]) {
        dataByYear[ano] = { ano, valorTotal: 0, quantidade: 0 };
      }
      dataByYear[ano].valorTotal += emenda.valor;
      dataByYear[ano].quantidade += 1;
    });
    return Object.values(dataByYear).sort((a, b) => a.ano - b.ano);
  }, [emendas]);

  const statusDistributionData = useMemo(() => {
    return [
      { name: 'Pendentes', value: stats.emPendente },
      { name: 'Aprovadas', value: stats.emAprovada },
      { name: 'Rejeitadas', value: stats.emRejeitada },
    ].filter(item => item.value > 0);
  }, [stats]);
  
  const topMunicipiosPorValor = useMemo(() => {
    const municipiosData: Record<string, number> = {};
    emendas.forEach(emenda => {
        municipiosData[emenda.municipio] = (municipiosData[emenda.municipio] || 0) + emenda.valor;
    });
    return Object.entries(municipiosData)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
  }, [emendas]);


  async function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir essa emenda?")) {
      try {
        await deleteEmenda(id);
        setEmendas((prev) => prev.filter((e) => e.id !== id));
      } catch (error) {
        console.error("Erro ao deletar emenda:", error)
      }
    }
  }

  function handleEdit(id: number) {
    navigate(`/emendas/${id}/editar`);
  }

  function handleDetail(id: number) {
    navigate(`/emendas/${id}`);
  }

  const summaryCards = [
    { label: "Total de Emendas", value: stats.total, icon: BarChart3, color: "bg-blue-500" },
    { label: "Valor Total", value: `R$ ${stats.valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, icon: DollarSign, color: "bg-purple-500" },
    { label: "Pendentes", value: stats.emPendente, icon: Clock, color: "bg-yellow-500" },
    { label: "Aprovadas", value: stats.emAprovada, icon: CheckCircle2, color: "bg-green-500" },
    { label: "Rejeitadas", value: stats.emRejeitada, icon: XCircle, color: "bg-red-500" },
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando dashboard...</div>;
  }

  return (
    <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Visão geral das suas emendas parlamentares.</p>
      </motion.div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {summaryCards.map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl text-white shadow-lg p-6 flex items-center gap-4 ${color}`}
          >
            <Icon className="w-8 h-8" />
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </motion.div>
        ))}
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} >
            <Card className="shadow-xl h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="text-blue-600" /> Evolução Anual de Emendas (Valor)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={yearlyEvolutionData}>
                        <XAxis dataKey="ano" />
                        <YAxis tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                        <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, "Valor Total"]} />
                        <Legend />
                        <Line type="monotone" dataKey="valorTotal" stroke="#3b82f6" strokeWidth={3} name="Valor Total" />
                    </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} >
            <Card className="shadow-xl h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="text-green-600" /> Distribuição por Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={statusDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                        {statusDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                        ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value} emendas`} />
                        <Legend />
                    </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>
      </section>
      
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="mb-8">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="text-yellow-500" /> Top 5 Municípios por Valor de Emenda
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topMunicipiosPorValor} layout="vertical">
                            <XAxis type="number" tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                            <YAxis type="category" dataKey="name" width={150} />
                            <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, "Valor Total"]} />
                            <Legend />
                            <Bar dataKey="value" fill="#FFBB28" name="Valor Total" barSize={20}/>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle>Últimas Emendas Cadastradas</CardTitle>
            </CardHeader>
            <CardContent>
                 <EmendaTable
                    emendas={emendas.slice(0, 10)} // Mostrar as 10 mais recentes, por exemplo
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDetail={handleDetail}
                />
            </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
