
import { Routes, Route, Navigate } from "react-router-dom"; // Remover BrowserRouter
import Dashboard from "./pages/Dashboard";
import Emendas from "./pages/Emendas";
import NovaEmenda from "./pages/NovaEmenda";
import EditarEmenda from "./pages/EditarEmenda";
import NotFound from "./pages/NotFound";
import Sidebar from "@/components/Sidebar";
import DetalharEmenda from "./pages/DetalharEmenda";
import Footer from "./components/Footer";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import LoginPage from "./pages/Login";
import { useAuth } from "@/contexts/AuthContext";

export default function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Carregando aplicação...</p>
        {/* Você pode adicionar um spinner aqui */}
      </div>
    );
  }

  // Não há mais <Router> aqui
  return (
    <>
      {isAuthenticated ? (
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <main className="flex-grow flex-1 h-full overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/emendas" element={<Emendas />} />
              <Route path="/emendas/novo" element={<NovaEmenda />} />
              <Route path="/emendas/:id/editar" element={<EditarEmenda />} />
              <Route path="/emendas/:id" element={<DetalharEmenda />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
}
