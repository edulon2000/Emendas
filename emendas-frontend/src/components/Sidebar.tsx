
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, FileText, ChevronLeft, ChevronRight, BarChart3, Settings as SettingsIcon, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // Importar useAuth
import { Button } from "./ui/button"; // Importar Button para o logout

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth(); // Usar o hook useAuth

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/emendas", icon: FileText, label: "Emendas" },
    { to: "/reports", icon: BarChart3, label: "Relatórios" },
    { to: "/settings", icon: SettingsIcon, label: "Configurações" },
  ];

  return (
    <motion.div
      animate={{ width: isOpen ? 240 : 64 }}
      className="h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 overflow-hidden shadow-md"
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
        {isOpen && <h2 className="text-xl font-bold">Emendas</h2>}
        <button onClick={toggleSidebar} aria-label={isOpen ? "Recolher sidebar" : "Expandir sidebar"} className="text-gray-400 hover:text-white">
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      <nav className="flex-1 mt-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md mx-2 transition-colors duration-150 ${
                isActive ? "bg-gray-700 font-semibold text-white" : "text-gray-400 hover:text-white"
              }`
            }
            title={isOpen ? "" : item.label}
          >
            <item.icon size={20} aria-hidden="true" />
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Botão de Logout */}
      <div className="mt-auto p-2 border-t border-gray-700">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full flex items-center justify-start gap-3 px-4 py-2 text-gray-400 hover:bg-red-700 hover:text-white rounded-md"
          title={isOpen ? "" : "Sair"}
        >
          <LogOut size={20} />
          {isOpen && <span>Sair</span>}
        </Button>
      </div>
    </motion.div>
  );
}
