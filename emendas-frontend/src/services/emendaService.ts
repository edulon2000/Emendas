import { api } from "./api"
import { Emenda } from "@/data/emendas"

export async function getEmendas(): Promise<Emenda[]> {
  const response = await api.get("/emendas")
  return response.data
}

export async function createEmenda(emenda: Emenda): Promise<Emenda> {
  const response = await api.post("/emendas", emenda)
  return response.data
}

export async function updateEmenda(id: number, emenda: Emenda): Promise<Emenda> {
  const response = await api.put(`/emendas/${id}`, emenda)
  return response.data
}

export async function deleteEmenda(id: number): Promise<void> {
  await api.delete(`/emendas/${id}`)
}

export async function getEmendaById(id: number): Promise<Emenda> {
  const response = await api.get(`/emendas/${id}`);
  return response.data;
}