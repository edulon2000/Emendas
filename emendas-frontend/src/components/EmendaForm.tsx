import React, { useState } from "react";
import { Emenda } from "@/data/emendas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { StatusEmenda } from "@/enums/statusEmenda";

interface Props {
  initialData?: Partial<Emenda>;
  onSubmit: (data: Emenda) => void;
}

export default function EmendaForm({ initialData = {}, onSubmit }: Props) {
  const [numero, setNumero] = useState(initialData.numero || "");
  const [autor, setAutor] = useState(initialData.autor || "");
  const [descricao, setDescricao] = useState(initialData.descricao || "");
  const [valor, setValor] = useState(initialData.valor !== undefined? formatarValorBR(initialData.valor): "0,00");
  const [status, setStatus] = useState<StatusEmenda>(initialData.status ?? StatusEmenda.Pendente);
  const [municipio, setMunicipio] = useState(initialData.municipio || "");
  const [data, setData] = useState(initialData.data || "");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    if (!numero || !autor || !descricao || !valor || !municipio || !data) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    onSubmit({
      id: initialData.id!, // Se quiser garantir que existe
      numero,
      autor,
      descricao,
      valor: parseFloat(valor.replace(/\./g, "").replace(",", ".")),
      status,
      municipio,
      data,
    });
  };
  function formatarValorBR(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

  function formatarValorMoeda(valor: string) {
  // Remove tudo que não seja número
  let num = valor.replace(/\D/g, "");

  // Se não tiver nada, retorna vazio
  num = num.replace(/^0+/, "") || "0";

  // Se tiver 1 ou 2 dígitos, adiciona zeros para casas decimais
  while (num.length < 3) {
    num = "0" + num;
  }

  // Pega parte inteira e decimal
  const inteiro = num.slice(0, -2);
  const decimal = num.slice(-2);

  // Formata com pontos a cada 3 dígitos da parte inteira
  const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${inteiroFormatado},${decimal}`;
}

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-lg border-2 border-gray-100">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="numero">Número da Emenda *</Label>
              <Input
                id="numero"
                value={numero}
                onChange={(e) => {
                  const value = e.target.value;
                  // Só aceita números, remove qualquer coisa que não seja dígito
                  const numericValue = value.replace(/\D/g, "");
                  setNumero(numericValue);
                }}
                required
              />
            </div>

            <div>
              <Label htmlFor="autor">Autor *</Label>
              <Input
                id="autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="descricao">Descrição *</Label>
              <Textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="valor">Valor da Emenda (R$) *</Label>
              <Input
                id="valor"
                type="text"
                inputMode="decimal"
                value={valor}
                 onChange={(e) => {
                  const raw = e.target.value;
                  const formatted = formatarValorMoeda(raw);
                  setValor(formatted);
                }}
                placeholder="Ex: 100.000,00"
                required
              />
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <select
                id="status"
                className="w-full border rounded px-3 py-2"
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusEmenda)}
                required
              >
                <option value={StatusEmenda.Pendente}>Pendente</option>
                <option value={StatusEmenda.Aprovada}>Aprovada</option>
                <option value={StatusEmenda.Rejeitada}>Rejeitada</option>
              </select>

            </div>

            <div>
              <Label htmlFor="municipio">Município *</Label>
              <Input
                id="municipio"
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
                required
              />
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

            <Button type="submit" className="w-full mt-4">
              Salvar Emenda
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
