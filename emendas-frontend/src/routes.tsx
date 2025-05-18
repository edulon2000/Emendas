import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Emendas from "./pages/Emendas";
import NovaEmenda from "./pages/NovaEmenda";
import EditarEmenda from "./pages/EditarEmenda";
import NotFound from "./pages/NotFound";
import Sidebar from "@/components/Sidebar"



export default function AppRoutes() {
  return (
    <Router>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto bg-gray-50 p-6">
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/emendas" element={<Emendas />} />
        <Route path="/emendas/novo" element={<NovaEmenda />} />
        <Route path="/emendas/:id" element={<EditarEmenda />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
       </main>
      </div>
    </Router>
  );
}
