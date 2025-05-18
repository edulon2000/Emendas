import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import logo from "../assets/Logo.png"
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa"

export default function Footer() {
  return (
    <Card className="mt-10 border-none shadow-none bg-black w-full max-w-8xl mx-auto w-full">
      <CardContent className="flex flex-col sm:flex-row items-center justify-between py-6 px-6 border-gray-700 text-white">
        {/* Logo e direitos */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <span className="text-sm whitespace-nowrap">
            © {new Date().getFullYear()} SeatCode. Todos os direitos reservados.
          </span>
        </div>

        {/* Links rápidos */}
        <nav className="flex gap-6 mt-4 sm:mt-0 text-sm">
          <a href="/about" className="hover:text-gray-400 transition-colors">Sobre Nós</a>
          <a href="/contact" className="hover:text-gray-400 transition-colors">Contato</a>
          <a href="/privacy" className="hover:text-gray-400 transition-colors">Política de Privacidade</a>
          <a href="/terms" className="hover:text-gray-400 transition-colors">Termos de Uso</a>
        </nav>

        {/* Redes sociais e slogan */}
        <div className="flex flex-col items-center sm:items-end gap-2 mt-4 sm:mt-0">
          <div className="flex gap-4 text-xl text-gray-400">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors"><FaLinkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white transition-colors"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors"><FaInstagram /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition-colors"><FaGithub /></a>
          </div>
          <p className="text-xs italic text-gray-500 max-w-xs text-right">
            Inovação e tecnologia para transformar seu negócio.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
