import React, { useState } from "react";
import { Emenda } from "@/data/emendas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  initialData?: Partial<Emenda>;
  onSubmit: (data: Omit<Emenda, "id">) => void;
}

export default function EmendaForm({ initialData = {}, onSubmit }: Props) {
  const [autor, setAutor] = useState(initialData.autor || "");
  const [descricao, setDescricao] = useState(initialData.descricao || "");
  const [valor, setValor] = useState(initialData.valor || 0);
  const [status, setStatus] = useState(initialData.status || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ autor, descricao, valor, status });
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
          <Input
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <Input
            placeholder="Valor"
            type="number"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
          />
          <Input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </CardContent>
    </Card>
  );
}
