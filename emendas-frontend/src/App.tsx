
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Importar Router aqui
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner"; // Importe o Toaster para exibir notificações

export default function App() {
  return (
    <Router> {/* Envolver AuthProvider e AppRoutes com Router */}
      <AuthProvider>
        <AppRoutes />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </Router>
  );
}
