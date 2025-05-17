import { useState } from "react"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import { Home, FileText, ChevronLeft, ChevronRight } from "lucide-react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <motion.div
      animate={{ width: isOpen ? 240 : 64 }}
      className="h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 overflow-hidden shadow-md"
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
        {isOpen && <h2 className="text-xl font-bold">Emendas</h2>}
        <button onClick={toggleSidebar}>
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      <nav className="flex-1 mt-4 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 hover:bg-gray-800 ${
              isActive ? "bg-gray-800" : ""
            }`
          }
        >
          <Home size={20} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>
        <NavLink
          to="/emendas"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 hover:bg-gray-800 ${
              isActive ? "bg-gray-800" : ""
            }`
          }
        >
          <FileText size={20} />
          {isOpen && <span>Emendas</span>}
        </NavLink>
      </nav>
    </motion.div>
  )
}
