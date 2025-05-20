
import React, { useState, useEffect } from "react";
import { Emenda } from "@/data/emendas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { StatusEmenda } from "@/enums/statusEmenda";
import { municipiosPernambuco } from "@/data/municipios-pe"; // Importa a lista de municípios

interface Props {
  initialData?: Partial<Emenda>;
  onSubmit: (data: Emenda) => Promise<void | { error: string } | { success: boolean; message?: string }>;
  isSubmitting?: boolean;
}

export default function EmendaForm({ initialData = {}, onSubmit, isSubmitting }: Props) {
  const [numero, setNumero] = useState(initialData.numero || "");
  const [autor, setAutor] = useState(initialData.autor || "");
  const [descricao, setDescricao] = useState(initialData.descricao || "");
  const [valor, setValor] = useState(initialData.valor !== undefined ? formatarValorBR(initialData.valor) : "0,00");
  const [status, setStatus] = useState<StatusEmenda>(initialData.status ?? StatusEmenda.Pendente);
  const [municipio, setMunicipio] = useState(initialData.municipio || "");
  const [data, setData] = useState(initialData.data || new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setNumero(initialData.numero || "");
    setAutor(initialData.autor || "");
    setDescricao(initialData.descricao || "");
    setValor(initialData.valor !== undefined ? formatarValorBR(initialData.valor) : "0,00");
    setStatus(initialData.status ?? StatusEmenda.Pendente);
    setMunicipio(initialData.municipio || "");
    setData(initialData.data || new Date().toISOString().split('T')[0]);
  }, [initialData]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!numero || !autor || !descricao || !valor || !municipio || !data) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    
    const valorNumerico = parseFloat(valor.replace(/\./g, "").replace(",", "."));
    if (isNaN(valorNumerico) || valorNumerico < 0) {
        toast.error("O valor da emenda deve ser um número positivo.");
        return;
    }

    try {
      const payload = {
        id: initialData.id!, 
        numero,
        autor,
        descricao,
        valor: valorNumerico,
        status,
        municipio,
        data,
      };

      const result = await onSubmit(payload as Emenda); 

      if (result && 'error' in result && result.error) {
        toast.error(result.error || "Ocorreu um erro ao salvar a emenda.");
      } else if (result && 'success' in result && result.success === false) {
        toast.error(result.message || "Ocorreu um erro ao salvar a emenda.");
      } else if (result && 'success' in result && result.success === true) {
        toast.success(result.message || "Emenda salva com sucesso!");
      }
      
    } catch (error) {
      console.error("Erro no formulário onSubmit:", error);
      toast.error("Falha ao processar a solicitação. Verifique o console para mais detalhes.");
    }
  };

  function formatarValorBR(val: number): string {
    return val.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formatarValorMoeda(v: string) {
    let num = v.replace(/\D/g, "");
    num = num.replace(/^0+/, "") || "0";
    while (num.length < 3) {
      num = "0" + num;
    }
    const inteiro = num.slice(0, -2);
    const decimal = num.slice(-2);
    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${inteiroFormatado},${decimal}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
            <CardTitle>{initialData?.id ? 'Editar Emenda' : 'Nova Emenda'}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="numero">Número da Emenda *</Label>
                <Input
                  id="numero"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value.replace(/\D/g, ""))}
                  required
                  placeholder="Ex: 12345"
                />
              </div>
              <div>
                <Label htmlFor="autor">Autor *</Label>
                <Input
                  id="autor"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  required
                  placeholder="Nome do Autor"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="descricao">Descrição *</Label>
              <Textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
                placeholder="Detalhes sobre a emenda"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <Label htmlFor="valor">Valor da Emenda (R$) *</Label>
                <Input
                    id="valor"
                    type="text"
                    inputMode="decimal"
                    value={valor}
                    onChange={(e) => setValor(formatarValorMoeda(e.target.value))}
                    placeholder="Ex: 100.000,00"
                    required
                />
                </div>
                <div>
                <Label htmlFor="status">Status *</Label>
                <Select
                    value={status}
                    onValueChange={(value: StatusEmenda) => setStatus(value)}                  
                >
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value={StatusEmenda.Pendente}>Pendente</SelectItem>
                    <SelectItem value={StatusEmenda.Aprovada}>Aprovada</SelectItem>
                    <SelectItem value={StatusEmenda.Rejeitada}>Rejeitada</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="municipio">Município *</Label>
                  <Select
                    value={municipio}
                    onValueChange={(value: string) => setMunicipio(value)}
                  >
                    <SelectTrigger id="municipio">
                      <SelectValue placeholder="Selecione um município" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72 overflow-y-auto">
                      {municipiosPernambuco.map((mun) => (
                        <SelectItem key={mun} value={mun}>
                          {mun}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                <Label htmlFor="data">Data *</Label>
                <Input
                    id="data"
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                />
                </div>
            </div>

            <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : (initialData?.id ? 'Atualizar Emenda' : 'Salvar Emenda')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
