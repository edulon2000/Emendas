
import React, { useEffect, useMemo, useState } from 'react';
import { Emenda } from '@/data/emendas';
import { StatusEmenda } from '@/enums/statusEmenda';
import { getEmendas } from '@/services/emendaService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, ListChecks, MapPin, UserCircle } from 'lucide-react';

const COLORS_PIE = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function Reports() {
  const [emendas, setEmendas] = useState<Emenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<StatusEmenda | 'ALL'>('ALL');

  useEffect(() => {
    async function fetchEmendas() {
      try {
        setLoading(true);
        const data = await getEmendas();
        setEmendas(data);
      } catch (error)
      {
        console.error("Erro ao carregar emendas para relatórios:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEmendas();
  }, []);

  const resumoPorStatus = useMemo(() => {
    const summary: Record<StatusEmenda, { count: number; totalValue: number }> = {
      [StatusEmenda.Aprovada]: { count: 0, totalValue: 0 },
      [StatusEmenda.Pendente]: { count: 0, totalValue: 0 },
      [StatusEmenda.Rejeitada]: { count: 0, totalValue: 0 },
    };
    emendas.forEach(emenda => {
      summary[emenda.status].count++;
      summary[emenda.status].totalValue += emenda.valor;
    });
    return Object.entries(summary).map(([status, data]) => ({ status: status as StatusEmenda, ...data }));
  }, [emendas]);

  const resumoPorMunicipio = useMemo(() => {
    const summary: Record<string, { count: number; totalValue: number }> = {};
    emendas.forEach(emenda => {
      if (!summary[emenda.municipio]) {
        summary[emenda.municipio] = { count: 0, totalValue: 0 };
      }
      summary[emenda.municipio].count++;
      summary[emenda.municipio].totalValue += emenda.valor;
    });
    return Object.entries(summary).map(([municipio, data]) => ({ municipio, ...data })).sort((a,b) => b.totalValue - a.totalValue).slice(0,10); // Top 10
  }, [emendas]);

  const resumoPorAutor = useMemo(() => {
    const summary: Record<string, { count: number; totalValue: number }> = {};
    emendas.forEach(emenda => {
      if (!summary[emenda.autor]) {
        summary[emenda.autor] = { count: 0, totalValue: 0 };
      }
      summary[emenda.autor].count++;
      summary[emenda.autor].totalValue += emenda.valor;
    });
     return Object.entries(summary).map(([autor, data]) => ({ autor, ...data })).sort((a,b) => b.totalValue - a.totalValue).slice(0,10); // Top 10
  }, [emendas]);
  
  const emendasFiltradasPorStatus = useMemo(() => {
    if (selectedStatusFilter === 'ALL') return emendas;
    return emendas.filter(emenda => emenda.status === selectedStatusFilter);
  }, [emendas, selectedStatusFilter]);


  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando relatórios...</div>;
  }

  return (
    <div className="space-y-8 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Relatórios de Emendas</h1>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ListChecks className="text-blue-500"/>Resumo por Status</CardTitle>
          <CardDescription>Contagem e valor total das emendas agrupadas por status.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resumoPorStatus.map(item => (
                <TableRow key={item.status}>
                  <TableCell className="font-medium">{item.status}</TableCell>
                  <TableCell className="text-right">{item.count}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.totalValue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={resumoPorStatus.filter(s => s.count > 0)} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                 {resumoPorStatus.filter(s => s.count > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                  ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [`${value} emendas (${name})`, "Quantidade"]}/>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MapPin className="text-green-500"/>Top 10 Municípios por Valor</CardTitle>
          <CardDescription>Contagem e valor total das emendas para os 10 municípios com maior valor.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={resumoPorMunicipio} layout="vertical" margin={{ left: 100 }}>
                    <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
                    <YAxis type="category" dataKey="municipio" width={100} interval={0} />
                    <Tooltip formatter={(value: number) => [formatCurrency(value), "Valor Total"]} />
                    <Legend />
                    <Bar dataKey="totalValue" fill="#82ca9d" name="Valor Total" />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserCircle className="text-purple-500"/>Top 10 Autores por Valor</CardTitle>
          <CardDescription>Contagem e valor total das emendas para os 10 autores com maior valor.</CardDescription>
        </CardHeader>
        <CardContent>
             <ResponsiveContainer width="100%" height={400}>
                <BarChart data={resumoPorAutor} layout="vertical" margin={{ left: 100 }}>
                    <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
                    <YAxis type="category" dataKey="autor" width={100} interval={0} />
                    <Tooltip formatter={(value: number) => [formatCurrency(value), "Valor Total"]} />
                    <Legend />
                    <Bar dataKey="totalValue" fill="#8884d8" name="Valor Total" />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><DollarSign className="text-red-500"/>Lista Detalhada de Emendas</CardTitle>
          <CardDescription>Visualize todas as emendas, com opção de filtro por status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="statusFilter" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Filtrar por Status:</Label>
            <Select 
                value={selectedStatusFilter} 
                onValueChange={(value) => setSelectedStatusFilter(value as StatusEmenda | 'ALL')}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos os Status</SelectItem>
                <SelectItem value={StatusEmenda.Aprovada}>Aprovadas</SelectItem>
                <SelectItem value={StatusEmenda.Pendente}>Pendentes</SelectItem>
                <SelectItem value={StatusEmenda.Rejeitada}>Rejeitadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {emendasFiltradasPorStatus.length > 0 ? (
            <div className="max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Município</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emendasFiltradasPorStatus.map(emenda => (
                    <TableRow key={emenda.id}>
                      <TableCell>{emenda.numero}</TableCell>
                      <TableCell>{emenda.autor}</TableCell>
                      <TableCell>{emenda.municipio}</TableCell>
                      <TableCell className="max-w-xs truncate" title={emenda.descricao}>{emenda.descricao}</TableCell>
                      <TableCell className="text-right">{formatCurrency(emenda.valor)}</TableCell>
                      <TableCell>{emenda.status}</TableCell>
                      <TableCell className="text-right">{new Date(emenda.data).toLocaleDateString('pt-BR')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Nenhuma emenda encontrada para o filtro selecionado.</p>
          )}
        </CardContent>
      </Card>

    </div>
  );
}

    