import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Emendas from "./pages/Emendas";
import NovaEmenda from "./pages/NovaEmenda";
import EditarEmenda from "./pages/EditarEmenda";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/emendas" element={<Emendas />} />
        <Route path="/emendas/novo" element={<NovaEmenda />} />
        <Route path="/emendas/:id/editar" element={<EditarEmenda />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
