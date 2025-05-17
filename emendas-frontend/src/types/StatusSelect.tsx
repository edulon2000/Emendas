// StatusSelect.tsx
import React from "react"

type Props = {
  value: number
  onChange: (value: number) => void
}

export function StatusSelect({ value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      <option value={0}>Não Aprovada</option>
      <option value={1}>Em Análise</option>
      <option value={2}>Aprovada</option>
    </select>
  )
}
